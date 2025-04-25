#!/bin/bash

# Extract version from local package.json
VERSION=$(jq -r '.version' package.json)

# Check if version was extracted
if [ -z "$VERSION" ] || [ "$VERSION" = "null" ]; then
  echo "Error: Unable to extract version from package.json"
  exit 1
fi

# Output version info to a file
echo "{\"version\": \"$VERSION\"}" > src/lib/info.json

echo "info.json created with version: $VERSION"
