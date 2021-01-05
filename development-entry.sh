#!/bin/bash
if [ $NODE_ENV == "development" ] 
then
    echo "development mode running";
    npm run prebuild
    npx typeorm migration:run
    npm run start
else
    npm run start
fi