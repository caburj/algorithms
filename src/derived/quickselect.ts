import { shuffle, partition } from "../basics/Sort.ts";
import { less } from "../utils.ts";
import { Comparator } from "../types.d.ts";

/**
 * Select the `k`th (index=1) highest item in `items`.
 * If `saveSpace` is set to `true`, the calculation does
 * not use extra space but has a side-effect of shuffling
 * the `items`.
 *
 * e.g. `select(items, 1)` returns the largest item.
 */
export default function <T>(
  items: T[],
  k: number,
  comparator: Comparator<T> = less,
  saveSpace: boolean = false,
): T | undefined {
  if (items.length === 0 || items.length < k) {
    return undefined;
  }
  if (!saveSpace) items = [...items];
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
