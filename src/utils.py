from typing import List
from src.node import Node


def show(graph: List[Node]) -> None:
    for n in graph:
        print(n)


def build_graph(graph_dict: dict[str, List[str]]) -> List[Node]:
    nodes = [Node(label=n) for n in graph_dict.keys()]
    for n in nodes:
        for key, value in graph_dict.items():
            if n.label == key:
                n.append_children(list(filter(lambda x: x.label in value, nodes)))
    return nodes


def get_node(graph: List[Node], label: str) -> Node:
    return list(filter(lambda x: x.label == label, graph))[0]
