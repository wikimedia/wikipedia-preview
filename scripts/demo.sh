#!/bin/bash

rm -rf demo
mkdir demo

cp index.html demo/
cp dist/wikipedia-preview.production.js demo/
cp dist/wikipedia-preview.css demo/
sed -i -e 's/dist\/wikipedia-preview\.development\.js/wikipedia-preview\.production\.js/g' demo/index.html
sed -i -e 's/dist\/wikipedia-preview\.css/wikipedia-preview\.css/g' demo/index.html
