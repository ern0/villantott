#!/bin/bash
set -e

chrome=/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome

rm -rf *.crx
rm -rf villantott.zip

"$chrome" \
	--pack-extension=extension \
	--pack-extension-key=villantott.pem \
	--no-message-box

mv extension.crx villantott.crx

cd extension
7z a ../villantott.zip manifest.json ../villantott.crx images scripts
cd ..
rm -rf manifest.json
