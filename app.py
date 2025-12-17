import time
from uuid import UUID
from typing import List, Tuple
from src.node import Node
from src.utils import get_node, build_graph


def bfs(
    graph: List[Node], start_label: str, target_label: str
) -> Tuple[UUID, int, float] | None:
    start = time.time()
    queue = []
    vis_nodes_num = 0
    s = get_node(graph, start_label)
    queue.append(s)
    while len(queue) > 0:
        n = queue[0]
        queue = queue[1:]
        n.status = Node.VISITED_NODE_STATUS
        vis_nodes_num += 1
        if n.label == target_label:
            end = time.time()
            return n.id, vis_nodes_num, end - start
        for c in n.children:
            if c.status != Node.VISITED_NODE_STATUS and c.label not in map(
                lambda x: x.label, queue
            ):
                queue.append(c)


def dfs(
    graph: List[Node], start_label: str, target_label: str
) -> Tuple[UUID, int, float] | None:
    start = time.time()
    stack = []
    vis_nodes_num = 0
    s = get_node(graph, start_label)
    stack.append(s)
    while len(stack) > 0:
        n = stack.pop()
        n.status = Node.VISITED_NODE_STATUS
        vis_nodes_num += 1
        if n.label == target_label:
            end = time.time()
            return n.id, vis_nodes_num, end - start
        for c in n.children:
            if c.status != Node.VISITED_NODE_STATUS and c.label not in map(
                lambda x: x.label, stack
            ):
                stack.append(c)


if __name__ == "__main__":
    graph_dict = {
        "A": ("B", "C"),
        "B": ("A", "D"),
        "C": ("A", "D"),
        "D": ("B", "C", "E"),
        "E": ("D"),
    }

    bfs_res = bfs(build_graph(graph_dict), "A", "E")
    dfs_res = dfs(build_graph(graph_dict), "A", "E")
