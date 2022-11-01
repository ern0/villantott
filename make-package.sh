#!/bin/bash
set -e

rm -rf *.crx
rm -rf villantott.zip

chrome \
	--pack-extension=extension \
	--pack-extension-key=villantott.pem \
	--no-message-box

mv extension.crx villantott.crx

cp extension/manifest.json .
7z a villantott.zip manifest.json villantott.crx
rm -rf manifest.json