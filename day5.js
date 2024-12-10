const fs = require("node:fs/promises");

(async () => {
  let rules = [];
  let pages = [];
  let correct_pages = [];
  let incorrect_pages = [];

  const rules_data = await fs.readFile("day5_rules.txt", { encoding: "utf-8" });
  rules = rules_data.split("\n");
  rules.pop();
  rules = rules.map((rule) => rule.split("|").map((r) => parseInt(r)));

  let pages_data = await fs.readFile("day5_pages.txt", { encoding: "utf-8" });
  pages = pages_data.split("\n");
  pages.pop();
  pages = pages.map((page) => page.split(",").map((p) => parseInt(p)));

  pages.forEach((page) => {
    let rule_correct = true;
    rules.forEach((rule) => {
      if (page.includes(rule[0]) && page.includes(rule[1])) {
        if (
          page.findIndex((page) => page === rule[0]) >
          page.findIndex((page) => page === rule[1])
        ) {
          rule_correct = false;
        }
      }
    });

    if (rule_correct) {
      correct_pages.push(page);
    } else {
      incorrect_pages.push(page);
    }
  });

  for (let index = 0; index < 5; index++) {
    incorrect_pages.forEach((page) => {
      rules.forEach((rule) => {
        if (page.includes(rule[0]) && page.includes(rule[1])) {
          if (
            page.findIndex((page) => page === rule[0]) >
            page.findIndex((page) => page === rule[1])
          ) {
            page[page.indexOf(rule[0])] = page.splice(
              page.indexOf(rule[1]),
              1,
              page[page.indexOf(rule[0])],
            )[0];
          }
        }
      });
    });
  }

  let answer = 0;
  incorrect_pages.forEach((page) => {
    answer += page[Math.floor(page.length / 2)];
  });
  console.log(answer);
})();
