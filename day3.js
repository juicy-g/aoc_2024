const fs = require("node:fs");

let filtered_lines = [];
let muls = [];

fs.readFile("day3_input.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const regex1 = /don't\(\)[\s\S]*?do\(\)/gs;
  let filtered_data = data.replaceAll(regex1, "");

  const regex2 = /mul\((\d{1,3}),(\d{1,3})\)/g;
  (muls = [...filtered_data.matchAll(regex2)].map((match) => [
    match[1],
    match[2],
  ])),

  let sum = 0;
  muls.forEach((arr) => {
    sum += parseInt(arr[0]) * parseInt(arr[1]);
  });

  console.log(sum);
});
