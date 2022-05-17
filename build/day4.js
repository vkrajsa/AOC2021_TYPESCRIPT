"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default
    .readFileSync("./data/day4.txt", { encoding: "utf-8" })
    .split("\n\n")
    // .filter(x => Boolean(x))
    .map((x, index) => {
    console.log("index" + index, x);
    // return x;
    return x
        .replace(/[\n ,]/g, " ")
        .trim()
        .split(" ")
        .filter(x => x != "")
        .map(x => parseInt(x));
});
const [bingoNumbers, ...bingoBoards] = data;
class BingoGame {
    constructor(bingoNumbers, boards) {
        this.bingoNumbers = bingoNumbers;
        this.boards = boards;
        this.gameCompleted = false;
    }
    startGame() {
        // STARTING WITH number[][] you map the nested array to be a Board[]
        const bingoBoards = this.boards.map((board, index) => new Board(board, index));
        let finalResult = null;
        // LOOP THROUGH NUMBERS
        for (const drawnNumber of bingoNumbers) {
            if (this.gameCompleted) {
                break;
            }
            for (const board of bingoBoards) {
                // board returns index
                const result = board.analyzeDrawnNumber(drawnNumber);
                if (result) {
                    this.gameCompleted = true;
                    finalResult = this.bingo(result);
                    break;
                }
            }
        }
        return finalResult;
    }
    bingo(boardIndex) {
        console.log(`THe winner is board with index: ${boardIndex}`);
    }
}
class Board {
    constructor(boardNumbers, boardIndex) {
        this.boardNumbers = boardNumbers;
        this.boardIndex = boardIndex;
        // CREATE BOARD MATRIX OF OUT ORIGINAL ARRAY
        this.boardCompleted = false;
    }
    analyzeDrawnNumber(drawnNumber) {
        const index = this.boardNumbers.indexOf(drawnNumber);
        // IF NUMBER IS FOUND ON THE BOARD
        if (index != -1) {
            // REPLACE NUMBER WITH -1 AND MARKED IT AS GUESSED
            this.replaceBoardNumber(index);
        }
        const boardMatrix = this.createBoardMatrix([...this.boardNumbers]);
        // ANALYZE ROWS
        this.analyzeBoard(boardMatrix);
        // TRANSPOSE AND ANALYZE COLS
        this.analyzeBoard(this.transposeArray(boardMatrix));
        // TODO : COULD I CALL FROM THIS CLASS SOMEHOW BING METHOD DIRECTLY??
        if (this.boardCompleted) {
            const remainingNumbers = this.boardNumbers
                .filter(x => x != -1)
                .reduce((prev, next) => prev + next);
            return remainingNumbers * drawnNumber;
        }
    }
    replaceBoardNumber(index) {
        this.boardNumbers[index] = -1;
    }
    createBoardMatrix(board) {
        const boardMatrix = [];
        while (board.length > 1) {
            boardMatrix.push(board.splice(0, 5));
        }
        return boardMatrix;
    }
    analyzeBoard(board) {
        board.forEach(row => {
            const rowCount = row.reduce((prev, next) => {
                return prev + next;
            });
            if (rowCount === -5) {
                this.boardCompleted = true;
            }
        });
    }
    transposeArray(boardMatrix) {
        return boardMatrix.map((_, colIndex) => boardMatrix.map(row => row[colIndex]));
    }
}
const testingNumbers = [...bingoNumbers];
const testingBingoBoard = [...bingoBoards];
const testingGame = new BingoGame(testingNumbers, testingBingoBoard);
testingGame.startGame();
