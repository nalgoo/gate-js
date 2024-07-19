#!/usr/bin/env sh
set -e

# Generate actual builds
#npx esbuild ./src/index.ts --format=esm --outfile=./dist/index.esm.js --sourcemap --bundle --platform=browser --target=es2021 "$@" --watch --external:react --external:react-dom

npx esbuild "./src/*/**/*.ts" "./src/*/**/*.tsx" --format=esm --outdir=./dist               --outbase=./src --platform=browser --target=es2021 --watch --sourcemap
