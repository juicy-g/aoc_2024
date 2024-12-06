const { open } = require("node:fs/promises");

(async () => {
  const file = await open("input.txt");

  let left_column = [];
  let right_column = [];
  let similarities = [];

  for await (const line of file.readLines()) {
    left_column.push(line.slice(0, 5));
    right_column.push(line.slice(8, 13));
  }

  for (let i = 0; i < left_column.length; i++) {
    let number = right_column.filter((location) => location === left_column[i]);
    similarities.push(left_column[i] * number.length);
  }

  const answer = similarities.reduce((total, value) => total + value, 0);
  console.log(answer);
})();
