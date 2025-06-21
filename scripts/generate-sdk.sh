#!/bin/bash

# Define SDK directory
SDK_DIR=".sdk"

# Read package info from root package.json and format for SDK
PACKAGE_NAME="@loop/sdk"
PACKAGE_VERSION=$(node -p "require('./package.json').version")
npmlink=true
CWD=$(pwd)

echo "Current working directory: ${CWD}"
echo "SDK directory: ${CWD}/${SDK_DIR}"

# delete the sdk directory
rm -rf ${SDK_DIR}

# Ensure the SDK directory exists
mkdir -p ${SDK_DIR}

# Generate TypeScript SDK
openapi-generator-cli generate \
  -i http://localhost:3001/api/docs-json \
  -g typescript-axios \
  -o ${SDK_DIR} \
  --skip-validate-spec \
  -c openapigeneratorconfig.json
# openapi-generator-cli generate \
#   -i http://localhost:3001/api/docs-json \
#   -g typescript-axios \
#   -o ${SDK_DIR} \
#   --global-property=enumUnknownDefaultCase=false \
#   --additional-properties=\
# supportsES6=true,\
# npmName=${PACKAGE_NAME},\
# npmVersion=${PACKAGE_VERSION},\
# withSeparateModelsAndApi=true,\
# modelPropertyNaming=original,\
# apiPackage=api,\
# modelPackage=models,\
# useSingleRequestParameter=true,\
# snapshot=false,\
# skipTypePackage=false,\
# enumNamePrefix=false,\
# withoutPrefixEnums=true,\
# stringEnums=false,\
# useEnumNames=true,\
# enablePostProcessFile=true

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

# Install dependencies and build SDK
echo "Installing dependencies and building SDK..."
# Using pushd/popd for safer directory changes
pushd ${SDK_DIR}
npm install && npm run build

# Link the SDK if npmlink is true
if [ "$npmlink" = true ]; then
  echo "Linking SDK..."
  
  # Create global npm link from SDK directory
  npm link
  echo "✅ Created global npm link for ${PACKAGE_NAME}"
  
  # Verify the global link was created
  npm ls -g @loop/sdk --depth=0
  
  # Go back to previous directory (project root)
  popd
  
  FRONTEND_DIR="${CWD}/../loop-frontend"

  # Link SDK to frontend project
  if [ -d "$FRONTEND_DIR" ]; then
    echo "Linking SDK to frontend at ${FRONTEND_DIR}..."
    pushd "$FRONTEND_DIR"
    npm link ${PACKAGE_NAME}
    popd # Go back to project root
    
    # Final verification
    echo "Verifying link in frontend..."
    if [ -L "${FRONTEND_DIR}/node_modules/@loop/sdk" ]; then
        echo "✅ Successfully linked ${PACKAGE_NAME} to loop-frontend"
        echo "You can now import from '${PACKAGE_NAME}' in your frontend project"
    else
        echo "❌ ERROR: Failed to create symbolic link in frontend node_modules."
        echo "Try running 'npm link @loop/sdk' manually in the '${FRONTEND_DIR}' directory."
        exit 1
    fi
  else
    echo "⚠️  Warning: Frontend directory not found at ${FRONTEND_DIR}"
    echo "SDK is linked globally but not connected to a frontend project."
  fi
fi






