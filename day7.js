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

  equations.forEach((equation, i) => {
    // find all possible combinations of operators based on equation length
    let combinations = [];
    for (let i = 0; i < Math.pow(2, equation.length - 1); i++) {
      let binaryString = i.toString(2);
      while (binaryString.length < equation.length - 1) {
        binaryString = "0" + binaryString;
      }
      combinations.push(binaryString);
    }
    // 0 for + and 1 for *
    // [ '0', '1'], [ '00', '01', '10', '11'], etc.

    let combinedArray = [];
    combinations.forEach((combination) => {
      combinedArray.push(
        equation
          .map((elem, y) => [elem, combination[y]])
          .flat()
          .slice(0, -1),
      );
    });

    combinedArray.forEach((array) => {
      let total = array[0];
      for (let i = 0; i < array.length - 2; i++) {
        if (array[i + 1] == "0") {
          total += array[i + 2];
        } else {
          total *= array[i + 2];
        }
        i++;
      }
      if (total == values[i]) answer.push(total);
    });
  });

  // remove duplicate values
  answer = [...new Set(answer)];
  const sum = answer.reduce((total, value) => total + value, 0);
  console.log(sum);
})();
