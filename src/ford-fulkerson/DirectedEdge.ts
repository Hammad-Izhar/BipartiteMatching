import { Vertex } from "./Vertex";

/**
 * Class to represent an edge in a flow network
 *
 * @param flow the amount of flow through the edge, should be <= capacity
 * @param capacity the capacity of the edge
 * @param from the vertex that this edge originates from
 * @param to the vertex that this edge points towards
 */

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

  /**
   * Augments the flow of the edge (in-place)
   *
   * @param augment a non-negative amount to augment the flow such that flow augment <= capacity
   * @returns The same edge with total flow augmented
   */
  augmentFlow(augment: number): DirectedEdge {
    if (this.flow + augment > this.capacity) {
      console.error(
        "Warning: Unable to augment flow to value greater than edge capacity"
      );
      return this;
    }

    this.flow = this.flow + augment;
    return this;
  }

  /**
   * Computes the residual capacity of the edge in a given traversal direction
   *
   * @param from the vertex that traversal originates from
   * @param to the vertex that the traversal ends at
   * @returns the residual capacity of the edge in the given traversal direction
   */
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
