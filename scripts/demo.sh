#!/bin/bash

mkdir -p demo/script

cp dist/wikipedia-preview.umd.cjs demo/script
cp dist/wikipedia-preview.css demo/css
sed -i -e 's/\/dist\/wikipedia-preview\.umd\.cjs/\.\.\/script\/wikipedia-preview\.umd\.cjs/g' demo/articles/*.html
