import fs from "fs";

const data = fs
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

type BoardMatrix = number[][];
type BoardResult = undefined | number;

const [bingoNumbers, ...bingoBoards] = data;

class BingoGame {
  gameCompleted = false;

  constructor(public bingoNumbers: number[], public boards: number[][]) {}

  public startGame() {
    // STARTING WITH number[][] you map the nested array to be a Board[]
    const bingoBoards = this.boards.map(
      (board, index) => new Board(board, index),
    );

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
  public bingo(boardIndex: number) {
    console.log(`THe winner is board with index: ${boardIndex}`);
  }
}

class Board {
  // CREATE BOARD MATRIX OF OUT ORIGINAL ARRAY
  boardCompleted = false;

  constructor(public boardNumbers: number[], public boardIndex: number) {}

  public analyzeDrawnNumber(drawnNumber: number): BoardResult {
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

  private replaceBoardNumber(index: number): void {
    this.boardNumbers[index] = -1;
  }

  private createBoardMatrix(board: number[]): BoardMatrix {
    const boardMatrix = [];

    while (board.length > 1) {
      boardMatrix.push(board.splice(0, 5));
    }
    return boardMatrix;
  }

  private analyzeBoard(board: BoardMatrix): void {
    board.forEach(row => {
      const rowCount = row.reduce((prev, next) => {
        return prev + next;
      });

      if (rowCount === -5) {
        this.boardCompleted = true;
      }
    });
  }

  private transposeArray(boardMatrix: BoardMatrix): number[][] {
    return boardMatrix.map((_, colIndex) =>
      boardMatrix.map(row => row[colIndex]),
    );
  }
}

const testingNumbers = [...bingoNumbers];
const testingBingoBoard = [...bingoBoards];

const testingGame = new BingoGame(testingNumbers, testingBingoBoard);
testingGame.startGame();
