#!/bin/bash
../node_modules/.bin/forever -o out.log -e err.log restart dist/server/src/main.js
