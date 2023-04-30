import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../imgs/white-king.png"
import blackLogo from "../../imgs/black-king.png"

export class King extends Figure {
    isUnderAttack: boolean = false;
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.KING;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    }
    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        if (Math.abs(this.cell.x - target.x) < 2 && Math.abs(this.cell.y - target.y) < 2) {
            return true;
        }
        return false;
    }
}