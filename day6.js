const fs = require("node:fs/promises");

function printGrid(grid) {
  grid.forEach((row) => {
    process.stdout.write(row.join(""));
    process.stdout.write("\n");
  });
}

(async () => {
  const data = await fs.readFile("day6_input.txt", { encoding: "utf-8" });
  const order = ["right", "down", "left"];
  let direction = "up";
  let grid = data.split("\n");
  grid.pop();
  grid = grid.map((row) => row.split(""));

  // find initial coordinates
  let col, row;
  grid.forEach((line, i) => {
    line.forEach((column, j) => {
      if (column === "^") {
        col = j;
        row = i;
      }
    });
  });

  grid[row][col] = ".";

  row = row - 1;

  let spaces = 1;
  let exit = false;

  while (!exit) {
    if (grid[row][col] == ".") {
      grid[row][col] = "X";
      spaces++;
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
      grid[row][col] = "*";
    }
  }

  printGrid(grid);
  console.log(spaces + 1 + " " + direction);
  console.log(`row: ${row} col: ${col}`);
})();
