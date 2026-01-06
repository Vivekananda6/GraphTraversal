# Copilot instructions for Graph Traversal Visualizer

This repo combines a C-based traversal implementation and a small web UI (D3) used to visualize traversal order. The goal of these instructions is to help AI coding agents be immediately productive in the codebase.

Key points
- **Two-layer architecture**: native C code in `src/` (algorithms, data structures) and a web frontend in `web/` (UI + D3 visualizations). The C program builds with `Makefile`; the web UI is static files served by `scripts/run_local_server.sh`.
- **Build & Run**: primary commands are `make` (compile C) and `./scripts/run_local_server.sh` (serve `web/` on localhost:8000). For native test runs use `make run` which executes `graph_traversal_visualizer` (Makefile uses `-g` and `-Wall`). There's also `scripts/build_wasm.sh` (optional) to target WebAssembly — inspect before using.

Where to look first
- `src/main.c` — entry point and example usage of the `Graph` API.
- `src/graph.c`, `src/graph.h` — current graph implementation (adjacency matrix). Note `graph.c` contains a commented adjacency-list variant (legacy). Pay attention to `MAX_VERTICES` in `graph.h`.
- `src/traversal.c`, `src/traversal.h` — traversal algorithms. Important: `traversal.c` currently references `adjLists`, `Node`, and `Queue` (adjacency-list structures) while `graph.c` implements an adjacency matrix. This mismatch is the most critical repo-specific issue — fix or unify data structures before changing traversal logic.
- `web/app.js` — glue between UI and traversal data; `parseGraphData()` is a TODO and is where the frontend converts text/JSON into the `nodes/links` shape used by `viz.js`.
- `web/viz.js` — D3 rendering; expects a graph object `{ nodes: [{id:...}], links: [{source:, target:}] }` and uses `.id` for node identity. `visualizeTraversal(traversalOrder)` highlights nodes by `id`.

Project-specific conventions and gotchas
- The C code uses manual `malloc`/`free` conventions. Watch for memory leaks when editing `initializeGraph()`/`freeGraph()`.
- Compiler flags: `Makefile` sets `CFLAGS = -Iinclude -Wall -Wextra -g`. Keep `-g` for debug builds and avoid removing warning flags.
- Mixed implementations: there are both adjacency-matrix and adjacency-list patterns present. Do not mix them; either adapt `traversal.c` to use the matrix (access `graph->adjMatrix`) or add a proper adjacency-list implementation in `graph.h`/`graph.c` and update `main.c` examples.
- Web integration: The C program is not currently wired to the frontend — the visualization relies on front-end code to parse examples or data files (`examples/sample_graphs.txt`). If you plan to stream traversal results from the native binary to the UI (e.g., via WebSocket or WASM), note there is no existing IPC — design that integration explicitly.

Examples (quick fixes and patterns)
- To change traversal to use the matrix: in `traversal.c` replace uses of `graph->adjLists` and `Node*` loops with nested loops over `graph->adjMatrix[vertex][i]` and check connections. Search for `adjLists`, `Node`, and `Queue` to find spots to update.
- To keep list-based traversal, implement adjacency list in `graph.h` (types `Node`, `Queue`) and populate them in `graph.c` (or expose both representations explicitly).
- Frontend: implement `parseGraphData()` in `web/app.js` to produce `{ nodes, links }`. Example node format: `{ id: <number|string> }`, link format: `{ source: <id>, target: <id> }`.

Editing guidance for agents
- Preserve public API in `graph.h` unless you update all call sites (`main.c`, `traversal.c`). Small, local changes preferred; prefer adding helper functions rather than wide refactors.
- When changing data structures, update or add unit-style examples in `src/main.c` demonstrating the new API.
- Add comments near any resolved mismatch (matrix vs list) explaining the choice and where legacy code remains.
- Run `make` locally after C changes; run `./scripts/run_local_server.sh` and open `http://localhost:8000` to check frontend effects.

Where tests would go (none present)
- There are no automated tests. If you add tests, place them under a top-level `tests/` folder and provide a simple `make test` target in the `Makefile`.

If something is unclear or missing, ask for clarification. Typical helpful questions:
- Should traversal remain list-based or be adapted to the current matrix implementation?
- Do you want the native binary to communicate directly with the web UI (WASM/HTTP/WebSocket) or keep them separate?

End of instructions — request feedback to refine any missing repository-specific info.
