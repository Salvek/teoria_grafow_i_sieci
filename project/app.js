/**
 * Advanced Sigma.js Graph Template
 * This template demonstrates comprehensive graph creation and manipulation
 */

import Graph from "graphology";
import Sigma from "sigma";
import { circular, random } from "graphology-layout";
import forceAtlas2 from "graphology-layout-forceatlas2";

// ============================================
// Configuration
// ============================================
const config = {
  container: "graph-container",
  settings: {
    defaultNodeColor: "#3388ff",
    defaultEdgeColor: "#cccccc",
    labelColor: { color: "#000000" },
    labelSize: 12,
    labelWeight: "bold",
    labelRenderedSizeThreshold: 8,
    edgeLabelSize: 10,
    edgeLabelWeight: "normal",
    renderEdgeLabels: true,
    enableEdgeEvents: true,
    defaultNodeType: "circle",
    defaultEdgeType: "arrow",
    minCameraRatio: 0.1,
    maxCameraRatio: 10,
  },
};

// ============================================
// Global State
// ============================================
let graph;
let renderer;
let draggedNode = null;
let isDragging = false;

// ============================================
// Initialize Graph
// ============================================
function initializeGraph() {
  // Create a new graph instance
  graph = new Graph();

  // Get container element
  const container = document.getElementById(config.container);
  if (!container) {
    console.error(`Container #${config.container} not found`);
    return;
  }

  return graph;
}

// ============================================
// Sample Data Generation
// ============================================
function generateSampleGraph() {
  // Add nodes with various attributes
  const nodeCount = 20;
  const categories = ["A", "B", "C", "D"];
  const colors = {
    A: "#ff6b6b",
    B: "#4ecdc4",
    C: "#45b7d1",
    D: "#96ceb4",
  };

  // Create nodes
  for (let i = 0; i < nodeCount; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    graph.addNode(`node-${i}`, {
      label: `Node ${i}`,
      size: Math.random() * 10 + 5,
      color: colors[category],
      category: category,
      x: Math.random(),
      y: Math.random(),
    });
  }

  // Create edges with weights
  for (let i = 0; i < nodeCount - 1; i++) {
    const connections = Math.floor(Math.random() * 3) + 1;
    for (let j = 0; j < connections; j++) {
      const target = Math.floor(Math.random() * nodeCount);
      if (target !== i && !graph.hasEdge(`node-${i}`, `node-${target}`)) {
        const weight = Math.random();
        graph.addEdge(`node-${i}`, `node-${target}`, {
          label: `${weight.toFixed(2)}`,
          weight: weight,
          size: weight * 3,
          color: `rgba(200, 200, 200, ${weight})`,
        });
      }
    }
  }
}

// ============================================
// Layout Algorithms
// ============================================
function applyCircularLayout() {
  circular.assign(graph);
  renderer.refresh();
}

function applyRandomLayout() {
  random.assign(graph);
  renderer.refresh();
}

function applyForceAtlas2Layout(iterations = 500) {
  const settings = {
    iterations: iterations,
    settings: {
      gravity: 1,
      barnesHutOptimize: true,
      strongGravityMode: false,
      scalingRatio: 10,
    },
  };
  forceAtlas2.assign(graph, settings);
  renderer.refresh();
}

// ============================================
// Graph Manipulation Functions
// ============================================
function addNode(id, attributes = {}) {
  if (!graph.hasNode(id)) {
    graph.addNode(id, {
      label: id,
      size: 10,
      color: config.settings.defaultNodeColor,
      x: Math.random(),
      y: Math.random(),
      ...attributes,
    });
    renderer.refresh();
  }
}

function removeNode(id) {
  if (graph.hasNode(id)) {
    graph.dropNode(id);
    renderer.refresh();
  }
}

function addEdge(source, target, attributes = {}) {
  if (graph.hasNode(source) && graph.hasNode(target)) {
    try {
      graph.addEdge(source, target, {
        color: config.settings.defaultEdgeColor,
        size: 2,
        ...attributes,
      });
      renderer.refresh();
    } catch (e) {
      console.warn(`Edge already exists: ${source} -> ${target}`);
    }
  }
}

function removeEdge(source, target) {
  if (graph.hasEdge(source, target)) {
    graph.dropEdge(source, target);
    renderer.refresh();
  }
}

// ============================================
// Graph Analysis Functions
// ============================================
function getNodeDegree(nodeId) {
  return graph.degree(nodeId);
}

function getNeighbors(nodeId) {
  return graph.neighbors(nodeId);
}

function highlightNode(nodeId, color = "#ff0000") {
  if (graph.hasNode(nodeId)) {
    const originalColor = graph.getNodeAttribute(nodeId, "color");
    graph.setNodeAttribute(nodeId, "color", color);
    graph.setNodeAttribute(nodeId, "highlighted", true);
    graph.setNodeAttribute(nodeId, "originalColor", originalColor);
    renderer.refresh();
  }
}

function unhighlightNode(nodeId) {
  if (graph.hasNode(nodeId) && graph.getNodeAttribute(nodeId, "highlighted")) {
    const originalColor = graph.getNodeAttribute(nodeId, "originalColor");
    graph.setNodeAttribute(nodeId, "color", originalColor);
    graph.setNodeAttribute(nodeId, "highlighted", false);
    renderer.refresh();
  }
}

function highlightPath(path, color = "#ff6b6b") {
  path.forEach((nodeId) => highlightNode(nodeId, color));
}

function clearHighlights() {
  graph.forEachNode((node) => {
    if (graph.getNodeAttribute(node, "highlighted")) {
      unhighlightNode(node);
    }
  });
}

// ============================================
// Search and Filter Functions
// ============================================
function searchNodes(query) {
  const results = [];
  graph.forEachNode((node, attributes) => {
    if (attributes.label.toLowerCase().includes(query.toLowerCase())) {
      results.push({ node, attributes });
    }
  });
  return results;
}

function filterNodesByAttribute(attribute, value) {
  const results = [];
  graph.forEachNode((node, attributes) => {
    if (attributes[attribute] === value) {
      results.push({ node, attributes });
    }
  });
  return results;
}

function hideNode(nodeId) {
  if (graph.hasNode(nodeId)) {
    graph.setNodeAttribute(nodeId, "hidden", true);
    renderer.refresh();
  }
}

function showNode(nodeId) {
  if (graph.hasNode(nodeId)) {
    graph.setNodeAttribute(nodeId, "hidden", false);
    renderer.refresh();
  }
}

// ============================================
// Event Handlers
// ============================================
function setupEventHandlers() {
  // Node click event
  renderer.on("clickNode", ({ node }) => {
    console.log("Clicked node:", node);
    const neighbors = getNeighbors(node);
    console.log("Neighbors:", neighbors);

    // Highlight clicked node and its neighbors
    clearHighlights();
    highlightNode(node, "#ff0000");
    neighbors.forEach((neighbor) => highlightNode(neighbor, "#ffa500"));
  });

  // Edge click event
  renderer.on("clickEdge", ({ edge }) => {
    console.log("Clicked edge:", edge);
    const edgeData = graph.getEdgeAttributes(edge);
    console.log("Edge attributes:", edgeData);
  });

  // Stage click event (clicking on empty space)
  renderer.on("clickStage", () => {
    console.log("Clicked on stage");
    clearHighlights();
  });

  // Node hover events
  renderer.on("enterNode", () => {
    document.body.style.cursor = "pointer";
  });

  renderer.on("leaveNode", () => {
    document.body.style.cursor = "default";
  });

  // Drag and drop functionality
  renderer.on("downNode", (e) => {
    isDragging = true;
    draggedNode = e.node;
    graph.setNodeAttribute(draggedNode, "highlighted", true);
  });

  renderer.getMouseCaptor().on("mousemovebody", (e) => {
    if (!isDragging || !draggedNode) return;

    // Get new position of node
    const pos = renderer.viewportToGraph(e);
    graph.setNodeAttribute(draggedNode, "x", pos.x);
    graph.setNodeAttribute(draggedNode, "y", pos.y);

    // Prevent sigma from moving the camera
    e.preventSigmaDefault();
    e.original.preventDefault();
    e.original.stopPropagation();
  });

  renderer.getMouseCaptor().on("mouseup", () => {
    if (draggedNode) {
      graph.removeNodeAttribute(draggedNode, "highlighted");
    }
    isDragging = false;
    draggedNode = null;
  });

  // Disable the autoscale at the first down interaction
  renderer.getMouseCaptor().on("mousedown", () => {
    if (!renderer.getCustomBBox()) renderer.setCustomBBox(renderer.getBBox());
  });
}

// ============================================
// Export/Import Functions
// ============================================
function exportGraphData() {
  return {
    nodes: graph.nodes().map((node) => ({
      id: node,
      ...graph.getNodeAttributes(node),
    })),
    edges: graph.edges().map((edge) => ({
      id: edge,
      source: graph.source(edge),
      target: graph.target(edge),
      ...graph.getEdgeAttributes(edge),
    })),
  };
}

function importGraphData(data) {
  graph.clear();

  // Import nodes
  data.nodes.forEach((node) => {
    const { id, ...attributes } = node;
    graph.addNode(id, attributes);
  });

  // Import edges
  data.edges.forEach((edge) => {
    const { id, source, target, ...attributes } = edge;
    graph.addEdge(source, target, attributes);
  });

  renderer.refresh();
}

function exportToJSON() {
  const data = exportGraphData();
  return JSON.stringify(data, null, 2);
}

function importFromJSON(jsonString) {
  try {
    const data = JSON.parse(jsonString);
    importGraphData(data);
  } catch (e) {
    console.error("Error parsing JSON:", e);
  }
}

// ============================================
// Statistics and Analytics
// ============================================
function getGraphStats() {
  return {
    nodeCount: graph.order,
    edgeCount: graph.size,
    density: (2 * graph.size) / (graph.order * (graph.order - 1)),
    averageDegree: (2 * graph.size) / graph.order,
  };
}

function getNodeStats(nodeId) {
  if (!graph.hasNode(nodeId)) return null;

  return {
    degree: graph.degree(nodeId),
    inDegree: graph.inDegree(nodeId),
    outDegree: graph.outDegree(nodeId),
    neighbors: graph.neighbors(nodeId),
  };
}

// ============================================
// Initialization and Rendering
// ============================================
function initialize() {
  // Initialize graph
  initializeGraph();

  // Generate sample data
  generateSampleGraph();

  // Create renderer FIRST (before applying layouts that need it)
  const container = document.getElementById(config.container);
  renderer = new Sigma(graph, container, config.settings);

  // Apply layout AFTER renderer is created
  applyForceAtlas2Layout();

  // Setup event handlers
  setupEventHandlers();

  // Log initial stats
  console.log("Graph initialized with stats:", getGraphStats());

  return { graph, renderer };
}

// ============================================
// Public API
// ============================================
const GraphAPI = {
  // Core
  initialize,
  graph: () => graph,
  renderer: () => renderer,

  // Manipulation
  addNode,
  removeNode,
  addEdge,
  removeEdge,

  // Layout
  applyCircularLayout,
  applyRandomLayout,
  applyForceAtlas2Layout,

  // Analysis
  getNodeDegree,
  getNeighbors,
  highlightNode,
  unhighlightNode,
  highlightPath,
  clearHighlights,

  // Search
  searchNodes,
  filterNodesByAttribute,
  hideNode,
  showNode,

  // Export/Import
  exportGraphData,
  importGraphData,
  exportToJSON,
  importFromJSON,

  // Statistics
  getGraphStats,
  getNodeStats,
};

// ============================================
// Auto-initialize if DOM is ready
// ============================================
if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    // DOM already loaded, but wait for container to be available
    setTimeout(initialize, 100);
  }
}

// Export for module usage
export default GraphAPI;

