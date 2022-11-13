import { RecordWithTtl } from "dns";

export class Vertex {
  value: string;
  edges: DirectedEdge[];

  constructor(value: string, out_edges: DirectedEdge[]) {
    this.value = value;
    this.edges = out_edges;
  }

  toString() {
    // return `Vertex(value=${this.value}, edges=${this.edges})`;
    return `${this.value}`;
  }
}

export class DirectedEdge {
  flow: number;
  capacity: number;
  from: Vertex;
  to: Vertex;

  constructor(flow: number, capacity: number, from: Vertex, to: Vertex) {
    if (flow > capacity) {
      console.error("Warning: Edge has flow greater than capacity");
    }

    this.flow = flow;
    this.capacity = capacity;
    this.from = from;
    this.to = to;
  }

  augmentFlow(augment: number): DirectedEdge {
    this.flow = this.flow + augment;
    return this;
  }

  residualCapacity(from: Vertex, to: Vertex): number {
    if (from === this.from && this.to === to) {
      return this.capacity - this.flow;
    }
    return this.flow;
  }

  toString() {
    return `DirectedEdge(flow=${this.flow}, capacity=${this.capacity}, from=${this.from}, to=${this.to})`;
  }
}

export interface Graph {
  source: Vertex;
  sink: Vertex;
}

export class NetworkGraph implements Graph {
  source: Vertex;
  sink: Vertex;
  private edges: DirectedEdge[] = [];

  constructor(source: Vertex, sink: Vertex) {
    this.source = source;
    this.sink = sink;
  }

  addEdge(flow: number, capacity: number, from: Vertex, to: Vertex) {
    const e = new DirectedEdge(flow, capacity, from, to);

    this.edges.push(e);
    from.edges.push(e);
    to.edges.push(e);
  }

  generateDOTstring(): string {
    let dotString = "";
    for (const e of this.edges) {
      dotString += `${e.from.value} -> ${e.to.value} [label="${e.flow}/${e.capacity}"]\n`;
    }
    dotString = `digraph { rankdir="LR"; ${dotString} }`;

    return dotString;
  }
}

export class BipartiteGraph implements Graph {
  source: Vertex;
  sink: Vertex;
  private edges: DirectedEdge[] = [];
  private vertexes: [Vertex, number, number][] = [];
  private rowSep: number;
  private colSep: number;

  constructor(
    source: Vertex,
    sink: Vertex,
    rowSep: number = 1,
    colSep: number = 2
  ) {
    this.source = source;
    this.sink = sink;
    this.rowSep = rowSep;
    this.colSep = colSep;
  }

  addVertex(vertex: Vertex, row: number, column: number) {
    this.vertexes.push([vertex, row, column]);
  }

  addEdge(flow: number, capacity: number, from: Vertex, to: Vertex) {
    const e = new DirectedEdge(flow, capacity, from, to);

    this.edges.push(e);
    from.edges.push(e);
    to.edges.push(e);
  }

  generateDOTstring(): string {
    let dotString = "";

    for (const [v, row, col] of this.vertexes) {
      dotString += `${v} [label="${v}" pos="${col * this.colSep},${
        row * this.rowSep
      }!"]\n`;
    }

    dotString += "\n";

    for (const e of this.edges) {
      dotString += `${e.from.value} -> ${e.to.value} [color=${
        e.flow && e.from !== this.source && e.to !== this.sink ? "red" : "black"
      }]\n`;
    }

    dotString = `digraph {
      rankdir="LR";

      node [shape=rect style=rounded fixedsize=false width=""]

      ${dotString}
    }`;
    return dotString;
  }
}
