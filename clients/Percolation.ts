import UF from "../src/UF.ts";
import { randomInt } from "https://deno.land/x/random_int/mod.ts";

/**
 * Visit https://coursera.cs.princeton.edu/algs4/assignments/percolation/specification.php to
 * see the problem description.
 */
class Percolation {
  private nOpen = 0;
  private size = 0;
  private n = 0;
  private grid: (boolean | undefined)[] = [];
  private uf: UF;
  private virtualTop = 0;
  private virtualBottom = 0;
  constructor(n: number) {
    this.uf = new UF(n * n + 2);
    this.n = n;
    this.size = n * n;
    this.virtualTop = 0;
    this.virtualBottom = this.size + 1;
  }
  private index(i: number, j: number): number {
    return (i - 1) * this.n + j;
  }
  open(i: number, j: number): void {
    const index = this.index(i, j);
    this.grid[index] = true;
    this.nOpen++;
    // connect to virtual top if first row
    (i === 1) && this.uf.union(index, this.virtualTop);
    // connect top neighbor
    (i !== 1) && this.isOpen(i - 1, j) &&
      this.uf.union(index, this.index(i - 1, j));
    // connect bottom neighbor
    (i !== this.n) && this.isOpen(i + 1, j) &&
      this.uf.union(index, this.index(i + 1, j));
    // connect left neighbor
    (j !== 1) && this.isOpen(i, j - 1) &&
      this.uf.union(index, this.index(i, j - 1));
    // connect right neighbor
    (j !== this.n) && this.isOpen(i, j + 1) &&
      this.uf.union(index, this.index(i, j + 1));
    // connect to virtual bottom if last row
    (i === this.n) && this.uf.union(index, this.virtualBottom);
  }
  isOpen(i: number, j: number): boolean {
    return Boolean(this.grid[this.index(i, j)]);
  }
  numberOfOpenSites(): number {
    return this.nOpen;
  }
  percolates(): boolean {
    return this.uf.connected(this.virtualTop, this.virtualBottom);
  }
  /**
   * Run single experiment.
   * Return the percentage of open sites at which it started to percolate.
   * It involves opening a site (a grid cell) for each step. Check if it
   * percolates each step. Once it percolates, it returns the percentage of
   * open sites.
   */
  runExperiment(): number {
    const chooseRandom = (): [number, number] => {
      const i = randomInt(1, this.n);
      const j = randomInt(1, this.n);
      return [i, j];
    };
    while (!this.percolates()) {
      const [i, j] = chooseRandom();
      if (!this.isOpen(i, j)) {
        this.open(i, j);
      }
    }
    return this.numberOfOpenSites() / this.size;
  }
}

class Stat {
  mean: number;
  stdev: number;
  confidenceLo: number;
  confidenceHi: number;
  constructor(samples: number[]) {
    const n = samples.length;
    const total = samples.reduce((s, x) => s + x, 0);
    const mean = total / n;
    const variance = samples.reduce((ssd, x) => (x - mean) ** 2 + ssd, 0) /
      (n - 1);
    const stdev = Math.sqrt(variance);
    const err = 1.96 * stdev / Math.sqrt(n);
    this.mean = mean;
    this.stdev = stdev;
    this.confidenceLo = mean - err;
    this.confidenceHi = mean + err;
  }
}

/**
 * Perform a Monte-Carlo simulation to determine the threshold p*
 * such that when p < p* a random n-by-n grid almost never percolates,
 * and when p > p*, a random n-by-n grid almost always percolates.
 * @param n grid size
 * @param trials number of trials
 */
function main(n: number, trials: number) {
  const percentages = [];
  for (let i = 0; i < trials; i++) {
    const percolation = new Percolation(n);
    percentages.push(percolation.runExperiment());
  }
  const stat = new Stat(percentages);
  console.log(`mean: ${stat.mean}`);
  console.log(`stdev: ${stat.stdev}`);
  console.log(
    `95% conf. interval: [${stat.confidenceLo}, ${stat.confidenceHi}]`,
  );
}

if (import.meta.main) {
  main(parseInt(Deno.args[0]), parseInt(Deno.args[1]));
}
