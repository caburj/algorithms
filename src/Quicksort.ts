import { Comparator } from "./types.d.ts";
import { swap } from "./utils.ts";

export default function <T>(items: T[], comparator: Comparator<T>) {
  quicksort<T>(items, comparator, 0, items.length - 1);
};

function quicksort<T>(
  items: T[],
  comparator: Comparator<T>,
  lo: number,
  hi: number,
) {
  if (hi <= lo) return;
  const j = partition<T>(items, comparator, lo, hi);
  quicksort<T>(items, comparator, lo, j - 1);
  quicksort<T>(items, comparator, j + 1, hi);
}

function partition<T>(
  items: T[],
  comparator: Comparator<T>,
  lo: number,
  hi: number,
): number {
  const pivot = items[lo];
  let [i, j] = [lo, hi + 1];
  while (true) {
    while (comparator(items[++i], pivot)) {
      if (i == hi) break;
    }
    while (comparator(pivot, items[--j])) {
      if (j == lo) break;
    }
    if (i >= j) break;
    swap(items, i, j);
  }
  swap(items, lo, j);
  return j;
}
