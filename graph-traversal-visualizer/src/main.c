#include <stdio.h>
#include "graph.h"
#include "traversal.h"

int main() {
    Graph graph;
    initializeGraph(&graph, MAX_VERTICES);

    // Example of adding vertices and edges
    addVertex(&graph, 0);
    addVertex(&graph, 1);
    addEdge(&graph, 0, 1);
    addEdge(&graph, 1, 2);
    addEdge(&graph, 0, 2);

    printf("Graph created:\n");
    displayGraph(&graph);

    printf("\nDepth-First Search starting from vertex 0:\n");
    depthFirstSearch(&graph, 0);

    printf("\nBreadth-First Search starting from vertex 0:\n");
    breadthFirstSearch(&graph, 0);

    return 0;
}