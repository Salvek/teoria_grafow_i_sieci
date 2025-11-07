# Advanced Sigma.js Graph Template

A comprehensive template for creating and manipulating advanced graphs using Sigma.js and Graphology.

## Features

### 🎨 Visualization
- Multiple layout algorithms (Force Atlas 2, Circular, Random)
- Interactive drag-and-drop nodes
- Node and edge highlighting
- Customizable colors, sizes, and labels
- Smooth animations and transitions

### 🔧 Graph Manipulation
- Add/remove nodes dynamically
- Add/remove edges with custom attributes
- Node categorization and styling
- Real-time graph updates

### 🔍 Analysis & Search
- Search nodes by label
- Filter by attributes
- Highlight neighbors on click
- Get node degree and statistics
- Calculate graph density and metrics

### 📊 Event Handling
- Click events for nodes and edges
- Hover effects with cursor changes
- Drag and drop functionality
- Stage (background) click events

### 💾 Import/Export
- Export graph to JSON
- Import graph from JSON
- Preserve all node and edge attributes
- Download/upload functionality

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

## Usage

### Basic Initialization

The graph auto-initializes when the page loads. It creates a sample graph with 20 nodes and random connections.

### API Reference

The `GraphAPI` object provides the following methods:

#### Core Methods
- `initialize()` - Initialize the graph and renderer
- `graph()` - Get the Graphology graph instance
- `renderer()` - Get the Sigma renderer instance

#### Graph Manipulation
- `addNode(id, attributes)` - Add a new node
- `removeNode(id)` - Remove a node
- `addEdge(source, target, attributes)` - Add an edge
- `removeEdge(source, target)` - Remove an edge

#### Layout Algorithms
- `applyCircularLayout()` - Apply circular layout
- `applyRandomLayout()` - Apply random layout
- `applyForceAtlas2Layout(iterations)` - Apply Force Atlas 2 layout

#### Analysis & Highlighting
- `getNodeDegree(nodeId)` - Get node degree
- `getNeighbors(nodeId)` - Get node neighbors
- `highlightNode(nodeId, color)` - Highlight a node
- `unhighlightNode(nodeId)` - Remove highlight
- `highlightPath(path, color)` - Highlight a path
- `clearHighlights()` - Clear all highlights

#### Search & Filter
- `searchNodes(query)` - Search nodes by label
- `filterNodesByAttribute(attribute, value)` - Filter nodes
- `hideNode(nodeId)` - Hide a node
- `showNode(nodeId)` - Show a hidden node

#### Import/Export
- `exportGraphData()` - Export graph as object
- `importGraphData(data)` - Import graph from object
- `exportToJSON()` - Export as JSON string
- `importFromJSON(jsonString)` - Import from JSON string

#### Statistics
- `getGraphStats()` - Get overall graph statistics
- `getNodeStats(nodeId)` - Get statistics for a specific node

### Example Usage

```javascript
import GraphAPI from './app.js';

// Initialize the graph
const { graph, renderer } = GraphAPI.initialize();

// Add a custom node
GraphAPI.addNode('custom-1', {
  label: 'Custom Node',
  color: '#e74c3c',
  size: 15,
  x: 0.5,
  y: 0.5
});

// Add an edge
GraphAPI.addEdge('custom-1', 'node-0', {
  weight: 0.8,
  color: '#3498db'
});

// Highlight neighbors of a node
const neighbors = GraphAPI.getNeighbors('node-0');
neighbors.forEach(neighbor => {
  GraphAPI.highlightNode(neighbor, '#f39c12');
});

// Search for nodes
const results = GraphAPI.searchNodes('Node 5');
console.log('Search results:', results);

// Get statistics
const stats = GraphAPI.getGraphStats();
console.log('Graph stats:', stats);

// Export graph
const json = GraphAPI.exportToJSON();
console.log('Exported graph:', json);
```

## Customization

### Configuration

Edit the `config` object in `app.js` to customize:

```javascript
const config = {
  container: "graph-container",
  settings: {
    defaultNodeColor: "#3388ff",
    defaultEdgeColor: "#cccccc",
    labelSize: 12,
    // ... more settings
  },
};
```

### Sample Data

Modify the `generateSampleGraph()` function to create your own initial graph structure.

### Styling

Edit the CSS in `index.html` to customize the UI appearance.

## Technologies Used

- **Sigma.js** (v3.0.0-beta) - WebGL-based graph rendering
- **Graphology** (v0.25.4) - Graph data structure
- **Graphology Layout** - Layout algorithms
- **Vite** - Build tool and dev server

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - Feel free to use this template for your projects!

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## Resources

- [Sigma.js Documentation](https://www.sigmajs.org/)
- [Graphology Documentation](https://graphology.github.io/)
- [Force Atlas 2 Paper](https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0098679)

