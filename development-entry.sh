#!/bin/bash
if [ $NODE_ENV == "development" ] 
then
    echo "development mode running";
    npx typeorm migration:run
    npm run start
else
    npm run start
fi