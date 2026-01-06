#!/usr/bin/env python3
"""
Simple HTTP Server for Graph Traversal Visualization
Run this file to start the server and access the visualization at http://localhost:8000
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add headers to prevent caching
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        super().end_headers()

def run_server():
    """Start the HTTP server"""
    # Change to the script's directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    handler = MyHTTPRequestHandler
    
    with socketserver.TCPServer(("", PORT), handler) as httpd:
        print("=" * 60)
        print("🔍 Graph Traversal Visualization Server")
        print("=" * 60)
        print(f"✅ Server running at: http://localhost:{PORT}")
        print(f"📂 Serving files from: {os.getcwd()}")
        print("\n📝 Instructions:")
        print("1. Open http://localhost:8000 in your web browser")
        print("2. Click on canvas to add nodes")
        print("3. Use 'Add Edge' button to connect nodes")
        print("4. Select BFS or DFS to visualize traversal")
        print("\n⏹️  Press Ctrl+C to stop the server")
        print("=" * 60 + "\n")
        
        try:
            # Try to open the browser automatically
            webbrowser.open(f'http://localhost:{PORT}')
            print("🌐 Opening browser...\n")
        except:
            pass
        
        httpd.serve_forever()

if __name__ == '__main__':
    try:
        run_server()
    except KeyboardInterrupt:
        print("\n\n✅ Server stopped. Goodbye!")
        exit(0)
    except OSError as e:
        print(f"\n❌ Error: {e}")
        print(f"Port {PORT} might be in use. Try changing the PORT variable.")
        exit(1)
