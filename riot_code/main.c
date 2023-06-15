#include "stdio.h"
#include "stdlib.h"

#include "paho_mqtt.h"
#include "MQTTClient.h"

#include "xtimer.h"
#include "ztimer.h"

#include "time.h"
#include "thread.h"

#include "bh1750fvi.h"
#include "periph/pwm.h"
#include "periph/adc.h"
#include "periph/gpio.h"

//MQTT settings
#define BUF_SIZE 1024

#define MQTT_VERSION_v311               4       /* MQTT v3.1.1 version is 4 */
#define COMMAND_TIMEOUT_MS              4000

#define BROKER_ADDRESS "172.20.10.2"
#define DEFAULT_MQTT_PORT               1883
#define DEFAULT_KEEPALIVE_SEC           10
#define TOPIC "Tunnel"

#define IS_CLEAN_SESSION                1
#define IS_RETAINED_MSG                 0

#define  AQ_MINRISK  700
#define AQ_MIDRISK  1000
#define AQ_MAXRISK  1500

#define L_THRESHOLD 30

static MQTTClient client;
static Network network;
static unsigned char buf[BUF_SIZE];
static unsigned char readbuf[BUF_SIZE];

// Pin used to lights control
#define LIGHT_ZONE_0 GPIO21
#define LIGHT_ZONE_1 GPIO13

// Pin used for fan control
#define FAN_ZONE_0 PWM_DEV(0)
#define FAN_ZONE_1 PWM_DEV(1)

// Define PWM parameters
pwm_t fan0 = FAN_ZONE_0;
pwm_t fan1 = FAN_ZONE_1;
uint32_t freq = 1000;
uint16_t res = 1500;
uint16_t minSpeed = 500;
uint16_t midSpeed = 1000;
uint16_t maxSpeed = 1500;

bh1750fvi_t light_zone_0_sensor;
bh1750fvi_t light_zone_1_sensor;
bh1750fvi_params_t light_zone_0_params = {
    .i2c = I2C_DEV(0),
    .addr = BH1750FVI_DEFAULT_ADDR};
bh1750fvi_params_t light_zone_1_params = {
    .i2c = I2C_DEV(1),
    .addr = BH1750FVI_DEFAULT_ADDR};

uint16_t light_zone_0_value;
uint16_t light_zone_1_value;

// Define gas sensor paramiters
#define RL_VALUE 10.0
#define RO_CLEAN_AIR_FACTOR 3.6
#define ADC_RES ADC_RES_12BIT
#define ADC_MAX (1 << ADC_RES) - 1
#define R_LOAD 10.0

uint_fast8_t air_quality_zone_0_sensor = ADC_LINE(0); // Pin 36
uint_fast8_t air_quality_zone_1_sensor = ADC_LINE(1); // Pin 39
int32_t air_quality_zone_0_value;
int32_t air_quality_zone_1_value;

#define SAMPLING_PERIOD 7

void activateLightZone(gpio_t light_zone)
{
    gpio_set(light_zone);
    puts("attivo light zone");
}
void deactivateLightZone(gpio_t light_zone)
{
    gpio_clear(light_zone);
    puts("disattivo light zone");
}

void activateFanZone(pwm_t fan_zone, uint16_t res)
{
    pwm_set(fan_zone, 0, res);
    //pwm_poweron(fan_zone);
}

void deactivateFanZone(pwm_t fan_zone)
{
    pwm_poweroff(fan_zone);
}

uint16_t sampleLight(bh1750fvi_t *light_sensor)
{
    return bh1750fvi_sample(light_sensor);
}

int32_t sampleAir(uint_fast8_t air_quality_zone, uint16_t res)
{
    return adc_sample(air_quality_zone, ADC_RES);
}

int initialize_sensors_and_actuators(void){

    // Inizialize light actuators
    if(gpio_init(LIGHT_ZONE_0, GPIO_OUT) || gpio_init(LIGHT_ZONE_1, GPIO_OUT)){
        puts("Led initialization failed!");
    }
    activateLightZone(LIGHT_ZONE_0);
    activateLightZone(LIGHT_ZONE_1);

    //Initialize BH1750 light sensors
    bh1750fvi_init(&light_zone_0_sensor, &light_zone_0_params);
    bh1750fvi_init(&light_zone_1_sensor, &light_zone_1_params);

    //Initialize fan actuators
    if (!pwm_init(PWM_DEV(fan0), PWM_LEFT, freq, res) || !pwm_init(PWM_DEV(fan1), PWM_LEFT, freq, res))
        puts("PWM Initialization failed.\n");
    
    if (adc_init(air_quality_zone_0_sensor) ||
        adc_init(air_quality_zone_1_sensor))
        puts("Air quality sensor initialization failed\n");
    
    return 0;
}


int mqtt_init(void){

    xtimer_sleep(5);

    NetworkInit(&network);
    MQTTClientInit(&client, &network, COMMAND_TIMEOUT_MS, buf, BUF_SIZE, readbuf, BUF_SIZE);
    MQTTStartTask(&client);

    MQTTPacket_connectData data = MQTTPacket_connectData_initializer;
    data.MQTTVersion = MQTT_VERSION_v311;
    data.clientID.cstring = "";
    data.username.cstring = "";
    data.password.cstring = "";
    data.keepAliveInterval = 60;
    data.cleansession = 1;

    printf("MQTT: Connecting to MQTT Broker from %s %d\n",
            BROKER_ADDRESS, DEFAULT_MQTT_PORT);
    printf("MQTT: Trying to connect to %s, port: %d\n",
            BROKER_ADDRESS, DEFAULT_MQTT_PORT);
    
    int res = NetworkConnect(&network, BROKER_ADDRESS, DEFAULT_MQTT_PORT);

    if(res){
        printf("MQTT unable to connect: Error %d\n", res);
        return res;
    }
    res = MQTTConnect(&client, &data);

    if (res < 0) {
        printf("MQTT: Unable to connect client %d\n", res);
        int res = MQTTDisconnect(&client);
        if (res < 0) {
            printf("MQTT: Unable to disconnect\n");
        }
        else {
            printf("MQTT: Disconnect successful\n");
        }
        NetworkDisconnect(&network);
        return res;
    }
    else{
        printf("MQTT: Connection success!\n");
    }

    printf("MQTT client succesfully connected to the broker\n");
    return 0;
}

int main(void)
{   
    if (mqtt_init()){
        printf("MQTT initialization error...!\n");
    }else printf("MQTT initialization success\n");

    if(initialize_sensors_and_actuators())
        printf("Sensors and actuators initialization error!\n");
    else
        printf("Sensor and actuators initialization success!\n\n");

    int i = 0;

    int l1status, l2status;
    char* statusAQ1 = "";
    char* statusAQ2 = "";


    while (1){

    int t0 = sampleLight(&light_zone_0_sensor);
    if (t0 < 1000 && t0 > 0) light_zone_0_value = t0;
    printf("Light Zone 0 Value: %d\n", light_zone_0_value);

    xtimer_sleep(1);

    int t1 = sampleLight(&light_zone_1_sensor);
    if (t1 < 1000 && t1 > 0) light_zone_1_value = t1;
    else if (t1 < 150) light_zone_1_value = t1;
    printf("Light Zone 1 Value: %d\n", light_zone_1_value);

    xtimer_sleep(1);

    if (light_zone_0_value <= L_THRESHOLD)
        l1status = 0;
    else l1status = 1;

    if (light_zone_1_value <= L_THRESHOLD)
        l2status = 0;
    else l2status = 1;

    air_quality_zone_0_value = sampleAir(air_quality_zone_0_sensor, ADC_RES);
    printf("Air quality Zone 0 Value: %d\n", air_quality_zone_0_value);

    xtimer_sleep(1);

    air_quality_zone_1_value = sampleAir(air_quality_zone_1_sensor, ADC_RES);
    printf("Air quality Zone 1 Value: %d\n", air_quality_zone_1_value);

    xtimer_sleep(1);

    if (air_quality_zone_0_value < AQ_MINRISK) {
        statusAQ1 = "SAFE";
        activateFanZone(FAN_ZONE_0, 0);
        printf("Deactivating fan zone 0\n");
    }
    else if (air_quality_zone_0_value >= AQ_MINRISK && air_quality_zone_0_value < AQ_MIDRISK) {
        statusAQ1 = "MIN_RISK";
        activateFanZone(FAN_ZONE_0, minSpeed);
        printf("Fan zone 0 min speed\n");
    }
    else if (air_quality_zone_0_value >= AQ_MIDRISK && air_quality_zone_0_value < AQ_MAXRISK) {
        statusAQ1 = "MID_RISK";
        activateFanZone(FAN_ZONE_0, midSpeed);
        printf("Fan zone 0 mid speed\n");
    }
    else if (air_quality_zone_0_value >= AQ_MAXRISK) {
        statusAQ1 = "MAX_RISK";
        activateFanZone(FAN_ZONE_0, maxSpeed);
        printf("Fan zone 0 max speed\n");
    }


    if (air_quality_zone_1_value < AQ_MINRISK) {
        statusAQ2 = "SAFE";
        activateFanZone(FAN_ZONE_1, 0);
        printf("Deactivating fan zone 1\n");
    }
    else if (air_quality_zone_1_value >= AQ_MINRISK && air_quality_zone_1_value < AQ_MIDRISK) {
        statusAQ2 = "MIN_RISK";
        activateFanZone(FAN_ZONE_1, minSpeed);
        printf("Fan zone 1 min speed\n");
    }
    else if (air_quality_zone_1_value >= AQ_MIDRISK && air_quality_zone_1_value < AQ_MAXRISK) {
        statusAQ2 = "MID_RISK";
        activateFanZone(FAN_ZONE_1, midSpeed);
        printf("Fan zone 1 mid speed\n");
    }
    else if (air_quality_zone_1_value >= AQ_MAXRISK) {
        statusAQ2 = "MAX_RISK";
        activateFanZone(FAN_ZONE_1, maxSpeed);
        printf("Fan zone 1 max speed\n");
    }

    char json[256];

    sprintf(json, "{\"id\": \"%d\", \"AirQuality1\": \"%d\", \"AirQuality2\": \"%d\", \"LightLevel1\": \"%d\", \"LightLevel2\": \"%d\", \"StatusL1\": \"%d\", \"StatusL2\": \"%d\", \"StatusAQ1\": \"%s\", \"StatusAQ2\": \"%s\"}",
                        i, air_quality_zone_0_value, air_quality_zone_1_value, light_zone_0_value, light_zone_1_value, l1status, l2status, statusAQ1, statusAQ2);

    char* msg = json;

    //MQTT publish
    MQTTMessage message;
    message.qos = QOS1;
    message.retained = IS_RETAINED_MSG;
    message.payload = msg;
    message.payloadlen = strlen(message.payload);

    int rp = MQTTPublish(&client, TOPIC, &message);
    if (rp){
        printf("MQTT error %d: unable to publish!\n", rp);
    }else{
        printf("MQTT message published succesfully to topic %s\n", TOPIC);
    }

    i++;

    xtimer_sleep(SAMPLING_PERIOD);
    }

    return 0;
}
