#ifndef TRAVERSAL_H
#define TRAVERSAL_H

#include "graph.h"

// Function prototypes for graph traversal algorithms
void depth_first_search(Graph* graph, int start_vertex);
void breadth_first_search(Graph* graph, int start_vertex);
void visualize_traversal(Graph* graph, int* traversal_order, int order_length);

#endif // TRAVERSAL_H