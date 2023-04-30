import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import whiteLogo from "../../imgs/white-pawn.png"
import blackLogo from "../../imgs/black-pawn.png"

export class Pawn extends Figure {
    first: boolean
    constructor(cell: Cell, color: Colors) {
        super(cell, color);
        this.name = FigureNames.PAWN;
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.first = true;
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false;
        }
        const dir = this.color === Colors.WHITE ? 1 : -1;
        if (this.cell.y - target.y === 1 * dir && target.x === this.cell.x && target.isEmpty()) {
            return true;
        }
        if (this.cell.y - target.y === 2 * dir && this.first && target.x === this.cell.x && target.isEmpty()) {
            return true;
        }
        if (this.cell.y - target.y === 1 * dir && (Math.abs(target.x - this.cell.x) === 1 && !target.isEmpty())) {
            return true;
        }
        return false;
    }
}