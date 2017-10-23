#!/bin/bash
cd server && ./build.sh && cd ../public && ../node_modules/.bin/forever stopall; ../node_modules/.bin/forever start server.js && cd ../server && node dist/server/src/main.js dev