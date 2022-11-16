import { FlowNetwork } from "./FlowNetwork";
import csv from "csvtojson";

export async function parse(csvString: string): Promise<FlowNetwork> {
  const results = await csv().fromString(csvString);
  const graph = new FlowNetwork("source", [0, 0], "sink", [0, 3]);

  let namePosition = 0;
  let preferencePosition = 0;
  for (const index in results) {
    const name = results[index]["NAME"].trim();
    const preferences = results[index]["PREFERENCES"].trim().split(";");

    graph.addVertex(name, [namePosition, 1]);
    graph.addEdge(0, 1, "source", name);

    for (const preference of preferences) {
      const prefVertex = graph.addVertex(preference, [preferencePosition, 2]);

      graph.addEdge(0, 1, name, preference);

      if (prefVertex != null) {
        graph.addEdge(0, 20, preference, "sink");
        preferencePosition++;
      }
    }

    namePosition++;
  }

  return graph;
}
