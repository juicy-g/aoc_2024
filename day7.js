const { open } = require("node:fs/promises");

(async () => {
  const file = await open("day7_input.txt");

  const values = [];
  const equations = [];
  let answer = [];

  for await (const line of file.readLines()) {
    let elements = line.split(/\s/g);
    values.push(parseInt(elements[0].substring(0, elements[0].length - 1)));
    elements.shift();
    elements = elements.map((elem) => parseInt(elem));
    equations.push(elements);
  }

  equations.forEach((equation, index) => {
    // find all possible combinations of operators based on equation length
    let combinations = [];
    for (let i = 0; i < Math.pow(3, equation.length - 1); i++) {
      let binaryString = i.toString(3);
      while (binaryString.length < equation.length - 1) {
        binaryString = "0" + binaryString;
      }
      combinations.push(binaryString);
    }

    // 0 for +, 1 for *, and 2 for ||
    // [ '0', '1', '2'], [ '00', '01', '02', '10', '11'], etc.

    let combinedArray = [];
    combinations.forEach((combination) => {
      combinedArray.push(
        equation
          .map((elem, y) => [elem, combination[y]])
          .flat()
          .slice(0, -1),
      );
    });

    for (let array of combinedArray) {
      let total = array[0];
      for (let i = 0; i < array.length - 2; i++) {
        if (array[i + 1] == "0") {
          total += array[i + 2];
        } else if (array[i + 1] == "1") {
          total *= array[i + 2];
        } else {
          total = parseInt(total.toString().concat(array[i + 2].toString()));
        }
        if (total > values[index]) {
          continue;
        }
        i++;
      }
      if (total == values[index]) {
        answer.push(total);
        continue;
      }
    }
  });
  // remove duplicate values
  answer = [...new Set(answer)];
  const sum = answer.reduce((total, value) => total + value, 0);
  console.log(sum);
})();
