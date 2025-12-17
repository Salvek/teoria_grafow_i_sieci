from uuid import uuid1
from typing import List


class Node:
    VISITED_NODE_STATUS = "vis_node"
    DEFAULT_NODE_STATUS = "unv_node"
    DEFAULT_NODE_LABEL = "Node"

    def __init__(
        self,
        status: str = DEFAULT_NODE_STATUS,
        children: list["Node"] | None = None,
        label: str = DEFAULT_NODE_LABEL,
    ):
        self.id = uuid1()
        self.label = label
        self.status = status
        self.children = [] if children is None else children

    def append_child(self, child: "Node") -> None:
        """
        Method for adding node to children list.

        Parameters:
           child (Node): node to be appended
        """
        self.children.append(child)

    def append_children(self, children: List["Node"]) -> None:
        """
        Method for adding list of nodes to children list.

        Parameters:
           children (List[Node]): nodes to be appended
        """
        self.children = self.children + [
            c for c in children if c.id not in map(lambda x: x.id, self.children)
        ]

    def __str__(self) -> str:
        output = []
        output.append(f"\nID: {self.id}")
        output.append(f"\nLabel: {self.label}")
        output.append(f"\nStatus: {self.status}")
        output.append(f"\nChildren count: {len(self.children)}")
        return "".join(output)
