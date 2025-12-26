#!/bin/bash

# This script starts a local server to serve the web files for testing the visualization.

# Change to the web directory
cd ../web

# Start a simple HTTP server
python3 -m http.server 8000

# You can access the server at http://localhost:8000 in your web browser.