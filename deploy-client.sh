#!/bin/bash
cd client && npm run build && scp -r ./build root@casefind.org:/var/www/client/ && ssh root@casefind.org 'cd /var/www/server && ../node_modules/.bin/forever restart dist/main.js'