// ==================== Canvas Setup ====================
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');

// Adjust canvas resolution
function resizeCanvas() {
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// ==================== Graph Data Structure ====================
class Node {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = 25;
        this.visited = false;
        this.isCurrentNode = false;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        
        if (this.isCurrentNode) {
            ctx.fillStyle = '#4299e1';
            ctx.strokeStyle = '#2c5aa0';
            ctx.lineWidth = 3;
        } else if (this.visited) {
            ctx.fillStyle = '#48bb78';
            ctx.strokeStyle = '#2f855a';
            ctx.lineWidth = 3;
        } else {
            ctx.fillStyle = '#ffffff';
            ctx.strokeStyle = '#333333';
            ctx.lineWidth = 2;
        }
        
        ctx.fill();
        ctx.stroke();

        // Draw node ID
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.id, this.x, this.y);
    }

    contains(x, y) {
        const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
        return distance <= this.radius;
    }
}

class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.nodeIdCounter = 0;
    }

    addNode(x, y) {
        const node = new Node(this.nodeIdCounter++, x, y);
        this.nodes.push(node);
        return node;
    }

    addEdge(fromId, toId) {
        if (fromId === toId) return false; // No self-loops
        if (this.edgeExists(fromId, toId)) return false; // No duplicate edges
        
        this.edges.push({ from: fromId, to: toId });
        return true;
    }

    edgeExists(fromId, toId) {
        return this.edges.some(e => (e.from === fromId && e.to === toId) || (e.from === toId && e.to === fromId));
    }

    getNodeById(id) {
        return this.nodes.find(n => n.id === id);
    }

    getNeighbors(nodeId) {
        const neighbors = [];
        for (const edge of this.edges) {
            if (edge.from === nodeId) {
                neighbors.push(edge.to);
            } else if (edge.to === nodeId) {
                neighbors.push(edge.from);
            }
        }
        return neighbors;
    }

    clear() {
        this.nodes = [];
        this.edges = [];
        this.nodeIdCounter = 0;
    }

    reset() {
        this.nodes.forEach(node => {
            node.visited = false;
            node.isCurrentNode = false;
        });
    }
}

// ==================== Global State ====================
const graph = new Graph();
let addingEdgeMode = false;
let selectedNode1 = null;
let isTraversing = false;
let isStepMode = false;
let isPaused = false;
let currentAlgorithm = 'bfs';
let traversalSpeed = 800;

// ==================== Event Listeners ====================
document.getElementById('speedSlider').addEventListener('input', (e) => {
    traversalSpeed = parseInt(e.target.value);
    document.getElementById('speedValue').textContent = traversalSpeed + 'ms';
});

canvas.addEventListener('click', onCanvasClick);
canvas.addEventListener('mousemove', onCanvasHover);

function onCanvasClick(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isTraversing) {
        if (isStepMode && !isPaused) {
            nextStep();
        }
        return;
    }

    if (addingEdgeMode) {
        const clickedNode = graph.nodes.find(n => n.contains(x, y));
        if (clickedNode) {
            if (selectedNode1 === null) {
                selectedNode1 = clickedNode;
            } else if (selectedNode1.id !== clickedNode.id) {
                if (graph.addEdge(selectedNode1.id, clickedNode.id)) {
                    showInfo('Edge added: ' + selectedNode1.id + ' → ' + clickedNode.id);
                } else {
                    showWarning('Edge already exists or invalid connection');
                }
                selectedNode1 = null;
                addingEdgeMode = false;
            }
        }
    } else {
        // Add new node
        const clickedNode = graph.nodes.find(n => n.contains(x, y));
        if (!clickedNode) {
            graph.addNode(x, y);
            showInfo('Node ' + (graph.nodeIdCounter - 1) + ' added');
        }
    }

    updateUI();
}

function onCanvasHover(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    canvas.style.cursor = 'crosshair';

    // Check if hovering over a node
    for (let node of graph.nodes) {
        if (node.contains(x, y)) {
            canvas.style.cursor = 'pointer';
            break;
        }
    }
}

// ==================== UI Functions ====================
function startAddingEdge() {
    if (graph.nodes.length < 2) {
        showWarning('Need at least 2 nodes to add edges');
        return;
    }
    addingEdgeMode = !addingEdgeMode;
    selectedNode1 = null;
    if (addingEdgeMode) {
        showInfo('Select two nodes to create an edge');
    }
}

function clearGraph() {
    if (confirm('Are you sure you want to clear the graph?')) {
        graph.clear();
        updateUI();
        showInfo('Graph cleared');
    }
}

function generateRandomGraph() {
    graph.clear();
    
    // Add 5-7 random nodes
    const nodeCount = 5 + Math.floor(Math.random() * 3);
    const positions = [];
    
    for (let i = 0; i < nodeCount; i++) {
        let x, y, overlapping;
        
        do {
            overlapping = false;
            x = 60 + Math.random() * (canvas.width - 120);
            y = 60 + Math.random() * (canvas.height - 120);
            
            for (let pos of positions) {
                const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
                if (distance < 80) {
                    overlapping = true;
                    break;
                }
            }
        } while (overlapping);
        
        positions.push({ x, y });
        graph.addNode(x, y);
    }

    // Add random edges
    const edgeCount = nodeCount + Math.floor(Math.random() * nodeCount);
    for (let i = 0; i < edgeCount; i++) {
        const from = Math.floor(Math.random() * nodeCount);
        const to = Math.floor(Math.random() * nodeCount);
        graph.addEdge(from, to);
    }

    updateUI();
    showInfo('Random graph generated');
}

function startBFS() {
    if (graph.nodes.length === 0) {
        showWarning('Graph is empty');
        return;
    }
    
    const startNode = parseInt(document.getElementById('startNode').value);
    if (isNaN(startNode) || startNode < 0 || startNode >= graph.nodeIdCounter) {
        showWarning('Invalid start node');
        return;
    }

    graph.reset();
    isTraversing = true;
    isPaused = isStepMode;
    currentAlgorithm = 'bfs';
    document.getElementById('containerTitle').textContent = '📦 Queue';
    performBFS(startNode);
}

function startDFS() {
    if (graph.nodes.length === 0) {
        showWarning('Graph is empty');
        return;
    }
    
    const startNode = parseInt(document.getElementById('startNode2').value);
    if (isNaN(startNode) || startNode < 0 || startNode >= graph.nodeIdCounter) {
        showWarning('Invalid start node');
        return;
    }

    graph.reset();
    isTraversing = true;
    isPaused = isStepMode;
    currentAlgorithm = 'dfs';
    document.getElementById('containerTitle').textContent = '📚 Stack';
    performDFS(startNode);
}

function performBFS(startNodeId) {
    const visited = new Set();
    const queue = [startNodeId];
    const traversalOrder = [];
    let stepIndex = 0;

    visited.add(startNodeId);

    const bfsStep = async () => {
        if (stepIndex >= queue.length) {
            // Traversal complete
            isTraversing = false;
            showInfo('BFS completed! Order: ' + traversalOrder.join(' → '));
            return;
        }

        const currentNodeId = queue[stepIndex];
        const currentNode = graph.getNodeById(currentNodeId);
        currentNode.isCurrentNode = true;

        // Process current node
        traversalOrder.push(currentNodeId);
        currentNode.visited = true;

        // Get neighbors
        const neighbors = graph.getNeighbors(currentNodeId);
        
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                queue.push(neighborId);
            }
        }

        updateUI(queue.slice(stepIndex));
        updateTraversalOrder(traversalOrder);

        currentNode.isCurrentNode = false;
        stepIndex++;

        if (isPaused) {
            window.nextStepCallback = bfsStep;
        } else {
            setTimeout(bfsStep, traversalSpeed);
        }
    };

    bfsStep();
}

function performDFS(startNodeId) {
    const visited = new Set();
    const stack = [startNodeId];
    const traversalOrder = [];
    let stepIndex = 0;

    visited.add(startNodeId);

    const dfsStep = async () => {
        if (stepIndex >= stack.length) {
            // Traversal complete
            isTraversing = false;
            showInfo('DFS completed! Order: ' + traversalOrder.join(' → '));
            return;
        }

        const currentNodeId = stack[stepIndex];
        const currentNode = graph.getNodeById(currentNodeId);
        currentNode.isCurrentNode = true;

        // Process current node
        traversalOrder.push(currentNodeId);
        currentNode.visited = true;

        // Get neighbors (in reverse for DFS stack behavior)
        const neighbors = graph.getNeighbors(currentNodeId).reverse();
        
        for (const neighborId of neighbors) {
            if (!visited.has(neighborId)) {
                visited.add(neighborId);
                stack.push(neighborId);
            }
        }

        updateUI(stack.slice(stepIndex));
        updateTraversalOrder(traversalOrder);

        currentNode.isCurrentNode = false;
        stepIndex++;

        if (isPaused) {
            window.nextStepCallback = dfsStep;
        } else {
            setTimeout(dfsStep, traversalSpeed);
        }
    };

    dfsStep();
}

function toggleStepMode() {
    isStepMode = !isStepMode;
    if (isTraversing) {
        isPaused = isStepMode;
    }
    showInfo('Step mode: ' + (isStepMode ? 'ON' : 'OFF'));
}

function nextStep() {
    if (isTraversing && isPaused && window.nextStepCallback) {
        window.nextStepCallback();
    }
}

function stopTraversal() {
    if (isTraversing) {
        isTraversing = false;
        isPaused = false;
        graph.reset();
        updateUI();
        document.getElementById('queueStack').innerHTML = '';
        showInfo('Traversal stopped');
    }
}

function switchAlgorithm(algo) {
    currentAlgorithm = algo;
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    document.querySelectorAll('.code-block').forEach(block => block.classList.remove('active'));
    document.querySelector('.code-block.' + algo).classList.add('active');
}

// ==================== Rendering ====================
function draw() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    ctx.strokeStyle = '#999999';
    ctx.lineWidth = 2;
    for (const edge of graph.edges) {
        const fromNode = graph.getNodeById(edge.from);
        const toNode = graph.getNodeById(edge.to);
        
        // Draw line with slight curve
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Draw arrowhead
        const angle = Math.atan2(toNode.y - fromNode.y, toNode.x - fromNode.x);
        const arrowSize = 12;
        
        ctx.fillStyle = '#999999';
        ctx.beginPath();
        ctx.moveTo(toNode.x, toNode.y);
        ctx.lineTo(toNode.x - arrowSize * Math.cos(angle - Math.PI / 6), 
                   toNode.y - arrowSize * Math.sin(angle - Math.PI / 6));
        ctx.lineTo(toNode.x - arrowSize * Math.cos(angle + Math.PI / 6), 
                   toNode.y - arrowSize * Math.sin(angle + Math.PI / 6));
        ctx.closePath();
        ctx.fill();
    }

    // Draw selected edge being created
    if (addingEdgeMode && selectedNode1) {
        ctx.strokeStyle = '#4299e1';
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(selectedNode1.x, selectedNode1.y);
        const mouseEvent = new MouseEvent('mousemove');
        ctx.lineTo(selectedNode1.x, selectedNode1.y);
        ctx.stroke();
        ctx.setLineDash([]);
    }

    // Draw nodes
    for (const node of graph.nodes) {
        node.draw(ctx);
    }

    requestAnimationFrame(draw);
}

function updateUI(queueStack = []) {
    document.getElementById('nodeCount').textContent = graph.nodes.length;
    document.getElementById('edgeCount').textContent = graph.edges.length;
    
    // Update queue/stack display
    const container = document.getElementById('queueStack');
    container.innerHTML = '';
    
    queueStack.forEach((nodeId, index) => {
        const div = document.createElement('div');
        div.className = 'queue-item' + (index === 0 ? ' active' : '');
        div.textContent = 'Node ' + nodeId;
        container.appendChild(div);
    });

    draw();
}

function updateTraversalOrder(order) {
    const container = document.getElementById('traversalOrder');
    container.innerHTML = order.map(id => 
        '<span class="traversal-item visited">Node ' + id + '</span>'
    ).join('');
}

function showInfo(message) {
    // You could replace this with a toast notification
    console.log('ℹ️ Info:', message);
}

function showWarning(message) {
    console.warn('⚠️ Warning:', message);
    alert(message);
}

// ==================== Initialization ====================
updateUI();
draw();
