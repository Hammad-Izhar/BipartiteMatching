import { FlowNetwork } from "./FlowNetwork";
import csv from "csvtojson";
import { Vertex } from "./Vertex";

export async function parse(csvString: string): Promise<FlowNetwork> {
  const results = await csv().fromString(csvString);
  const graph = new FlowNetwork("source", [0, 0], "sink", [3, 0]);

  for (const index in results) {
    const name = results[index]["NAME"].strip();
    const preferences = results[index]["PREFERENCES"].strip().split(";");

    if (!vertices.has(name)) {
      vertices.set(name, new Vertex(name));
      graph.addVertex();
    }

    for (const preference of preferences) {
      if (!vertices.has(preference))
        vertices.set(preference, new Vertex(preference));
    }
  }
  console.log(results);
  return new FlowNetwork("a", [0, 0], "b", [1, 0]);
}
