import { DirectedEdge } from "./DirectedEdge";
import { FlowNetwork } from "./FlowNetwork";
import { Vertex } from "./Vertex";

interface DirectedEdgeMap {
  [vertex: string]: DirectedEdge;
}

/**
 * Finds an augmenting path from source to sink in a network graph
 *
 * @param graph A flow network
 * @returns An augmenting path of the input graph along with its residual capacity
 */
function findAugmentingPath(graph: FlowNetwork): [DirectedEdge[], number] {
  const q: Vertex[] = [];
  const prev: DirectedEdgeMap = {};

  const source = graph.source;
  const sink = graph.sink;

  // BFS to find shortest augmenting path from source to sink
  // NOTE: Consider breaking out of the loop once a path to the sink has been found
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
    return [path, path_residual_capacity];
  }

  return [path, 0];
}

/**
 * Maximizes flow from source to sink in a flow network (in-place)
 *
 * @param graph A flow network
 */
export function fordFulkerson(graph: FlowNetwork) {
  let [augmentingPath, path_residual_capacity] = findAugmentingPath(graph);
  while (augmentingPath.length !== 0 && path_residual_capacity !== 0) {
    // eslint-disable-next-line no-loop-func
    augmentingPath.forEach((e) => e.augmentFlow(path_residual_capacity));

    [augmentingPath, path_residual_capacity] = findAugmentingPath(graph);
  }
}
