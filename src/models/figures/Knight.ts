import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../imgs/white-knight.png"
import blackLogo from "../../imgs/black-knight.png"

export class Knight extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.KNIGHT;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        if (((Math.abs(target.y - this.cell.y) === 2 && Math.abs(target.x - this.cell.x) === 1) ||
            (Math.abs(target.y - this.cell.y) === 1 && Math.abs(target.x - this.cell.x) === 2)
        )) {
            return true;
        }
        return false;
    }
}