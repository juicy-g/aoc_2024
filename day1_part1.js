const { open } = require("node:fs/promises");

(async () => {
  const file = await open("input.txt");

  let left_column = [];
  let right_column = [];
  let distances = [];

  for await (const line of file.readLines()) {
    left_column.push(line.slice(0, 5));
    right_column.push(line.slice(8, 13));
  }

  left_column.sort();
  right_column.sort();

  for (let i = 0; i < left_column.length; i++) {
    distances.push(Math.abs(left_column[i] - right_column[i]));
  }

  const answer = distances.reduce((total, value) => total + value, 0);
  console.log(answer);
})();
