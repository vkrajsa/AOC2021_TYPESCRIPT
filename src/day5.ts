import fs from "fs";

const data = fs.readFileSync("./data/day5.txt", { encoding: "utf-8" });
console.log(data);
// .split("\n\n")
// .map((x, index) => {
//   return x
//     .replace(/[\n ,]/g, " ")
//     .trim()
//     .split(" ")
//     .filter(x => x != "")
//     .map(x => parseInt(x));
// });

// PLAN OF ACTION

// DONE!!!!  STEP 0 (MAP DATA TO IDEAL FORMAT)  DONE!!!!
// coordinates = [ { x1: 0 , y1: 9 , x1:5 , y2: 9} ]
// const coordinates = [ { x1: 0, y1: 9, x2: 5, y2: 9 } ];
// for (const position of coordinates) {
// }

// STEP 1 (CREATE MATRIX BASED ON DATA)
// - need to know : length of the row, number of columns
// STEP 2 (FILL MATRIX WITH COORDINATES)
// STEP 3 (ANALYZE MARTRIX WITH OVERLAPS)
// - get cooordinates { x1: 0 , y1: 9 , x1:5 , y2: 9}
// - run method that checks if x1 === x2 if true => we have vertical line , if y1 === y2 => we have horizontal line

// LINE ONE   0  ,   9     >     5     ,   9
//         col x     row y     col x     row y

// LINE ARE COORDINATES x / y = you have to find

// 0x        9x
//0[.......1..] 0y  row y
// [.......1..]  row y
// [.......1..]  row y
// [.......1..]
// [.112111211]
// [..........]
// [..........]
// [..........]
// [..........]
//9[..........] 9y
//
// EACH LINE IS ANALYZED AND
