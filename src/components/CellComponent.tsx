import React from "react";
import { Cell } from "../models/Cell";

interface cellProps {
    cell: Cell
    selected: boolean
    click: (cell: Cell) => void
}

const CellComponent: React.FC<cellProps> = function ({ cell, selected, click }) {
    return (
        <div
            className={['cell', 'cell-' + cell.color,
                selected ? 'selected' : '',
                cell.available && cell.figure ? 'available-figure' : ''].join(' ')}
            onClick={() => click(cell)}
        >
            <div className={cell.available && !cell.figure ? "available-cell" : ''}></div>
            {cell.figure?.logo && <img className="cell-img" src={cell.figure.logo}></img>}
        </div>
    );
}

export default CellComponent;