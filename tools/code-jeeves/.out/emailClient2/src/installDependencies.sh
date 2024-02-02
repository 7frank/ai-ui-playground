
#!/bin/bash

# This script provides a function to install npm dependencies.
# It's intended to be sourced into other scripts for re-use.

# Installs necessary npm packages.
installDependencies() {
  echo "Installing npm dependencies..."
  npm install
  echo "Dependencies installed."
}

# To allow this script to be sourced and its function used in other scripts,
# There's no action needed here to 'export' it, as it becomes available once sourced.
# Usage in other script after sourcing this file: installDependencies
