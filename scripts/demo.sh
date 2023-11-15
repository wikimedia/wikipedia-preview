#!/bin/bash

mkdir -p demo/script

cp dist/wikipedia-preview.umd.cjs demo/script
cp dist/style.css demo/css
sed -i -e 's/\/dist\/wikipedia-preview\.umd\.cjs/\.\.\/script\/wikipedia-preview\.umd\.cjs/g' demo/articles/*.html
sed -i -e 's/\/dist\/style.css/\.\.\/css\/style\.css/g' demo/articles/*.html
