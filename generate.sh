#!/bin/sh

target="dist"
backend="packages/backend/*"

rm -rf $target
mkdir $target
cp -r $backend $target
cp check-bun.sh $target/check-bun.sh
rm -rf $target/runtime
npm install pm2 -g
echo "sh check-bun.sh && bun i && bun serve" >>$target/vanguard.sh
