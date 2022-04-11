#!/bin/sh
# Run this script from root of the project directory

npm run build
BUCKET_NAME="crazy-cats-web"
aws s3 rm "s3://${BUCKET_NAME}" --recursive
aws s3 cp ./dist/crazy-cats-app "s3://${BUCKET_NAME}/" --recursive

# neccesary to keep terminal open
$SHELL