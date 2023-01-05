"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
var Coordinates;
(function (Coordinates) {
    Coordinates[Coordinates["x1"] = 0] = "x1";
    Coordinates[Coordinates["y1"] = 1] = "y1";
    Coordinates[Coordinates["x2"] = 2] = "x2";
    Coordinates[Coordinates["y2"] = 3] = "y2";
})(Coordinates || (Coordinates = {}));
const data = fs_1.default
    .readFileSync("./data/day5.txt", { encoding: "utf-8" })
    .split("\n")
    .map((line, index) => {
    return (line
        .replace(/[->, " "]/g, "")
        .split("")
        .map((x, index) => parseInt(x))
        // NICE WAY TO CONVERT ARRAY TO OBJECT WITH KEYS USING ENUM AS WELL
        .reduce((acc, next, index) => (Object.assign(Object.assign({}, acc), { [Coordinates[index]]: next })), {}));
});
console.log(data);
class hydroVentureAnalyzer {
    // gets data input
    constructor(data) {
        this.data = data;
        this.lineOverlaps = 0;
        this.maxValueX = 0;
        this.maxValueY = 0;
    }
    // scanSurroundings
    // - run other methods
    // - return the restult of lineOverlaps
    // createMap() - STEP 1 (CREATE MATRIX BASED ON DATA)
    // private mapVents() - STEP 2 (FILL MATRIX WITH COORDINATES)
    // OPTIONAL: // STEP 3 (ANALYZE MARTRIX WITH OVERLAPS)
    scanSurroundings() {
        const counter = { x1: 0, y1: 0, x2: 0, y2: 0 };
        console.log(`🚀 ~ scanSurroundings ~ counter`, counter);
        this.data.forEach(line => {
            console.log(line.x1);
            counter.x1 = line.x1 > counter.x1 ? line.x1 : counter.x1;
            counter.x2 = line.x2 > counter.x2 ? line.x2 : counter.x2;
            counter.y1 = line.y1 > counter.y1 ? line.y1 : counter.y1;
            counter.y2 = line.y2 > counter.y2 ? line.y2 : counter.y2;
        });
        console.log(`🚀 ~ scanSurroundings ~ counter`, counter);
        // search for highest x
        // go for element in array
        // check for element that is x1 | x2
        // chompare it with maxValX
        // if its bigger , save new maxVal
        // search for highest y
    }
}
const mapVents = new hydroVentureAnalyzer(data);
mapVents.scanSurroundings();
// PLAN OF ACTION
// DONE!!!!  STEP 0 (MAP DATA TO IDEAL FORMAT)  DONE!!!!
// coordinates = [ { x1: 0 , y1: 9 , x1:5 , y2: 9} ]
// const coordinates = [ { x1: 0, y1: 9, x2: 5, y2: 9 } ];
// for (const position of coordinates) {
// }
// STEP 1 (CREATE MATRIX BASED ON DATA)
// - need to know : length of the row, number of columns
// - highest X coordinator is the length of array
// - highers Y coordinate is the number off arrays
// STEP 2 (FILL MATRIX WITH COORDINATES)
// - loop through the coordnatinates array...
// - use method that checks if x1 === x2 if true => we have vertical line , if y1 === y2 => we have horizontal line
// - if its vertical line you have method fillVerticalLine
// - if its horizontal method you have fillHorizontalLine method
// - both methods are spreading the coordinates over the arrays
// - if they encounter "." aka not a number, they make it a number, if they encounter number they add +1 increase
// STEP 3 (ANALYZE MARTRIX WITH OVERLAPS)
// - now I have matrix filled with the numbers
// - i need to find points, where there is 2 or higher
// - i loop through the whole arrays and count simply the numbers...
// - could I somehow do this step before while assigning the places...? Anytime I have increase from 1 to 2 i could hold it in store...this can happen only once at given position....
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
