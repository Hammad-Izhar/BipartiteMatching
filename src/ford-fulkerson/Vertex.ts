import { DirectedEdge } from "./DirectedEdge";

/**
 * Class to represent a vertex in a flow network
 *
 * @param value a label/value for the vertex
 */
export class Vertex {
  value: string;
  edges = new Set<DirectedEdge>();

  constructor(value: string) {
    this.value = value;
  }

  toString() {
    return `Vertex(value=${this.value})`;
  }
}
