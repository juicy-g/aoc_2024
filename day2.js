const { open } = require("node:fs/promises");

function check_safe(arr) {
  if (
    arr.every(
      (num, i) =>
        (num > arr[i + 1] && num - arr[i + 1] <= 3) || arr[i + 1] === undefined,
    ) ||
    arr.every(
      (num, i) =>
        (num < arr[i + 1] && arr[i + 1] - num <= 3) || arr[i + 1] === undefined,
    )
  ) {
    return true;
  }
  return false;
}

(async () => {
  const file = await open("day2_input.txt");

  let safe = [];

  for await (const line of file.readLines()) {
    const numbers = line.split(" ").map((n) => parseInt(n));

    if (check_safe(numbers)) {
      safe.push(numbers);
    } else {
      let exit = false;
      numbers.forEach((num, i) => {
        if (exit) return;
        if (check_safe(numbers.toSpliced(i, 1))) {
          exit = true;
          safe.push(numbers);
          return;
        }
      });
    }
  }

  console.log(safe.length);
})();
