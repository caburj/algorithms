import { Comparator } from "./types.d.ts";

function merge<T>(
  items: T[],
  aux: T[],
  comparator: Comparator<T>,
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

function sort<T>(
  items: T[],
  aux: T[],
  comparator: Comparator<T>,
  first: number,
  last: number,
) {
  if (last <= first) return;
  const startRight = first + Math.trunc((last - first) / 2) + 1;
  sort<T>(items, aux, comparator, first, startRight - 1);
  sort<T>(items, aux, comparator, startRight, last);
  merge<T>(items, aux, comparator, first, startRight, last);
}

export default function <T>(
  items: T[],
  comparator: Comparator<T>,
) {
  sort<T>(items, [...items], comparator, 0, items.length - 1);
}
