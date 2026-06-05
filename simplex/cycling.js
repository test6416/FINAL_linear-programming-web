export class CyclingDetector {

  constructor() {

    this.history = new Set();
  }

  serializeBasis(basis) {

    return basis.join(",");
  }

  hasCycle(basis) {

    const key =
      this.serializeBasis(basis);

    if (this.history.has(key)) {
      return true;
    }

    this.history.add(key);

    return false;
  }

  clear() {

    this.history.clear();
  }
}