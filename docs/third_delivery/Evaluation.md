# Evaluation

This file is an updated version of [this file](/docs/second_delivery/Evaluation.md)

## What needs to be evaluated

As discussed in detail in the Concept file, the aim of the project is to monitor air quality and lighting conditions inside car tunnels, with a focus on energy consumption.  
What needs to be evaluated is therefore the ability of the system to keep lighting and air quality conditions under control, as well as the overall energy utilization.  
Below is a brief explanation of the details of how these factors can be evaluated.

## Air quality

The project's objective related to air quality is to ensure that it remains below the threshold specified in the Design file, thereby maintaining a satisfactory level of air quality.  
In order for the system to be deemed effective, it is crucial that the levels of air quality pollutants do not exceed specified values for a duration that is considered harmful to human health. The specified time limit can be found in the Design file's table.  
After the initial version of the system is fully developed and deployed, it might be necessary to employ external sensors for monitoring purposes. These sensors would verify whether the values reported by the system align with the measurements obtained independently.

Finally, in order to analyze changes in air quality, we collected external data on traffic patterns from a website that provides a complete chronology of road travel times in recent years.  
We subsequently used this data to create a graph that illustrates the trend, as shown below.
![](/docs/src/images/external_data.jpg)
This enabled us to compare sensor readings with predicted air quality changes based on the traffic data.  
Similar trends indicate proper operation.
We tought to integrate this data through the APIs provided by the precedently mentioned website called OutScraper and accessible [at this link](https://outscraper.com). 
Unfortunately the service is not free so we weren't able to use the APIs in our prototype.

## Light conditions

In the context of ensuring an effective system, similar to air quality, it is crucial to guarantee minimum light values throughout the entire tunnel. Additionally, just like with the previous case, it may be necessary to incorporate external sensors for monitoring purposes after its full development and deployment.  
Finally, for the system to be considered effective, any error or failure in the lighting system must be promptly detected and notified to the operator.

## Overall energy usage

TThe energy consumption of the proposed system mostly depends on the actual energy requirements of the air conditioning system. This enables the system to intelligently activate or deactivate the actuators and adjust their intensity as needed, resulting in optimized energy usage. As a result, when traffic is low, our system consumes significantly less energy compared to a system that does not calibrate the usage of actuators and operates at maximum speed continuously.  
We performed some experiments with our prototype to better explain this concept trough an example.  
The following graph compares the power consumption of our system with an identical system in the same condition in which the fan system is always at maximum speed.  
Depending on the fan speed, our ventilation system is able to save up to 20% energy when activated at minimum speed.

![](/docs/src/images/schemas/energy_consumption.jpg)

The data on the power consumption used for creating this graph are the one reported in the Design file.  
Notice that this is an example performed on our prototype but that can also be extended in a real case scenario with the right adjustments.

## Network

Our network architecture has been designed in a way that doesn't raise any specific criticisms. However, it is important to ensure that the board can establish a connection with the MQTT bridge, and from there, maintain a stable internet connection.
