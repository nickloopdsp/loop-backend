#!/bin/bash

# Define SDK directory
SDK_DIR=".sdk"

# Read package info from root package.json and format for SDK
PACKAGE_NAME="@loop/sdk"
PACKAGE_VERSION=$(node -p "require('./package.json').version")

# Ensure the SDK directory exists
mkdir -p ${SDK_DIR}

# Generate TypeScript SDK
openapi-generator-cli generate \
  -i http://localhost:3001/api/docs-json \
  -g typescript-axios \
  -o ${SDK_DIR} \
  --global-property=enumUnknownDefaultCase=false \
  --additional-properties=\
supportsES6=true,\
npmName=${PACKAGE_NAME},\
npmVersion=${PACKAGE_VERSION},\
withSeparateModelsAndApi=true,\
modelPropertyNaming=original,\
apiPackage=api,\
modelPackage=models,\
useSingleRequestParameter=true,\
snapshot=false,\
skipTypePackage=false,\
enumNamePrefix=false,\
withoutPrefixEnums=true,\
stringEnums=false,\
useEnumNames=true,\
enablePostProcessFile=true

# Clean up unnecessary files
rm -rf ${SDK_DIR}/.openapi-generator/
rm -f ${SDK_DIR}/.openapi-generator-ignore
rm -f ${SDK_DIR}/.gitignore
rm -f ${SDK_DIR}/git_push.sh

# Update package.json with additional configuration
node -e "
  const fs = require('fs');
  const pkg = require('./${SDK_DIR}/package.json');
  
  pkg.name = '${PACKAGE_NAME}';
  pkg.version = '${PACKAGE_VERSION}';
  pkg.description = 'SDK for Loop';
  pkg.license = 'MIT';
  pkg.publishConfig = { access: 'public' };
  pkg.scripts = {
    ...pkg.scripts,
    'build': 'tsc && tsc -p tsconfig.esm.json',
    'prepare': 'npm run build'
  };
  
  fs.writeFileSync('./${SDK_DIR}/package.json', JSON.stringify(pkg, null, 2));
"

# Format generated code
if command -v prettier &> /dev/null; then
  prettier --write "${SDK_DIR}/**/*.{ts,tsx,js,jsx,json}"
fi

# Install dependencies
cd ${SDK_DIR} && npm install && npm run build 