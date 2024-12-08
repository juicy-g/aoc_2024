const fs = require("node:fs");

fs.readFile("day4_input.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let answer = 0;

  // find forward and reverse XMAS
  const normal_regex = /(?=(XMAS))|(?=(SAMX))/g;

  const vertical_regex =
    /(?=(X.{140}M.{140}A.{140}S))|(?=(S.{140}A.{140}M.{140}X))/gs;
  const diagonal1_regex =
    /(?=(X.{141}M.{141}A.{141}S))|(?=(S.{141}A.{141}M.{141}X))/gs;
  const diagonal2_regex =
    /(?=(X.{139}M.{139}A.{139}S))|(?=(S.{139}A.{139}M.{139}X))/gs;

  answer += [...data.matchAll(normal_regex)].length;
  answer += [...data.matchAll(vertical_regex)].length;
  answer += [...data.matchAll(diagonal1_regex)].length;
  answer += [...data.matchAll(diagonal2_regex)].length;

  // transform data into a two-dimensional array
  // let data_arr = data.split(/\s/g);
  // for (let index = 0; index < data_arr.length; index++) {
  //   data_arr[index] = data_arr[index].split("");
  // }

  // // select each column
  // let columns = [];
  // for (let index = 0; index < 140; index++) {
  //   columns.push(data_arr.map((c) => c[index]));
  // }
  // console.log(columns);

  // console.log(data_arr);

  console.log(answer);

  // console.log(data.indexOf(0x0a));
});
