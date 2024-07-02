#!/usr/bin/env sh

# npx esbuild main.ts --format=esm --outdir=dist --minify --pure:React.createElement --platform=browser --target=es2019 --outbase=./src --external:react --external:react-dom

npx esbuild main.ts --format=esm --outfile=index.js --minify --pure:React.createElement --platform=browser --target=es2019 --outbase=./src --external:react --external:react-dom --bundle
