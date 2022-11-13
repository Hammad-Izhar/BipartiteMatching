import { Vertex, NetworkGraph, BipartiteGraph } from "./ford-fulkerson/Graph";
import { Graphviz } from "graphviz-react";
import { fordFulkerson } from "./ford-fulkerson/fordFulkerson";

function App() {
  // First Test
  // const A = new Vertex("A", []);
  // const B = new Vertex("B", []);
  // const C = new Vertex("C", []);
  // const D = new Vertex("D", []);
  // const E = new Vertex("E", []);
  // const F = new Vertex("F", []);
  // const G = new Vertex("G", []);

  // const graph = new NetworkGraph(A, G);

  // graph.addEdge(0, 3, A, D);
  // graph.addEdge(0, 6, D, F);
  // graph.addEdge(0, 3, A, B);
  // graph.addEdge(0, 3, C, A);
  // graph.addEdge(0, 1, C, D);
  // graph.addEdge(0, 2, D, E);
  // graph.addEdge(0, 9, F, G);
  // graph.addEdge(0, 4, B, C);
  // graph.addEdge(0, 2, C, E);
  // graph.addEdge(0, 1, E, B);
  // graph.addEdge(0, 1, E, G);

  // Second Test
  // const S = new Vertex("S", []);
  // const T = new Vertex("T", []);
  // const U = new Vertex("U", []);
  // const V = new Vertex("V", []);
  // const W = new Vertex("W", []);
  // const Z = new Vertex("Z", []);

  // const graph = new NetworkGraph(S, T);

  // graph.addEdge(0, 6, S, V);
  // graph.addEdge(0, 3, S, W);
  // graph.addEdge(0, 5, S, U);
  // graph.addEdge(0, 1, V, W);
  // graph.addEdge(0, 3, V, T);
  // graph.addEdge(0, 1, U, W);
  // graph.addEdge(0, 2, U, Z);
  // graph.addEdge(0, 9, W, Z);
  // graph.addEdge(0, 7, W, T);
  // graph.addEdge(0, 5, Z, T);

  const P1 = new Vertex("P1", []);
  const P2 = new Vertex("P2", []);
  const P3 = new Vertex("P3", []);
  const P4 = new Vertex("P4", []);
  const P5 = new Vertex("P5", []);
  const P6 = new Vertex("P6", []);

  const J1 = new Vertex("J1", []);
  const J2 = new Vertex("J2", []);
  const J3 = new Vertex("J3", []);
  const J4 = new Vertex("J4", []);
  const J5 = new Vertex("J5", []);
  const J6 = new Vertex("J6", []);

  const S = new Vertex("S", []);
  const T = new Vertex("T", []);

  const graph = new BipartiteGraph(S, T);
  graph.addVertex(S, 3.5, 0);
  graph.addVertex(T, 3.5, 3);

  graph.addVertex(P1, 6, 1);
  graph.addVertex(P2, 5, 1);
  graph.addVertex(P3, 4, 1);
  graph.addVertex(P4, 3, 1);
  graph.addVertex(P5, 2, 1);
  graph.addVertex(P6, 1, 1);

  graph.addVertex(J1, 6, 2);
  graph.addVertex(J2, 5, 2);
  graph.addVertex(J3, 4, 2);
  graph.addVertex(J4, 3, 2);
  graph.addVertex(J5, 2, 2);
  graph.addVertex(J6, 1, 2);

  graph.addEdge(0, 1, P1, J2);
  graph.addEdge(0, 1, P3, J1);
  graph.addEdge(0, 1, P3, J4);
  graph.addEdge(0, 1, P3, J4);
  graph.addEdge(0, 1, P4, J3);
  graph.addEdge(0, 1, P5, J3);
  graph.addEdge(0, 1, P5, J4);
  graph.addEdge(0, 1, P6, J6);

  graph.addEdge(0, 1, S, P1);
  graph.addEdge(0, 1, S, P2);
  graph.addEdge(0, 1, S, P3);
  graph.addEdge(0, 1, S, P4);
  graph.addEdge(0, 1, S, P5);
  graph.addEdge(0, 1, S, P6);

  graph.addEdge(0, 1, J1, T);
  graph.addEdge(0, 1, J2, T);
  graph.addEdge(0, 1, J3, T);
  graph.addEdge(0, 1, J4, T);
  graph.addEdge(0, 1, J5, T);
  graph.addEdge(0, 1, J6, T);

  fordFulkerson(graph);

  console.log(graph.generateDOTstring());

  return (
    <Graphviz
      dot={graph.generateDOTstring()}
      options={{ engine: "fdp", useWorker: false }}
    />
  );
}

export default App;
