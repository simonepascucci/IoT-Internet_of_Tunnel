# Concept

This file is an updated version of [this file](/docs/first_delivery/Concept.md)

## Brief Description

Our project aims to employ a network of sensors and actuators to automate and optimize the management and monitoring of air quality and lighting conditions inside car galleries. We aim to offer a remote tool that enables real-time monitoring and usage, providing a convenient means for continuous surveillance and utilization.  
The goal of this delivery is to provide readers with a comprehensive overview of the smart tunnel, detailing how the system works and illustrating technical data and assumptions.

## Tunnel operator point of view

### Deployment

To work properly, a set of sensors and actuators needs to be deployed inside the tunnel. To enable monitoring and management, it is essential that these units establish a direct connection to the board.  
The following schema provides a high level overview on how the components must be connected together.

![Project architecture outline](/docs/src/images/schemas/concept_outline.JPG)

The following image shows a schematic representation of a tunnel, illustrating the positioning of sensors and actuators in a prototype.

![Usage example](/docs/src/images/schemas/usage_example.jpg)

### Monitoring and usage

The operators in charge of monitoring and utilization of the smart tunnel system will have access to a web app from which they will be able to check the current state of the tunnel. They will be able to monitor the data collected by the sensors, and to perform specific measurements on demand. This means that the operator is able change the measurement frequency rate and timing.  
This system also allows the operator to remotely control the actuators.  
The regulamentation for defining the designated individual in charge to perform these actions will follow the rules of the specific tunnel ordinance.

## Tunnel user point of view

The entire system should operate seamlessly and without any noticeable impact on the regular users of the tunnels, including cars, motorcycles, and pedestrians. Transparency is key, ensuring that the system functions discreetly without causing disruption or inconvenience to those utilizing the tunnels.  
The normal users should only benefit of a more controlled and clean air.
