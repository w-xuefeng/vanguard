rm -rf dist
mkdir dist
cp -r packages/backend/ dist
cp check-bun.sh dist/check-bun.sh
echo "sh check-bun.sh && npm start" >>dist/start.sh
