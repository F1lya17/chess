import logo from "../../imgs/black-king.png"
import { Cell } from "../Cell";
import { Colors } from "../Colors";


export enum FigureNames {
    BISHOP = 'Слон',
    KING = 'Король',
    QUEEN = 'Ферзь',
    PAWN = 'Пешка',
    ROOK = 'Ладья',
    KNIGHT = 'Конь',
    FIGURE = 'Фигура'
}

export class Figure {
    logo: typeof logo | null;
    color: Colors;
    cell: Cell;
    name: FigureNames;
    id: string;

    constructor(cell: Cell, color: Colors) {
        this.cell = cell;
        this.cell.figure = this;
        this.color = color;
        this.logo = null;
        this.name = FigureNames.FIGURE;
        this.id = this.name + color;
    }

    canMove(target: Cell): boolean {
        if (target.figure?.color === this.color) {
            return false;
        }
        return true;
    }
    moveFigure(target: Cell) {
    }
}