#!/bin/bash

mkdir -p demo/script

cp dist/wikipedia-preview.production.js demo/script
cp dist/wikipedia-preview.css demo/css
sed -i -e 's/\.\.\/wikipedia-preview\.development\.js/\.\.\/script\/wikipedia-preview\.production\.js/g' demo/articles/*.html
sed -i -e 's/\.\.\/wikipedia-preview\.css/\.\.\/css\/wikipedia-preview\.css/g' demo/articles/*.html
