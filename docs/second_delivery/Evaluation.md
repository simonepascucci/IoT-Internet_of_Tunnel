# Evaluation

## What needs to be evaluated

As discussed in detail in the Concept file, the aim of the project is to monitor air quality and lighting conditions inside car tunnels, with a focus on energy consumption.  
What needs to be evaluated is therefore the ability of the system to keep lighting and air quality conditions under control, as well as the overall energy utilization.  
Below is a brief explanation of the details of how these factors can be evaluated.

## Air quality

The project's objective related to air quality is to ensure that it remains below the threshold specified in the Design file, thereby maintaining a satisfactory level of air quality.  
In order for the system to be deemed effective, it is crucial that the levels of air quality pollutants do not exceed specified values for a duration that is considered harmful to human health. The specified time limit can be found in the Design file's table.  
After the initial version of the system is fully developed and deployed, it might be necessary to employ external sensors for monitoring purposes. These sensors would verify whether the values reported by the system align with the measurements obtained independently.

## Light conditions

In the context of ensuring an effective system, similar to air quality, it is crucial to guarantee minimum light values throughout the entire tunnel. Additionally, just like with the previous case, it may be necessary to incorporate external sensors for monitoring purposes after its full development and deployment.

## Overall energy usage

The energy consumption of the proposed system is calibrated based on the actual needing of the various actuators, particularly the air conditioning system. This enables the system to intelligently activate or deactivate the actuators and adjust their intensity as needed, resulting in optimized energy usage. As a result, when traffic is low or there is ample natural light, our system can consume significantly less energy compared to a system that does not calibrate the usage of actuators and operates at maximum speed continuously.  
We performed some experiments with our prototype to better explain this.

![](/docs/src/images/schemas/energy_consumption.jpg)

## Network

Our network architecture has been designed in a way that doesn't raise any specific criticisms. However, it is important to ensure that the board can establish a connection with the MQTT bridge, and from there, maintain a stable internet connection.
