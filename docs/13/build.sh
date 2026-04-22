#!/bin/bash
# 1. Bunで依存関係をすべて解決し、1つのESMファイルにまとめる
bun build ./src/main.js --outfile ./dist/bundled.js

# 2. Babelで、その1ファイルをES2015形式の「ブラウザ用スクリプト」に変換する
# --no-babelrc を指定して、余計なプラグインが require を入れないようにします
bunx babel ./dist/bundled.js --out-file ./dist/bundle.js --presets @babel/preset-env

echo "Build Complete: dist/bundle.js"
