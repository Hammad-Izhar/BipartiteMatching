import { FlowNetwork } from "./ford-fulkerson/FlowNetwork";
import { Graphviz } from "graphviz-react";
import { fordFulkerson } from "./ford-fulkerson/FordFulkerson";
import { DirectedEdge } from "./ford-fulkerson/DirectedEdge";

function App() {
  const graph: FlowNetwork = new FlowNetwork(
    "source",
    [0, 3.5],
    "sink",
    [3, 3.5]
  );

  const S = graph.source;
  const T = graph.sink;

  const P1 = graph.addVertex("P1", [1, 6]);
  const P2 = graph.addVertex("P2", [1, 5]);
  const P3 = graph.addVertex("P3", [1, 4]);
  const P4 = graph.addVertex("P4", [1, 3]);
  const P5 = graph.addVertex("P5", [1, 2]);
  const P6 = graph.addVertex("P6", [1, 1]);

  const J1 = graph.addVertex("J1", [2, 6]);
  const J2 = graph.addVertex("J2", [2, 5]);
  const J3 = graph.addVertex("J3", [2, 4]);
  const J4 = graph.addVertex("J4", [2, 3]);
  const J5 = graph.addVertex("J5", [2, 2]);
  const J6 = graph.addVertex("J6", [2, 1]);

  graph.addEdge(0, 1, P1, J2);
  graph.addEdge(0, 1, P3, J1);
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

  const pred = (e: DirectedEdge) => e.flow > 0 && e.from !== S && e.to !== T;

  const dotString = graph.generateDOTstring(1, 2, pred, "red", "black");

  console.log(dotString);

  return <Graphviz dot={dotString} options={{ engine: "neato" }} />;
}

export default App;
