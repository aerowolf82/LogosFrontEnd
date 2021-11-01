# SND100 
## _The Space Nerds Database_

[![N|Solid](https://cldup.com/dTxpPi9lDf.thumb.png)](https://nodesource.com/products/nsolid)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

### Table of Contents


The Space Nerds Database has quick access to historical launch information.

- [Problem Statement](#Problem-Statement)
- [Features](#Features)
- [Installation](#Installation)
- [Usage Instructions](#Usage-Insructions)
- [Related Projects](#Related-Projects)

## Problem Statement
There is a gap with nerds not having all of the space data that they need at the touch of a button. This gap reduces the fun that can be had with ease when it comes to exploring space history. Developing a tool for solving this problem will allow space nerds everywhere to explore space from their home with ease.



## Features

- Have a default path of ‘/spacecraft’ that has the names and images of each launch
- Can dig deeper into ’spacecraft/:id’ for more details.
- Can search by pad number and will give data about all flights from that pad
- Stretch goal:
-- Favorite the spacecraft and see a list of favorites (call the database not the api)





And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd dillinger
npm i
node app
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## Usage Instructions

Dillinger is currently extended with the following plugins.
Instructions on how to use them in your own application are linked below.

| endpoint | what it returns |
| ------ | ------ |
| /spacecraft | returns a list of all spacecraft in database |
| /spacecraft/:name | return a specific spacecraft|
| /pad | returns a list of known launch pads |
| /pad/:name | returns details on a specific pad |


## Related Projects

[Front End]
[Back End]



[//]: # 

   [Front End]: <a href=https://github.com/aerowolf82/LogosFrontEnd>
   [Back End]: <a href=https://github.com/aerowolf82/LogosBackEnd>


   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
