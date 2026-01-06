# 🔍 Graph Traversal Visualization - BFS & DFS

An interactive web-based visualization tool for understanding graph traversal algorithms (Breadth-First Search and Depth-First Search) with step-by-step animation and C language code examples.

## 📋 Features

### Interactive Graph Creation
- **Click to Add Nodes**: Simply click anywhere on the canvas to place nodes
- **Add Edges**: Click "Add Edge" button, then select two nodes to create a connection
- **Random Graph Generator**: Auto-generate random graphs for testing
- **Clear Graph**: Remove all nodes and edges with one click

### Visualization Features
- **Node Status Indicators**:
  - **White**: Unvisited nodes
  - **Blue**: Current node being processed
  - **Green**: Visited/processed nodes
- **Directional Edges**: Arrows showing the direction of connections
- **Real-time Updates**: Dynamic queue/stack display showing the order of node processing

### Traversal Algorithms
- **BFS (Breadth-First Search)**:
  - Explores nodes level by level
  - Uses Queue data structure (FIFO)
  - Shows all neighbors before going deeper
  
- **DFS (Depth-First Search)**:
  - Explores as far as possible along each branch
  - Uses Stack data structure (LIFO)
  - Backtracks when reaching a dead end

### Animation Control
- **Speed Control**: Adjust traversal speed (100ms - 2000ms)
- **Step Mode**: Manually step through the algorithm
- **Next Step**: Execute one step at a time
- **Stop**: Pause and reset current traversal

### Educational Content
- **C Code Examples**: Full implementation of BFS and DFS in C
- **Algorithm Explanation**: Shows queue/stack operations
- **Traversal Order**: Displays the final order of visited nodes

## 🚀 How to Use

### 1. Building Your Graph

```
Step 1: Click on the canvas to add nodes
        (Each click creates a new node)

Step 2: Click "Add Edge" button
        
Step 3: Click on two nodes to create an edge
        (You can add multiple edges by clicking "Add Edge" again)

Step 4: Repeat until your graph is complete
```

### 2. Running BFS Traversal

```
1. Enter the starting node number (0-based indexing)
2. Click the "🟦 BFS" button
3. Watch as nodes are visited in breadth-first order
4. The queue shows the next nodes to be processed
5. Traversal order is displayed on the right sidebar
```

**Key Point**: BFS guarantees the shortest path in unweighted graphs!

### 3. Running DFS Traversal

```
1. Enter the starting node number (0-based indexing)
2. Click the "🟥 DFS" button
3. Watch as nodes are visited in depth-first order
4. The stack shows the next nodes to be processed
5. Traversal order is displayed on the right sidebar
```

**Key Point**: DFS uses less memory and explores deeper before backtracking!

### 4. Step-by-Step Mode

```
1. Click "⏸️ Toggle Step Mode" to enable stepping
2. Start BFS or DFS traversal
3. Click "⏭️ Next Step" to process one node at a time
4. Perfect for understanding each step of the algorithm
```

### 5. Speed Control

Use the speed slider to control animation speed:
- **100ms**: Very fast, hard to follow
- **800ms**: Default, easy to follow
- **2000ms**: Very slow, great for learning

## 📊 Understanding the Visualization

### Node Colors
| Color | State | Meaning |
|-------|-------|---------|
| White | Unvisited | Node not yet processed |
| Blue | Current | Currently being processed |
| Green | Visited | Already processed |

### Queue vs Stack

**BFS Uses Queue (FIFO)**:
```
Order: 0, 1, 2, 3, 4, 5

Process node at front
Add new neighbors at back
```

**DFS Uses Stack (LIFO)**:
```
Order: 0, 4, 5, 3, 2, 1

Process node at top
Add new neighbors at top
```

## 💻 C Code Reference

### BFS Implementation

The visualization shows complete C code for BFS:

```c
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
        printf("%d ", node);

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

**Key Components**:
1. **Visited Array**: Tracks which nodes have been processed
2. **Queue**: FIFO structure for managing nodes to visit
3. **Adjacency Matrix**: `adj[i][j] = 1` means edge from i to j
4. **Main Loop**: Process nodes while queue is not empty

### DFS Implementation

The visualization shows both recursive and iterative DFS:

```c
void DFS(int adj[MAX_NODES][MAX_NODES], int node, bool visited[MAX_NODES], int numNodes) {
    visited[node] = true;
    printf("%d ", node);

    for (int i = 0; i < numNodes; i++) {
        if (adj[node][i] == 1 && !visited[i]) {
            DFS(adj, i, visited, numNodes);
        }
    }
}
```

**Recursive DFS**:
- Uses call stack automatically
- Elegant but limited by stack size
- Easier to understand

**Iterative DFS** (with explicit stack):
- Uses user-defined stack
- No recursion limit
- Slightly more complex

## 🎯 Time & Space Complexity

### BFS
- **Time Complexity**: O(V + E)
  - V = number of vertices (nodes)
  - E = number of edges
- **Space Complexity**: O(V)
  - Queue stores up to V nodes

### DFS
- **Time Complexity**: O(V + E)
  - Same as BFS
- **Space Complexity**: O(V)
  - Stack stores up to V nodes (or recursion depth)

## 📚 Common Use Cases

### BFS Best For:
- ✅ Finding shortest path in unweighted graphs
- ✅ Level-order traversal
- ✅ Social network analysis
- ✅ Puzzle solving (8-puzzle, Rubik's cube)

### DFS Best For:
- ✅ Detecting cycles
- ✅ Topological sorting
- ✅ Checking connectivity
- ✅ Maze solving
- ✅ Tree traversal

## 🔧 Technical Details

### Graph Representation
The visualization uses an **adjacency list** approach internally but implements:
- Node objects with position (x, y) for drawing
- Edge array storing node pairs
- Direct neighbor lookup

### Adjacency Matrix (C Code)
The C code examples use **adjacency matrix**:
```
adj[i][j] = 1  // edge from i to j exists
adj[i][j] = 0  // no edge
```

### Data Structures Used

**Queue (BFS)**:
```c
typedef struct {
    int items[MAX_QUEUE];
    int front, rear;
} Queue;
```

**Stack (DFS)**:
```c
typedef struct {
    int items[MAX_NODES];
    int top;
} Stack;
```

## 🎓 Learning Path

### Beginner
1. Create a simple graph (5-6 nodes)
2. Run BFS from node 0
3. Observe how nodes are visited layer by layer
4. Run DFS from node 0
5. Compare the two traversal orders

### Intermediate
1. Create a disconnected graph (multiple components)
2. Notice how only reachable nodes are visited
3. Try starting from different nodes
4. Understand queue vs stack behavior

### Advanced
1. Create complex graphs (10+ nodes)
2. Analyze time complexity
3. Trace through the C code
4. Implement your own algorithms

## 🐛 Tips & Tricks

### Debugging Traversals
- Use step mode to see each operation
- Watch the queue/stack display
- Note which nodes have which colors
- Compare with expected traversal order

### Creating Good Test Cases
- **Linear Graph**: 0 → 1 → 2 → 3 → 4
- **Tree Structure**: Hierarchical connections
- **Cyclic Graph**: Create cycles to see how algorithm handles them
- **Disconnected Graph**: Test unreachable nodes

### Common Mistakes to Avoid
1. **Visited Array**: Must mark nodes as visited when adding to queue/stack
2. **Starting Node**: Don't forget to enqueue/push starting node
3. **Self-Loops**: Usually not allowed in basic graphs
4. **Duplicate Edges**: Check before adding edges

## 📖 References

- Graph Theory Basics
- Algorithm Design Manual by Steven S. Skiena
- Introduction to Algorithms (CLRS)
- VisuAlgo - Algorithm Visualization (https://visualgo.net)

## 🎨 Visual Design

- Modern dark gradient header
- Responsive canvas rendering
- Real-time animation
- Color-coded node states
- Intuitive control layout

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Works best in modern browsers with HTML5 Canvas support.

---

**Created**: Interactive Graph Traversal Educational Tool
**Purpose**: Learn BFS and DFS algorithms with visual feedback
**Language**: HTML5, JavaScript, with C code examples
