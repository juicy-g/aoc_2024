const fs = require("node:fs");

fs.readFile("day4_input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let answer = 0;

  // part 1
  // const normal_regex = /(?=(XMAS))|(?=(SAMX))/g;
  // const vertical_regex =
  //   /(?=(X.{140}M.{140}A.{140}S))|(?=(S.{140}A.{140}M.{140}X))/gs;
  // const diagonal1_regex =
  //   /(?=(X.{141}M.{141}A.{141}S))|(?=(S.{141}A.{141}M.{141}X))/gs;
  // const diagonal2_regex =
  //   /(?=(X.{139}M.{139}A.{139}S))|(?=(S.{139}A.{139}M.{139}X))/gs;

  // answer += [...data.matchAll(normal_regex)].length;
  // answer += [...data.matchAll(vertical_regex)].length;
  // answer += [...data.matchAll(diagonal1_regex)].length;
  // answer += [...data.matchAll(diagonal2_regex)].length;

  // part 2
  const regex1 = /(?=M.{1}M.{139}A.{139}S.{1}S)/gs;
  const regex2 = /(?=S.{1}S.{139}A.{139}M.{1}M)/gs;
  const regex3 = /(?=S.{1}M.{139}A.{139}S.{1}M)/gs;
  const regex4 = /(?=M.{1}S.{139}A.{139}M.{1}S)/gs;
  answer += [...data.matchAll(regex1)].length;
  answer += [...data.matchAll(regex2)].length;
  answer += [...data.matchAll(regex3)].length;
  answer += [...data.matchAll(regex4)].length;

  console.log(answer);
});
