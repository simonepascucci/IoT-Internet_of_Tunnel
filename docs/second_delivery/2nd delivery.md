# 2nd delivery

## Comment received

The first observation we received was regarding the lack of data and numerical evidence to substantiate and validate our thesis.  
Consequently, our main objective for the second delivery was to conduct in-depth research and collect accurate data from both the real scenarios and the demonstration simulation.  
The other observation we received was the lack of information regarding the technical aspects of implementing the network infrastructure. We therefore focused on the development and understanding of how to implement the network.  
A final minor observation involved the option of operating our system using an external power source, specifically a battery, in emergency situations. However, upon careful consideration, we have chosen not to implement this solution since on practical scenarios, it would be unrealistic to power all the actuators uniquely through a battery pack.

## Changes made

We adopted a new approach to tackle the problem, which influenced the design of the solution. Our new approach involves referring to a comprehensive set of guidelines and regulations from regulatory bodies that provide all the necessary information. By adhering to these regulations, we have structured our work to ensure compliance with the required standards.  
This approach did not change the overall architecture much but helped us to define how and when the system msut react in specific situations.  
Compared to the first delivery, we also redesigned the network infrastructure, avoiding the use of the LoRa network and adopting the use of MQTT.

## Future improvements

The main functionality we intend to introduce with the third delivery is the inclusion of external data on hour-by-hour traffic forecasts. Our goal is to include this information in the algorithm that decides the sampling period, to optimise the overall performance of the system.
The web application is also still under development and has not yet been finalised. This application should be basically an interface including graphical tools to help tunnel operators monitor the measured data.
