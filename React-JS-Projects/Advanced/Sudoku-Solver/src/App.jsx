import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

function App() {
  const gridSize = 9;
  const [sudokuGrid, setSudokuGrid] = useState(Array(gridSize).fill().map(() => Array(gridSize).fill(0)));
  const [userInputCells, setUserInputCells] = useState(new Set());
  const [warning, setWarning] = useState("");
  const inputRefs = useRef(Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => React.createRef())));

  const handleInputChange = (row, col, value) => {
    if (value !== '' && !isValidInput(value)) {
      setWarning('Invalid input: Only single-digit numbers (1-9) are allowed.');
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    if (value !== '' && !isValidMove(sudokuGrid, row, col, parseInt(value))) {
      setWarning(`Invalid move: ${value} is not allowed in row, column, or box.`);
      setTimeout(() => setWarning(""), 2000);
      return;
    }

    const newGrid = sudokuGrid.map((r, rowIndex) =>
      r.map((c, colIndex) => (rowIndex === row && colIndex === col ? parseInt(value) || 0 : c))
    );
    setSudokuGrid(newGrid);

    if (value !== '') {
      setUserInputCells(prev => new Set(prev).add(`${row}-${col}`));
    } else {
      setUserInputCells(prev => {
        const newSet = new Set(prev);
        newSet.delete(`${row}-${col}`);
        return newSet;
      });
    }
  };

  const handleKeyDown = (e, row, col) => {
    switch (e.key) {
      case 'ArrowUp':
        if (row > 0) {
          inputRefs.current[row - 1][col].current.focus();
        }
        break;
      case 'ArrowDown':
        if (row < gridSize - 1) {
          inputRefs.current[row + 1][col].current.focus();
        }
        break;
      case 'ArrowLeft':
        if (col > 0) {
          inputRefs.current[row][col - 1].current.focus();
        }
        break;
      case 'ArrowRight':
        if (col < gridSize - 1) {
          inputRefs.current[row][col + 1].current.focus();
        }
        break;
      default:
        break;
    }
  };

  const solveSudoku = async () => {
    const gridCopy = JSON.parse(JSON.stringify(sudokuGrid));
    if (solveSudokuHelper(gridCopy)) {
      for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
          if (!userInputCells.has(`${row}-${col}`)) {
            await new Promise(resolve => setTimeout(resolve, 20));
            setSudokuGrid(prevGrid => {
              const newGrid = [...prevGrid];
              newGrid[row][col] = gridCopy[row][col];
              return newGrid;
            });
          }
        }
      }
    } else {
      alert("No solution exists for the given Sudoku puzzle.");
    }
  };

  const solveSudokuHelper = (board) => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidMove(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudokuHelper(board)) {
                return true;
              }
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const isValidMove = (board, row, col, num) => {
    for (let i = 0; i < gridSize; i++) {
      if (board[row][i] === num && i !== col) {
        return false;
      }
    }
    for (let i = 0; i < gridSize; i++) {
      if (board[i][col] === num && i !== row) {
        return false;
      }
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i][j] === num) {
          return false;
        }
      }
    }
    return true;
  };

  const isValidInput = (value) => {
    return /^[1-9]$/.test(value);
  };

  const restartSudoku = () => {
    const initialGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(0));
    setSudokuGrid(initialGrid);
    setUserInputCells(new Set());
    setWarning("");
  };

  return (
    <div className="App">
      <h1>SudoSolver</h1>
      {/* <div className="image-container">
        <img src="src\assets\try_it.png" alt="Sudoku" />
      </div> */}
      <div className="sudoku-container">
        <table>
          <tbody>
            {sudokuGrid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <td key={colIndex}>
                    <input
                      ref={inputRefs.current[rowIndex][colIndex]}
                      type="tel"
                      maxLength="1"
                      inputMode="numeric"
                      pattern="[1-9]*"
                      className={`cell ${userInputCells.has(`${rowIndex}-${colIndex}`) ? 'user-input' : ''}`}
                      value={cell === 0 ? '' : cell}
                      onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={solveSudoku}>Solve Puzzle</button>
      {' '}
      <button onClick={restartSudoku}>Restart Puzzle</button>
      {warning && <p className="warning">{warning}</p>}
      <div className="linkedin-icon">
        <a href="https://www.linkedin.com/in/anantesh-gopal-6635b7264/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </a>
      </div>
    </div>
  );
}

export default App;
