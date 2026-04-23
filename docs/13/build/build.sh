#!/bin/bash
set -e

# 1. Bunでバンドル（1つのESMファイルにまとめる）
# 出力先は一旦 dist 直下の作業用ファイル
bun build ../src/js/main.js --outfile ../dist/bundled.js

# 2. BabelでES2015形式に変換
# --config-file で build フォルダ内の設定を指定
bunx babel ../dist/bundled.js --out-file ../dist/es2015/bundle.js --config-file ./babel.config.json

# 3. CSSとHTMLのコピー（es2015用）
cp ../src/css/scene.css ../dist/es2015/
cp ../src/index.html ../dist/es2015/

# 4. 作業用ファイルの削除
rm ../dist/bundled.js

echo "Build Complete: dist/es2015/"
