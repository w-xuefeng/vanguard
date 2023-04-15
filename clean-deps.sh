#!/bin/sh

lockFile="bun.lockb"
rootDepsDir="node_modules"
packagesDepsDir="packages/*/node_modules"

if [ -f $lockFile ]; then
  rm $lockFile
fi

rm -rf $rootDepsDir
rm -rf $packagesDepsDir
