# HackIIITD
Github Repository for HackIIITD

## FOR THE TIME BEING
#### Make sure you have NodeJS and NPM installed
#### install the dependencies
    >npm install express
    >npm install mongodb
    >npm install body-parser
    >npm install serve-favicon

#### First add the data.json file to the MongoDB Server
    >mongod
    // change the path to directory containing data.json
    // new terminal
    //mongoimport --db track --collection status --file data.json > NO NEED TO IMPORT NOW
    // finally from the root folder
    >node app.js
    
    
#### Updated
    * Web interface for adding and removing records has been added.

#### Finalle Open:
    http://localhost:1000/
