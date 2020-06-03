#!/bin/bash

rm -rf demo
mkdir demo

cp index.html demo/
cp dist/wikipedia-previews.production.js demo/
sed -i '' -e 's/dist\/wikipedia-previews\.development\.js/wikipedia-previews\.production\.js/g' demo/index.html
