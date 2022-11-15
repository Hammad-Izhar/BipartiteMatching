import { DirectedEdge } from "./DirectedEdge";
import { Vertex } from "./Vertex";

type EdgePredicate = (edge: DirectedEdge) => boolean;

type Position = [x: number, y: number];

/**
 * Class to represent a general flow network
 *
 * @param source a vertex representing the source of the flow network
 * @param sink a vertex representing the sink of the flow network
 */

export class FlowNetwork {
  source: Vertex;
  sink: Vertex;

  vertexes = new Map<string, [Vertex, Position]>();
  edges = new Set<DirectedEdge>();

  constructor(
    sourceValue: string,
    sourcePosition: Position,
    sinkValue: string,
    sinkPosition: Position
  ) {
    this.source = this.addVertex(sourceValue, sourcePosition);
    this.sink = this.addVertex(sinkValue, sinkPosition);
  }

  /**
   * Adds a vertex to the flow network
   *
   * @param value a label/value for the vertex in the flow network
   * @param pos the position of the vertex in space
   * @returns the created created vertex
   */
  addVertex(value: string, pos: Position): Vertex {
    const newVertex = new Vertex(value);
    this.vertexes.set(value, [newVertex, pos]);
    return newVertex;
  }

  /**
   * Adds an edge in in the flow network
   *
   * @param flow the amount of flow through the edge, should be <= capacity
   * @param capacity the capacity of the edge
   * @param from the vertex that this edge originates from
   * @param to the vertex that this edge points towards
   * @returns the newly created edge
   */
  addEdge(flow: number, capacity: number, fromLabel: string, toLabel: string) {
    const from = this.vertexes.get(fromLabel);
    const to = this.vertexes.get(toLabel);

    if (!from || !to) {
      console.error(`Failed to find label ${!from ? fromLabel : toLabel}`);
      return;
    }

    const newEdge = new DirectedEdge(flow, capacity, from, to);

    this.edges.add(newEdge);
    from[0].edges.add(newEdge);
    to[0].edges.add(newEdge);

    return newEdge;
  }

  /**
   * Generates a DOT string to visualize the flow network
   *
   * @param rowSep multiplicative adjusment of row spacing, default 1
   * @param colSep multiplicative adjustment of column spacing, default 1
   * @param colorPredicate a predicate to change the color of an edge,
   * @param defaultColor if colorPredicate is false the color of the edge, default 'black'
   * @param altColor if colorPredicate is true the color of the edge, default 'red'
   * @returns a DOT string representing the flow network (use the neato engine to display)
   */
  generateDOTstring(
    rowSep: number = 1,
    colSep: number = 1,
    colorPredicate: EdgePredicate = (e: DirectedEdge) => false,
    altColor: string = "red",
    defaultColor: string = "black"
  ): string {
    let dotString = "";

    for (const key in this.vertexes) {
      const [v, [x, y]] = this.vertexes.get(key) as [Vertex, Position];

      dotString += `${v.value} [label="${v.value}" pos="${x * colSep},${
        y * rowSep
      }!"]\n`;
    }

    dotString += "\n";

    for (const e of this.edges) {
      dotString += `${e.from.value} -> ${e.to.value} [color=${
        colorPredicate(e) ? altColor : defaultColor
      }]\n`;
    }

    dotString = `digraph FlowNetwork {
     rankdir="LR";
     node [shape=rectangle style=rounded fixedsize=false]

    ${dotString}
}`;

    return dotString;
  }
}
