import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../imgs/white-bishop.png"
import blackLogo from "../../imgs/black-slon.png"

export class Bishop extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.BISHOP;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }
}