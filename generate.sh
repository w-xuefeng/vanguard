rm -rf dist
mkdir dist
cp -r packages/backend/ dist
cp check-bun.sh dist/check-bun.sh
rm -rf dist/runtime
echo "sh check-bun.sh && bun bun-i && bun serve" >>dist/vanguard.sh
