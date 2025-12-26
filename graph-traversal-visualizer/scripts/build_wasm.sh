#!/bin/bash

# This script builds the C code into WebAssembly using Emscripten.

# Set the path to the Emscripten environment
EMSCRIPTEN_PATH="/path/to/emsdk"

# Navigate to the src directory
cd ../src

# Compile the C code to WebAssembly
$EMSCRIPTEN_PATH/emcc main.c graph.c traversal.c -o ../web/index.html \
    -s WASM=1 -s EXPORTED_FUNCTIONS='["_main", "_dfs", "_bfs"]' \
    -s MODULARIZE=1 -s EXPORT_NAME="createGraphTraversalModule" \
    -I../include

# Navigate back to the scripts directory
cd ../scripts

echo "Build completed. The WebAssembly module is ready for use in the web interface."