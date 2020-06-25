import { Comparator } from "../types.d.ts";
import { shuffle, partition } from "../basics/Sort.ts";

/**
 * Select the `k`th highest item in `items`.
 */
export default function <T>(
  items: T[],
  comparator: Comparator<T>,
  k: number,
): T {
  shuffle(items);
  // kth largest is actually the (N - k)th item
  // when sorted (asc).
  const K = items.length - k;
  let [lo, hi] = [0, items.length - 1];
  while (lo < hi) {
    const j = partition(items, comparator, lo, hi);
    if (j < K) lo = j + 1;
    else if (j > K) hi = j - 1;
    else break;
  }
  return items[K];
}
