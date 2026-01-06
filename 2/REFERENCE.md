# 📖 Complete Reference Guide - Graph Traversal Visualization

## 📑 Table of Contents
1. [Getting Started](#getting-started)
2. [User Interface](#user-interface)
3. [Graph Creation](#graph-creation)
4. [Algorithm Visualization](#algorithm-visualization)
5. [C Code Reference](#c-code-reference)
6. [Data Structures](#data-structures)
7. [Frequently Asked Questions](#frequently-asked-questions)
8. [Keyboard Shortcuts](#keyboard-shortcuts)

---

## Getting Started

### System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Python 3.6+ (for running server.py)
- Windows/Mac/Linux

### Installation
1. Navigate to the GraphTraversal/2 folder
2. Run `run_server.bat` (Windows) or `python server.py` (All platforms)
3. Open http://localhost:8000 in your browser

---

## User Interface

### Header Section
- **Title**: Graph Traversal Visualization
- **Subtitle**: Interactive BFS & DFS Animation

### Main Canvas (Left Side)
- **White Background**: Drawing area for your graph
- **Node Circles**: Represent vertices in the graph
- **Directed Arrows**: Show edges between nodes

### Control Panel (Below Canvas)
Contains buttons and inputs for graph operations and traversal control

### Info Sidebar (Right Side)
- **Statistics**: Node and edge counts
- **Queue/Stack Display**: Shows nodes pending processing
- **Traversal Order**: Final sequence of visited nodes
- **Legend**: Color meaning reference

### Code Section (Bottom)
- **BFS Code Tab**: Complete C implementation of BFS
- **DFS Code Tab**: Complete C implementation of DFS

---

## Graph Creation

### Adding Nodes

**Method 1: Click to Place**
```
1. Click anywhere on the canvas
2. A new node appears at that location
3. Node ID auto-increments (0, 1, 2, ...)
4. White circle with black border = unvisited
```

**Constraints**:
- Maximum nodes recommended: 20
- Nodes appear at exact click location
- IDs are assigned sequentially

### Removing Nodes

Currently, individual node removal is not supported. Use **Clear Graph** to remove all nodes at once.

### Adding Edges

**Step-by-Step Process**:
```
1. Click "✏️ Add Edge" button
2. First node outline may highlight (visual feedback)
3. Click on first node (source)
4. Click on second node (destination)
5. Edge appears with arrow pointing to destination
```

**Important Rules**:
- ❌ Cannot create self-loop (node to itself)
- ❌ Cannot create duplicate edges
- ✅ Edges are directional (0→1 is different from 1→0)
- ✅ You can go both directions if you add two separate edges

**Edge Visualization**:
- Gray line connecting nodes
- Arrow at destination node
- No arrow means one-directional edge

### Graph Operations

#### Clear Graph Button 🗑️
```
Confirmation: "Are you sure you want to clear the graph?"
Effect: Removes all nodes and edges
Resets: Node ID counter to 0
```

#### Random Graph Button 🎲
```
Generates: 5-7 random nodes
Adds: Random edges between nodes
Prevents: Overlapping node placement (auto-spacing)
Useful for: Testing and learning without manual creation
```

---

## Algorithm Visualization

### Starting Traversal

#### BFS (Breadth-First Search)
```
Button: 🟦 BFS

Input: 
  - Start node number (0-based indexing)
  - Must be valid: 0 ≤ node < total_nodes

Process:
  1. Marks start node as visited
  2. Adds to queue
  3. Dequeues and processes each node
  4. Adds unvisited neighbors to queue back
  5. Repeats until queue empty

Order: Level-by-level (breadth-first)
```

**Algorithm Pseudocode**:
```
Queue ← empty
visited[startNode] ← true
enqueue(Queue, startNode)

while Queue not empty:
    node ← dequeue(Queue)
    display(node)
    
    for each neighbor of node:
        if not visited[neighbor]:
            visited[neighbor] ← true
            enqueue(Queue, neighbor)
```

#### DFS (Depth-First Search)
```
Button: 🟥 DFS

Input:
  - Start node number (0-based indexing)
  - Must be valid: 0 ≤ node < total_nodes

Process:
  1. Marks start node as visited
  2. Adds to stack
  3. Pops and processes each node
  4. Adds unvisited neighbors to stack top
  5. Repeats until stack empty

Order: Depth-first (following paths to their end)
```

**Algorithm Pseudocode**:
```
Stack ← empty
visited[startNode] ← true
push(Stack, startNode)

while Stack not empty:
    node ← pop(Stack)
    display(node)
    
    for each neighbor of node:
        if not visited[neighbor]:
            visited[neighbor] ← true
            push(Stack, neighbor)
```

### Controlling Traversal

#### Speed Control (Speed Slider)
```
Range: 100ms - 2000ms
Default: 800ms
Effect: Delay between processing each node

Examples:
  - 100ms: Too fast to follow, instant completion
  - 500ms: Fast but followable
  - 800ms: Recommended, good balance
  - 1500ms: Slow, great for learning
  - 2000ms: Very slow, maximum visibility
```

#### Step Mode
```
Toggle Button: ⏸️ Toggle Step Mode

When ON:
  - Traversal pauses after each node
  - Manual control over execution
  - Can pause/resume at any time

When OFF:
  - Continuous animation at set speed
  - No manual intervention needed
```

#### Next Step Button
```
Button: ⏭️ Next Step

Available: Only when step mode is ON and traversal active
Effect: Process one node and pause

Workflow:
  1. Enable step mode
  2. Start BFS or DFS
  3. Click "Next Step" repeatedly
  4. See each operation in detail
```

#### Stop Button
```
Button: ⏹️ Stop

Effect: 
  - Stops current traversal immediately
  - Resets all node colors
  - Clears queue/stack display
  - Resets traversal order

Use: When you want to start a new traversal or change graph
```

### Visual Feedback During Traversal

#### Node Color Transitions
```
Timeline of a single node:

1. START: ⚪ White (unvisited)
2. QUEUED: ⚪ White (in queue/stack, not current)
3. CURRENT: 🔵 Blue (currently being processed)
4. FINISHED: 🟢 Green (completely processed)
```

#### Queue/Stack Display
```
Shows: Up to all pending nodes

BFS (Queue):
  - First item: Node to process next
  - Highlighted: Current/active node
  - Below: Waiting nodes (FIFO order)

DFS (Stack):
  - First item: Node to process next
  - Highlighted: Current/active node
  - Below: Waiting nodes (LIFO order)
```

#### Traversal Order
```
Shows: Nodes in order they were processed

Format: Node 0 | Node 2 | Node 1 | ...
Update: After each node processing
Final: Complete traversal sequence

Use: Verify algorithm correctness
```

---

## C Code Reference

### BFS Implementation (From Visualization)

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

#define MAX_NODES 100
#define MAX_QUEUE 100

// Queue structure for BFS
typedef struct {
    int items[MAX_QUEUE];
    int front, rear;
} Queue;

void enqueue(Queue* q, int value) {
    q->items[++q->rear] = value;
}

int dequeue(Queue* q) {
    return q->items[q->front++];
}

bool isQueueEmpty(Queue* q) {
    return q->front > q->rear;
}

// BFS: Breadth-First Search
void BFS(int adj[MAX_NODES][MAX_NODES], int startNode, int numNodes) {
    bool visited[MAX_NODES] = {false};
    Queue q;
    q.front = 0;
    q.rear = -1;

    visited[startNode] = true;
    enqueue(&q, startNode);

    printf("BFS: ");
    while (!isQueueEmpty(&q)) {
        int node = dequeue(&q);
        printf("%d ", node);  // Visit/process the node

        // Check all neighbors
        for (int i = 0; i < numNodes; i++) {
            if (adj[node][i] == 1 && !visited[i]) {
                visited[i] = true;
                enqueue(&q, i);
            }
        }
    }
    printf("\n");
}
```

**Key Points**:
1. **visited[]**: Prevents re-processing nodes
2. **Queue**: Uses front/rear pointers
3. **enqueue()**: Adds to back (rear++)
4. **dequeue()**: Removes from front (front++)
5. **adj[][]**: Adjacency matrix (1 = edge exists)

### DFS Implementation (From Visualization)

**Recursive Version**:
```c
void DFS(int adj[MAX_NODES][MAX_NODES], int node, bool visited[MAX_NODES], int numNodes) {
    visited[node] = true;
    printf("%d ", node);  // Visit/process the node

    // Check all neighbors
    for (int i = 0; i < numNodes; i++) {
        if (adj[node][i] == 1 && !visited[i]) {
            DFS(adj, i, visited, numNodes);  // Recursive call
        }
    }
}

void DFSTraversal(int adj[MAX_NODES][MAX_NODES], int startNode, int numNodes) {
    bool visited[MAX_NODES] = {false};
    printf("DFS: ");
    DFS(adj, startNode, visited, numNodes);
    printf("\n");
}
```

**Iterative Version**:
```c
typedef struct {
    int items[MAX_NODES];
    int top;
} Stack;

void push(Stack* s, int value) {
    s->items[++s->top] = value;
}

int pop(Stack* s) {
    return s->items[s->top--];
}

bool isStackEmpty(Stack* s) {
    return s->top == -1;
}

void DFSIterative(int adj[MAX_NODES][MAX_NODES], int startNode, int numNodes) {
    bool visited[MAX_NODES] = {false};
    Stack s;
    s.top = -1;

    visited[startNode] = true;
    push(&s, startNode);

    printf("DFS (Iterative): ");
    while (!isStackEmpty(&s)) {
        int node = pop(&s);
        printf("%d ", node);

        for (int i = 0; i < numNodes; i++) {
            if (adj[node][i] == 1 && !visited[i]) {
                visited[i] = true;
                push(&s, node);
            }
        }
    }
    printf("\n");
}
```

**Key Points (Recursive)**:
1. Simple and elegant
2. Uses call stack
3. Limited by stack size
4. Automatic backtracking

**Key Points (Iterative)**:
1. More control
2. Uses explicit stack
3. No recursion limit
4. Manual backtracking

---

## Data Structures

### Adjacency Matrix (Used in C Code)

```c
int adj[MAX_NODES][MAX_NODES];

// Example: 4 nodes, edges 0→1, 1→2, 0→3
   0 1 2 3
0: 0 1 0 1
1: 0 0 1 0
2: 0 0 0 0
3: 0 0 0 0

adj[0][1] = 1  // edge 0→1
adj[0][3] = 1  // edge 0→3
adj[1][2] = 1  // edge 1→2
```

**Time Complexity**:
- Check edge: O(1)
- Get all neighbors: O(V)
- Space: O(V²)

### Queue (Used for BFS)

```c
typedef struct {
    int items[MAX_QUEUE];
    int front;
    int rear;
} Queue;

// Operations:
enqueue(q, 5);      // Add to back
int x = dequeue(q); // Remove from front
isEmpty(q);         // Check if empty
```

**Properties**:
- FIFO: First In, First Out
- Front pointer increments
- Rear pointer increments
- Circular queue variation: Reset pointers after dequeue

### Stack (Used for DFS)

```c
typedef struct {
    int items[MAX_NODES];
    int top;
} Stack;

// Operations:
push(s, 5);      // Add to top
int x = pop(s);  // Remove from top
isEmpty(s);      // Check if empty
```

**Properties**:
- LIFO: Last In, First Out
- Single pointer (top)
- Top increments on push
- Top decrements on pop

---

## Frequently Asked Questions

### Q: Why does my graph show "no edges"?
**A**: 
1. Click "✏️ Add Edge" button first
2. Click on first node, then second node
3. Make sure they're different nodes (no self-loops)

### Q: Can I remove individual nodes?
**A**: 
Currently no, but you can:
1. Click "Clear Graph" to remove everything
2. Rebuild the graph with fewer nodes

### Q: What's the difference between BFS and DFS?
**A**:
| Feature | BFS | DFS |
|---------|-----|-----|
| Data Structure | Queue (FIFO) | Stack (LIFO) |
| Order | Level by level | Deep first |
| Shortest Path | Yes (unweighted) | No |
| Memory | O(breadth) | O(height) |
| Use Case | Shortest path, social network | Cycle detection, topological sort |

### Q: Why is a node not being visited?
**A**:
1. Node might not be reachable from start node
2. No edge connecting it to the traversal
3. Check if the graph is fully connected

### Q: How do I create a disconnected graph?
**A**:
1. Create multiple separate groups of nodes
2. Only create edges within groups, not between them
3. Run BFS/DFS - only one group gets visited!

### Q: What's the maximum number of nodes?
**A**:
- Theoretical: 100 (hardcoded in C code)
- Practical: ~20 (for visibility)
- Recommended: 5-15 for learning

### Q: Can I create edge from Node 0 to Node 0?
**A**:
No, self-loops are prevented for simplicity.

### Q: What if two nodes overlap?
**A**:
- Use "🎲 Random Graph" for auto-spacing
- Or manually create nodes far apart
- Click elsewhere and drag isn't available (click to place)

### Q: How is step mode useful?
**A**:
- Pause after each node processing
- Check queue/stack after each step
- Understand algorithm details
- Identify when nodes are marked visited

---

## Keyboard Shortcuts

Currently, the visualization doesn't have keyboard shortcuts, but you can:

### Mouse Controls
- **Click Canvas**: Add node
- **Click Edge → Click 2 nodes**: Create edge
- **Hover Node**: Cursor changes to pointer

### Recommended Workflow
```
1. Create graph (click, click, click...)
2. Click "Add Edge"
3. Connect nodes (click, click, repeat)
4. Set speed if needed
5. Start BFS or DFS
6. Watch animation
7. Compare with expected order
8. Use "Clear Graph" for next attempt
```

---

## Common Use Cases & Examples

### Use Case 1: Social Network (BFS)
```
Goal: Find all friends within 2 hops

Graph:
  You → Friend1 → Friend1a
         Friend1b
       Friend2 → Friend2a

BFS from "You":
  1. Direct friends: Friend1, Friend2
  2. Their friends: Friend1a, Friend1b, Friend2a

Use: LinkedIn connections, friend recommendations
```

### Use Case 2: Maze Solving (BFS)
```
Goal: Find shortest path through maze

Graph:
  - Nodes: Open spaces
  - Edges: Passages between spaces
  - BFS: Guarantees shortest path

Why BFS? Finds minimum moves needed
```

### Use Case 3: Cycle Detection (DFS)
```
Goal: Check if graph has cycles

Graph:
  0 → 1 → 2 → 0 (has cycle!)

Algorithm:
  - Mark as visiting (gray)
  - If edge to gray node → cycle found!
  - Mark complete (black)

Use: Dependency detection, circular references
```

### Use Case 4: Topological Sort (DFS)
```
Goal: Order tasks based on dependencies

Graph:
  Task1 → Task2 → Task3
  Task1 → Task4

DFS:
  1. Explore Task1 completely
  2. Record in reverse finish order
  3. Gives valid task ordering

Use: Build systems, task scheduling
```

---

## Performance Notes

### Time Complexity
Both BFS and DFS:
- **Time**: O(V + E)
  - V = number of nodes
  - E = number of edges
- **Why**: Visit each node once, check each edge once

### Space Complexity
- **BFS**: O(V) for queue (worst case: queue holds all nodes)
- **DFS Recursive**: O(H) where H = max depth (call stack)
- **DFS Iterative**: O(V) for stack

### Practical Performance
For visualization:
- 5-10 nodes: Instant, easy to follow
- 10-15 nodes: Quick, manageable
- 15-20 nodes: Slightly slow, dense canvas
- 20+ nodes: Not recommended (crowding)

---

## Troubleshooting Guide

| Issue | Cause | Solution |
|-------|-------|----------|
| Server won't start | Port 8000 in use | Try different port in server.py |
| Page won't load | Wrong URL | Go to http://localhost:8000 |
| Nodes not appearing | Click too fast | Wait for response |
| Edges not creating | Missing "Add Edge" click | Click button before selecting nodes |
| Traversal not starting | Invalid start node | Check node number exists |
| Nodes overlapping | Random placement | Use "Random Graph" or space out clicks |
| Colors not changing | Traversal not running | Click BFS or DFS button |
| No queue/stack showing | No traversal active | Start BFS or DFS first |

---

## Tips for Educators

### Teaching BFS:
1. Create simple linear graph: 0→1→2→3
2. Show queue grows then shrinks
3. Highlight level-by-level processing
4. Compare with DFS for contrast

### Teaching DFS:
1. Create branching tree structure
2. Show stack operations
3. Highlight backtracking behavior
4. Show how it explores one path completely

### Teaching Complexity:
1. Count operations in step mode
2. Show O(V+E) with example graphs
3. Demonstrate worst-case vs average
4. Compare with other algorithms

### Teaching Data Structures:
1. Queue: Show FIFO behavior
2. Stack: Show LIFO behavior
3. Visited array: Prevent infinite loops
4. Adjacency matrix: Graph representation

---

## Technical Details

### Canvas Size
- Auto-resizes with window
- Maintains aspect ratio
- Responsive to different screen sizes

### Node Drawing
- Radius: 25 pixels
- ID text: Bold 14px Arial
- Outline: 2px (3px when current/visited)

### Edge Drawing
- Line width: 2 pixels
- Arrow size: 12 pixels
- Color: Gray (#999999)

### Animation
- Uses requestAnimationFrame for smooth rendering
- Speed controlled by setTimeout delays
- 60 FPS rendering on modern browsers

---

**Last Updated**: 2026
**Version**: 1.0
**Status**: Fully Functional
