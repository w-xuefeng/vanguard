#!/bin/sh

target="dist"
backend="packages/backend/."

rm -rf $target
mkdir $target
cp -r $backend $target
cp check-bun.sh $target/check-bun.sh
rm -rf $target/runtime
echo "bun serve" >>$target/vanguard.sh
