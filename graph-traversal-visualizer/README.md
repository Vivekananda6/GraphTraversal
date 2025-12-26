# Graph Traversal Visualizer

## Overview
The Graph Traversal Visualizer is a project designed to demonstrate and visualize graph traversal algorithms using C language. It provides a web interface to visualize the traversal process, allowing users to understand how algorithms like Depth-First Search (DFS) and Breadth-First Search (BFS) work.

## Project Structure
```
graph-traversal-visualizer
├── src
│   ├── main.c          # Entry point of the C application
│   ├── graph.c         # Implementation of graph-related functions
│   ├── graph.h         # Header file for graph operations
│   ├── traversal.c     # Implementation of traversal algorithms
│   └── traversal.h     # Header file for traversal algorithms
├── include
│   └── config.h        # Configuration settings and constants
├── web
│   ├── index.html      # Main HTML file for visualization
│   ├── styles.css      # Styles for the web interface
│   ├── app.js          # JavaScript for interaction and rendering
│   └── viz.js          # Visualization functions
├── scripts
│   ├── build_wasm.sh   # Script to build C code into WebAssembly
│   └── run_local_server.sh # Script to start a local server
├── examples
│   └── sample_graphs.txt # Example graph data for testing
├── Makefile             # Build instructions for the project
├── .gitignore           # Files and directories to ignore in version control
└── README.md            # Documentation for the project
```

## Setup Instructions
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd graph-traversal-visualizer
   ```

2. **Build the Project**
   Use the Makefile to compile the C code:
   ```bash
   make
   ```

3. **Run the Local Server**
   Start the local server to serve the web files:
   ```bash
   ./scripts/run_local_server.sh
   ```

4. **Open in Browser**
   Navigate to `http://localhost:8000` in your web browser to access the visualization interface.

## Usage
- Load example graphs from the `examples/sample_graphs.txt` file.
- Select a traversal algorithm (DFS or BFS) to visualize the process.
- Interact with the graph in the web interface to see how the algorithms explore the nodes.

## Algorithms Implemented
- **Depth-First Search (DFS)**: A traversal algorithm that explores as far as possible along each branch before backtracking.
- **Breadth-First Search (BFS)**: A traversal algorithm that explores all the neighbor nodes at the present depth prior to moving on to nodes at the next depth level.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.