# Evaluation

## Overview

The IoT project is designed to monitor air quality and light levels under a tunnel. Some air quality sensors and some photoresistor are used to collect data in real-time. The system is connected to some actuators that activates the fan system when the air quality decreases below a certain threshold, and the lighting system that turn on independently when the light levels fall below a certain value.

## Performance evaluation metrics

### Air quality

The European Union established the current Ambient Air Quality and Clean Air for Europe Standards in 2008 under the Thematic Strategy on Air Pollution. (TSAP). We base our performance evaluation on this standard.

https://environment.ec.europa.eu/topics/air/air-quality/eu-air-quality-standards_en

From all the pollutant listed, the ones produced by motor vehicles are (in order of emitted quantity):

1. carbon dioxide (CO2)
2. carbon monoxide (CO)
3. nitrogen dioxide (NO2)
4. sulfur dioxide (SO2)
5. particulate matter (PM)
6. volatile organic compounds (VOCs)

The limit values as stated in the Standard are:

| Pollutant          | Formula | Maximum concentration | Maximum exposition time |
| :----------------- | :-----: | --------------------: | ----------------------- |
| carbon dioxide     |   CO2   |            1800 mg/m3 | 8 hour                  |
| carbon monoxide    |   CO    |              10 mg/m3 | 8 hour                  |
| Nitrogen dioxide   |   NO2   |             200 mg/m3 | 1 hour                  |
| Sulphur dioxide    |   SO2   |             350 mg/m3 | 1 hour                  |
| Particulate matter |  PM10   |              50 mg/m3 | 24 hour                 |

2. Once the

### Accuracy

The accuracy of the system is a key performance metric. The solution in question, must accurately measure and detect changes in air quality and light levels.
The overall values detected must remain inside a defined range to consider the solution effective.

### Responsiveness

The responsiveness of the system is also important. The system should respond to changes in air quality and light levels, to ensure the correct functioning, also in case of emergency situations.
One way to evaluate this parameter would be to expose it to specific changes in air quality and light levels and measure the time it takes to reach the predefined range after these changes.

## Expected results

As mentioned before, to consider the system effective, the overall values detected must remain inside a defined range. We then expect that our system is capable of manage different traffic situations and lightning conditions by keeping the values in question inside the correct ranges.  
As a prerequisite for achieving this behaviour, we expect the accuracy of the system to be good enough to allow the system to detect and react to specific situations and requirements in a reasonable amount of time.

Therefore, we finally expect a decrease in the number of car accident inside the gallery and a more efficient power management.
