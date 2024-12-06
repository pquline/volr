#!/bin/bash

rm -rf ./.amplify-hosting

mkdir -p ./.amplify-hosting/compute

cp -r . ./.amplify-hosting/compute/default
cp -r ./node_modules ./.amplify-hosting/compute/default/node_modules

cp -r assets ./.amplify-hosting/static

cp deploy-manifest.json ./.amplify-hosting/deploy-manifest.json