const fs = require("node:fs/promises");

(async () => {
  let rules = [];
  let pages = [];
  let correct_pages = [];

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
    if (rule_correct) correct_pages.push(page);
  });

  let answer = 0;
  correct_pages.forEach((page) => {
    answer += page[Math.floor(page.length / 2)];
  });

  console.log(answer);
})();
