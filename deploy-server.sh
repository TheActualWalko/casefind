#!/bin/bash
cd server && tsc && scp -r ./dist root@casefind.org:/var/www/server/ && ssh root@casefind.org 'cd /var/www/server && ../node_modules/.bin/forever restart dist/main.js'