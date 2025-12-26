CC = gcc
CFLAGS = -Iinclude -Wall -Wextra -g
SRC = src/main.c src/graph.c src/traversal.c
OBJ = $(SRC:.c=.o)
EXEC = graph_traversal_visualizer

all: $(EXEC)

$(EXEC): $(OBJ)
	$(CC) -o $@ $^

%.o: %.c
	$(CC) $(CFLAGS) -c $< -o $@

clean:
	rm -f $(OBJ) $(EXEC)

run: $(EXEC)
	./$(EXEC)

.PHONY: all clean run