# Outlier Detection in Temporal Network Data

Kyle Boyer (kyleboy1@umbc.edu), Erik J. Sturcke (sturcke1@umbc.edu)

## Introduction

Organizations typically monitor internal network traffic for threats, many of
which can automatically detected and often even mitigated with the help of
tools and network appliances like firewalls and intrusion prevention systems
(IPS). Often these organizations will also have analysts dedicated to
determining if further investigation and mitigation should take place for
detected threats. Analyst may also look for threats not automatically detected,
incorrectly detected or only detected in part. Because of the volume of traffic
on the network, analysts can only consider a small fraction of the traffic in
any detail. Automatically detected threats can often be assigned a severity to
prioritize what analysts should look at first. For novel threats, however,
there’s a greater burden on analysts to find suspect traffic. Visually encoding
network traffic might give analysts the ability to detect certain anomalous
patterns and help guide further analysis. 

## Research Question

Network traffic is both temporal and network (graph) data. It’s important to
note here that we are not considering network topology, but temporally varying
graphs of hosts that are communicating with each other. Our primary area of
investigation is how vis can enhance anomaly detection and evaluation of this
kind of temporal graph data.

## Preliminary Hypothesis

We propose that using a [chord diagram](https://en.wikipedia.org/wiki/Chord_diagram)
and the ability for an analyst to chose visual encoding of attributes around
the perimeter of the circle, certain anomalous traffic will be able to be
visually detected.

## Implementation Details

The UI will be browser based, written in JavaScript and use
[D3.js](https://d3js.org/) to draw the vis. For the initial implementation, the
data will be preprocessed to bring it to a size small enough to be used by the
browser in whole and run on a laptop with 16GB of memory. The initial version
will target the current version of Chrome, but should work in all modern
browsers.

TODO:

  - Brief abstract (3-4 sentences) giving a summary of your proposal
  - Tasks and metrics you might use to test your hypotheses
