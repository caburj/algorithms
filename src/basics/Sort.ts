import { Comparator } from "../types.d.ts";
import { swap } from "../utils.ts";
import { randomInt } from "https://deno.land/x/random_int/mod.ts";

export function partition<T>(
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

export function quicksort<T>(items: T[], comparator: Comparator<T>) {
  shuffle(items);
  sort(items, 0, items.length - 1);

  function sort(items: T[], lo: number, hi: number) {
    if (hi <= lo) return;
    const j = partition(items, comparator, lo, hi);
    sort(items, lo, j - 1);
    sort(items, j + 1, hi);
  }
}

export function mergesort<T>(items: T[], comparator: Comparator<T>) {
  sort(items, [...items], 0, items.length - 1);

  function merge(
    items: T[],
    aux: T[],
    firstLeft: number,
    firstRight: number,
    last: number,
  ) {
    for (let x = firstLeft; x <= last; x++) {
      aux[x] = items[x];
    }
    let [i, j] = [firstLeft, firstRight];
    for (let k = firstLeft; k <= last; k++) {
      if (i >= firstRight) {
        items[k] = aux[j++];
      } else if (j > last) {
        items[k] = aux[i++];
      } else if (comparator(aux[j], aux[i])) {
        // for stability, we only choose the 'right' item
        // when it is smaller than the 'left' item.
        items[k] = aux[j++];
      } else {
        items[k] = aux[i++];
      }
    }
  }

  function sort(items: T[], aux: T[], first: number, last: number) {
    if (last <= first) return;
    const startRight = first + Math.trunc((last - first) / 2) + 1;
    sort(items, aux, first, startRight - 1);
    sort(items, aux, startRight, last);
    merge(items, aux, first, startRight, last);
  }
}

/**
 * Shuffles the given `items` in place.
 * Based on Knuth shuffle.
 */
export function shuffle<T>(items: T[]) {
  if (items.length <= 1) {
    return items;
  }
  for (let i = 1; i < items.length; i++) {
    const r = randomInt(i);
    swap(items, i, r);
  }
}
