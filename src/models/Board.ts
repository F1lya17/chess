import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = []

    initCells() {
        for (let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for (let j = 0; j < 8; j++) {
                if ((i + j) % 2 === 0) {
                    row.push(new Cell(this, j, i, Colors.WHITE, null));
                }
                else {
                    row.push(new Cell(this, j, i, Colors.BLACK, null));
                }
            }
            this.cells.push(row);
        }
    }

    getCell(x: number, y: number) {
        return this.cells[y][x]
    }

    higlightCells(cell: Cell | null) {
        for (let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i];
            for (let j = 0; j < row.length; j++) {
                if (cell?.figure?.canMove(row[j])) {
                    row[j].available = true;
                }
                else {
                    row[j].available = false;
                }
            }
        }
    }

    getCopy(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        return newBoard
    }

    isKingUnderAttack(whitePos: Array<number>, blackPos: Array<number>, isWhitePlayer: boolean) {
        if (isWhitePlayer) {
            for (let i = 0; i < this.cells.length; i++) {
                const row = this.cells[i];
                for (let j = 0; j < row.length; j++) {
                    //если какая-то противоположная фигура может перейти на позицию короля
                    if (row[j].figure?.color === Colors.BLACK && row[j].figure?.canMove(this.cells[whitePos[1]][whitePos[0]])) {
                        return true;
                    }
                }
            }
            return false;
        }
        else {
            for (let i = 0; i < this.cells.length; i++) {
                const row = this.cells[i];
                for (let j = 0; j < row.length; j++) {
                    //если какая-то противоположная фигура может перейти на позицию короля
                    if (row[j].figure?.color === Colors.WHITE && row[j].figure?.canMove(this.cells[blackPos[1]][blackPos[0]])) {
                        return true;
                    }
                }
            }
            return false;
        }
    }

    setFigures() {
        for (let i = 0; i < 8; i++) {
            new Pawn(this.getCell(i, 1), Colors.BLACK)
            new Pawn(this.getCell(i, 6), Colors.WHITE)
        }

        new Queen(this.getCell(3, 0), Colors.BLACK)
        new Queen(this.getCell(3, 7), Colors.WHITE)
        new King(this.getCell(4, 0), Colors.BLACK)
        new King(this.getCell(4, 7), Colors.WHITE)

        new Rook(this.getCell(0, 0), Colors.BLACK)
        new Rook(this.getCell(7, 0), Colors.BLACK)
        new Rook(this.getCell(0, 7), Colors.WHITE)
        new Rook(this.getCell(7, 7), Colors.WHITE)

        new Knight(this.getCell(1, 0), Colors.BLACK)
        new Knight(this.getCell(6, 0), Colors.BLACK)
        new Knight(this.getCell(1, 7), Colors.WHITE)
        new Knight(this.getCell(6, 7), Colors.WHITE)

        new Bishop(this.getCell(2, 0), Colors.BLACK)
        new Bishop(this.getCell(5, 0), Colors.BLACK)
        new Bishop(this.getCell(2, 7), Colors.WHITE)
        new Bishop(this.getCell(5, 7), Colors.WHITE)
    }
}