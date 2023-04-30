import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../imgs/white-queen.png"
import blackLogo from "../../imgs/black-queen.png"

export class Queen extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.QUEEN;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        if (this.cell.isEmptyVertical(target)) {
            return true;
        }
        if (this.cell.isEmptyHorizontal(target)) {
            return true;
        }
        if (this.cell.isEmptyDiagonal(target)) {
            return true;
        }
        return false;
    }


}