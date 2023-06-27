# Concept

This file is an updated version of [this file](/docs/second_delivery/Concept.md)

## Brief Description

Our project aims to employ a network of sensors and actuators to automate the management and monitoring of air quality and lighting conditions inside car galleries. We aim to offer a remote tool that enables remote monitoring providing a convenient means for continuous surveillance.  
The goal of this section is to provide users with a comprehensive overview of the smart tunnel, describing the system usage from their point of view.

## Tunnel operator point of view

### Deployment

To work properly, a set of sensors and actuators needs to be deployed inside the tunnel. To enable monitoring and management, it is essential that these units establish a direct connection to the board.  
The following schema provides a high level overview on how the components must be connected together.

![Project architecture outline](/docs/src/images/schemas/concept_outline.JPG)

The following image shows a schematic representation of a tunnel, illustrating the positioning of sensors and actuators in a real use case.

![Usage example](/docs/src/images/schemas/usage_example.jpg)

### Usage

To use the system, an operator simply needs to install the IoT sensors and actuators in the car gallery and connect them to the system's hub. Once the sensors are connected, they will begin collecting data on the air quality and lighting levels in the gallery.  
Based on the data collected, the system will automatically manage the air conditioning system to maintain optimal conditions inside the gallery. Moreover, it will be capable of promptly detect anomalies in the lightening apparatus and quickly inform the technicians.  
In addition, the data collected by the sensors will be tracked and transmitted to a remote server, where the operator will be able to access for remote monitoring.

## Tunnel user point of view

The entire system should operate seamlessly and without any noticeable impact on the regular users of the tunnels, including cars, motorcycles, and pedestrians. Transparency is key, ensuring that the system functions discreetly without causing disruption or inconvenience to those utilizing the tunnels.  
The normal users should only benefit of a more controlled and clean air.
