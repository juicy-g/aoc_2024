const fs = require("node:fs/promises");

function printGrid(grid) {
  grid.forEach((row) => {
    process.stdout.write(row.join(""));
    process.stdout.write("\n");
  });
}

(async () => {
  const data = await fs.readFile("day6_input.txt", { encoding: "utf-8" });
  let order = ["right", "down", "left"];
  let direction = "up";
  let grid = data.split("\n");
  grid.pop();
  grid = grid.map((row) => row.split(""));
  let grid2 = structuredClone(grid);

  // find initial coordinates
  let initialCol, initialRow;
  grid.forEach((line, i) => {
    line.forEach((column, j) => {
      if (column === "^") {
        initialCol = j;
        initialRow = i;
      }
    });
  });

  let row = initialRow;
  let col = initialCol;

  grid[row][col] = ".";

  // part 1
  row = row - 1;
  let spaces = 0;
  let exit = false;
  let path = [];

  while (!exit) {
    if (grid[row][col] == ".") {
      grid[row][col] = "X";
      spaces++;
      path.push([row, col]);
      switch (direction) {
        case "up":
          row--;
          break;
        case "right":
          col++;
          break;
        case "down":
          row++;
          break;
        case "left":
          col--;
          break;
      }
    }
    if (grid[row][col] == "X") {
      path.push([row, col]);
      switch (direction) {
        case "up":
          row--;
          break;
        case "right":
          col++;
          break;
        case "down":
          row++;
          break;
        case "left":
          col--;
          break;
      }
    }
    if (grid[row][col] == "#") {
      switch (direction) {
        case "up":
          row++;
          col++;
          break;
        case "right":
          row++;
          col--;
          break;
        case "down":
          row--;
          col--;
          break;
        case "left":
          row--;
          col++;
          break;
      }
      order.push(direction);
      direction = order.shift();
    }
    // check for exit
    if (
      (col === 0 && direction === "left") ||
      (row === 0 && direction === "up") ||
      (col === grid[0].length - 1 && direction === "right") ||
      (row === grid.length - 1 && direction === "down")
    ) {
      exit = true;
      path.push([row, col]);
    }
  }

  // console.log(spaces + 1 + " " + direction);
  // console.log(`row: ${row} col: ${col}`);
  // console.log(path);

  // part 2
  row = initialRow;
  col = initialCol;
  grid2[row][col] = ".";
  // printGrid(grid2);
  direction = "up";
  order = ["right", "down", "left"];
  let obstacles = [];
  let loop = 0;

  path.forEach((coord) => {
    exit = false;
    let iter = 0;
    grid2[coord[0]][coord[1]] = "#";
    while (!exit) {
      if (iter++ > 130 * 130) {
        obstacles.push(coord);
        exit = true;
      }
      if (grid2[row][col] == ".") {
        switch (direction) {
          case "up":
            row--;
            break;
          case "right":
            col++;
            break;
          case "down":
            row++;
            break;
          case "left":
            col--;
            break;
        }
      }
      if (grid2[row][col] == "#") {
        switch (direction) {
          case "up":
            row++;
            col++;
            break;
          case "right":
            row++;
            col--;
            break;
          case "down":
            row--;
            col--;
            break;
          case "left":
            row--;
            col++;
            break;
        }
        order.push(direction);
        direction = order.shift();
      }
      // check for exit
      if (
        (col === 0 && direction === "left") ||
        (row === 0 && direction === "up") ||
        (col === grid2[0].length - 1 && direction === "right") ||
        (row === grid2.length - 1 && direction === "down")
      ) {
        exit = true;
      }
    }

    // reset
    loop = 0;
    row = initialRow;
    col = initialCol;
    direction = "up";
    order = ["right", "down", "left"];
    grid2[coord[0]][coord[1]] = ".";
  });

  // remove duplicates
  function multiDimensionalUnique(arr) {
    var uniques = [];
    var itemsFound = {};
    for (var i = 0, l = arr.length; i < l; i++) {
      var stringified = JSON.stringify(arr[i]);
      if (itemsFound[stringified]) {
        continue;
      }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
    }
    return uniques;
  }

  let answer = multiDimensionalUnique(obstacles);
  console.log(answer.length);
})();
