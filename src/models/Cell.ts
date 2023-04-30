import { Board } from "./Board";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Pawn } from "./figures/Pawn";

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null | Pawn | King;
    board: Board;
    available: boolean;
    id: string

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.board = board;
        this.x = x;
        this.y = y;
        this.color = color;
        this.available = false;
        this.figure = null;
        this.id = x.toString() + y.toString();
    }

    isEmpty(): boolean {
        return this.figure === null
    }

    isEmptyVertical(target: Cell): boolean {
        if (target.x !== this.x) {
            return false;
        }

        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(this.x, i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyHorizontal(target: Cell) {
        if (target.y !== this.y) {
            return false;
        }

        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(i, this.y).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isEmptyDiagonal(target: Cell) {
        const absX = Math.abs(this.x - target.x)
        const absY = Math.abs(this.y - target.y)

        if (absX !== absY) {
            return false;
        }

        const dx = this.x < target.x ? 1 : -1;
        const dy = this.y < target.y ? 1 : -1;

        for (let i = 1; i < absX; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) {
                return false;
            }
        }
        return true;
    }

    isPawn(f: Figure | Pawn): f is Pawn {
        return (f as Pawn).first !== undefined;
    }

    moveFigure(target: Cell, back: boolean = true) {
        if (this.figure && this.figure?.canMove(target) && back) {
            if (this.isPawn(this.figure)) {
                this.figure.first = false;
            }
            this.figure?.moveFigure(target);
            target.figure = this.figure;
            target.figure.cell = target;
            this.figure = null;
        }
        if (!back && this.figure) {
            this.figure?.moveFigure(target);
            target.figure = this.figure;
            target.figure.cell = target;
            this.figure = null;
        }
    }
}