#!/bin/bash
cd /home/ubuntu/youtube-downloader-app

npm install 
cd client 
npm install 
npm install --only=dev --no-shrinkwrap 
yarn build

