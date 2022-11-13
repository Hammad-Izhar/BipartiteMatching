import { Vertex, DirectedEdge, Graph } from "./Graph";

interface DirectedEdgeMap {
  [vertex: string]: DirectedEdge;
}

function findAugmentingPath(graph: Graph): [DirectedEdge[], number] {
  const q: Vertex[] = []; // BFS queue
  const prev: DirectedEdgeMap = {};

  const source = graph.source;
  const sink = graph.sink;

  q.push(source);

  while (q.length !== 0) {
    let currentVertex = q.shift();

    if (currentVertex !== undefined) {
      for (const e of currentVertex.edges) {
        const newVertex = e.from === currentVertex ? e.to : e.from;
        if (
          prev[newVertex.toString()] === undefined &&
          newVertex !== source &&
          e.residualCapacity(currentVertex, newVertex) > 0
        ) {
          prev[newVertex.toString()] = e;
          q.push(newVertex);
        }
      }
    }
  }

  let path_residual_capacity = Infinity;
  let path: DirectedEdge[] = [];

  if (prev[sink.toString()] !== undefined) {
    let currentVertex = sink;
    while (currentVertex !== source) {
      let e = prev[currentVertex.toString()];

      path.unshift(e);
      const newVertex = e.from === currentVertex ? e.to : e.from;
      path_residual_capacity = Math.min(
        path_residual_capacity,
        e.residualCapacity(newVertex, currentVertex)
      );
      currentVertex = newVertex;
    }
  }

  return [path, path_residual_capacity];
}

export function fordFulkerson(graph: Graph) {
  let [augmentingPath, path_residual_capacity] = findAugmentingPath(graph);
  while (augmentingPath.length !== 0 && path_residual_capacity !== 0) {
    // eslint-disable-next-line no-loop-func
    augmentingPath.forEach((e) => e.augmentFlow(path_residual_capacity));

    [augmentingPath, path_residual_capacity] = findAugmentingPath(graph);
  }
}
