#!/bin/sh
if [$NODE_ENV == "development"] 
then
    echo "development mode on";
fi
npm run start:dev