import React, { useState, useEffect } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import { Colors } from "../models/Colors";
import CellComponent from "./CellComponent";
import MyButton from "./UI/button/MyButton";

interface boardProps {
    board: Board
    setBoard: (board: Board) => void
    restart: () => void
}

const BoardComponent: React.FC<boardProps> = function ({ board, setBoard, restart }) {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [isWhitePlayer, setIsWhitePlayer] = useState(true);
    const [whiteKingPos, setWhiteKingPos] = useState([4, 7]);
    const [blackKingPos, setBlackKingPos] = useState([4, 0]);


    function clickOnCell(cell: Cell) {
        //отменяем выделенную фигуру
        if (selectedCell && cell === selectedCell) {
            setSelectedCell(null);
        }
        //ход фигурой
        else if (selectedCell && cell !== selectedCell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
            // Проверка на шах
            //если двигаем королём
            if (selectedCell.x === whiteKingPos[0] && selectedCell.y === whiteKingPos[1] || selectedCell.x === blackKingPos[0] && selectedCell.y === blackKingPos[1]) {
                let pos = [cell.x, cell.y]
                if (board.isKingUnderAttack(pos, pos, isWhitePlayer)) {
                    cell.moveFigure(selectedCell, false);
                }
                else {
                    //шаха нет
                    setIsWhitePlayer(!isWhitePlayer);
                    if (selectedCell.x === whiteKingPos[0] && selectedCell.y === whiteKingPos[1]) {
                        setWhiteKingPos([cell.x, cell.y])
                    }
                    if (selectedCell.x === blackKingPos[0] && selectedCell.y === blackKingPos[1]) {
                        setBlackKingPos([cell.x, cell.y])
                    }
                }
            }
            //если двигаем другую фигуру
            else {
                if (board.isKingUnderAttack(whiteKingPos, blackKingPos, isWhitePlayer)) {
                    cell.moveFigure(selectedCell, false);
                }
                else {
                    setIsWhitePlayer(!isWhitePlayer);
                    if (selectedCell.x === whiteKingPos[0] && selectedCell.y === whiteKingPos[1]) {
                        setWhiteKingPos([cell.x, cell.y])
                    }
                    if (selectedCell.x === blackKingPos[0] && selectedCell.y === blackKingPos[1]) {
                        setBlackKingPos([cell.x, cell.y])
                    }
                }
            }
        }
        //просто выделение
        else if (cell.figure && (cell.figure.color === Colors.WHITE && isWhitePlayer || cell.figure.color === Colors.BLACK && !isWhitePlayer)) {
            setSelectedCell(cell);
        }
    }

    //меняем подсветку доски, каждый раз как меняется выбранная клетка
    useEffect(() => {
        higlightCells();
    }, [selectedCell])

    function higlightCells() {
        board.higlightCells(selectedCell);
        updateBoard();
    }

    function updateBoard() {
        const newBoard = board.getCopy();
        setBoard(newBoard);
    }

    function restartGame() {
        setIsWhitePlayer(true);
        restart();
    }

    let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']

    return (
        <div>
            <div style={{ display: 'flex', 'marginBottom': '10px' }}>
                <h2>Ход {isWhitePlayer ? "белого" : "чёрного"} игрока</h2>
                <MyButton onClick={restartGame}>Restart</MyButton>
            </div>
            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell, index) =>
                            <CellComponent
                                cell={cell}
                                key={cell.id}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                click={clickOnCell}
                            />
                        )}
                        <h4>{index + 1}</h4>
                    </React.Fragment>
                )}
                <ol>
                    {chars.map((char, index) => (<li key={index}><h4>{char}</h4></li>))}
                </ol>
            </div>
        </div>
    );
}

export default BoardComponent;