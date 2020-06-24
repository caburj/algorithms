/**
 * Swap items in indeces `i` and `j`.
 */
export function swap<T>(items: T[], i: number, j: number) {
    [items[i], items[j]] = [items[j], items[i]];
}