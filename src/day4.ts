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
interface CompletedBoard {
  calculation: number;
  lastNumberDrawn: number;
  boardIndex: number;
}

const [bingoNumbers, ...bingoBoards] = data;

class BingoGame {
  playersFinished = 0;
  players = this.boards.length;

  constructor(public bingoNumbers: number[], public boards: number[][]) {}

  public startGame() {
    // STARTING WITH number[][] you map the nested array to be a Board[]
    const bingoBoards = this.boards.map(
      (board, index) => new Board(board, index),
    );

    let finalResult = null;

    // LOOP THROUGH NUMBERS
    for (const drawnNumber of bingoNumbers) {
      if (finalResult) {
        break;
      }

      // PART 2
      // IF THE BOARD GETS COMPLETED, KICK IT OUF OF THE ARRAY OF bingoBoards
      // IF THE BOARD GETS COMPLETED AND ITS THE LAST BOARD
      //  STEP 1 - LET ALL BOARD FINISH AND DONT STOP THE GAME...
      // NEXT STEP - CREATE VAR THAT HOLDS BOARDS FINISHED

      for (const board of bingoBoards) {
        // board returns index
        const completedBoard = board.analyzeDrawnNumber(drawnNumber);

        if (completedBoard) {
          this.playersFinished++;

          if (this.playersFinished === this.players) {
            this.bingo(completedBoard);
            finalResult = this.bingo(completedBoard);
            break;
          }
        }
      }
    }
    return finalResult;
  }
  public bingo(board: CompletedBoard): number {
    console.log(`The winner is board with index: ${board.boardIndex}`);
    console.log(`Last number called: ${board.lastNumberDrawn}`);
    console.log(`Calculation for remaining numbers: ${board.calculation}`);
    return board.calculation;
  }
}

class Board {
  // CREATE BOARD MATRIX OF OUT ORIGINAL ARRAY
  boardCompleted = false;

  constructor(public boardNumbers: number[], public boardIndex: number) {}

  public analyzeDrawnNumber(drawnNumber: number): CompletedBoard | undefined {
    if (this.boardCompleted) return;

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

      return {
        calculation: remainingNumbers * drawnNumber,
        lastNumberDrawn: drawnNumber,
        boardIndex: this.boardIndex,
      };
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
