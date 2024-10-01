#!/usr/bin/env bash
set -e

# build
NODE_ENV=production npx esbuild "./src/*/**/*.ts" "./src/*/**/*.tsx" --format=esm --outdir=./dist               --outbase=./src --minify --pure:React.createElement --platform=browser --target=es2019 &
NODE_ENV=production npx esbuild "./src/index.ts"                     --format=esm --outfile=./dist/index.esm.js --outbase=./src --minify --pure:React.createElement --platform=browser --target=es2019 &

# Generate ESM types
tsc --emitDeclarationOnly --outDir ./dist --noCheck &

# wait for tasks
wait
