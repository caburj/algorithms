import shuffle from "../src/Shuffle.ts";

if (import.meta.main) {
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  shuffle(items);
  console.log(items);
  for (let i in [...'123456']) {
    const x = [1, 2, 3];
    shuffle(x);
    console.log(x);
  }
}
