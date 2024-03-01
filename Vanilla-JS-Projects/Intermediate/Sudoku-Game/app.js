
let currentDifficulty = 0; // 0: easy, 1: medium, 2: hard, 3: super hard
const difficulties = [
    [
        [[4, 0, 0, 0, 1, 6], [0, 0, 0, 0, 2, 5], [3, 0, 0, 0, 0, 0], [0, 0, 6, 5, 4, 0], [0, 0, 1, 0, 0, 0], [5, 2, 4, 6, 3, 1]],
        [[0, 0, 0, 6, 2, 1], [0, 6, 2, 0, 0, 0], [3, 0, 6, 1, 0, 2], [0, 2, 0, 0, 6, 0], [0, 0, 0, 0, 0, 5], [0, 5, 4, 0, 1, 6]],
        // Add more easy puzzles
    ],
    [
        [[5, 6, 0, 0, 0, 3], [0, 0, 0, 0, 0, 4], [0, 0, 0, 3, 4, 1], [0, 3, 1, 0, 5, 0], [6, 0, 5, 0, 0, 0], [0, 0, 0, 0, 0, 0]],
        [[5, 0, 0, 0, 0, 0], [4, 0, 0, 0, 2, 0], [3, 0, 0, 0, 0, 4], [0, 6, 0, 3, 0, 0], [0, 4, 0, 0, 0, 2], [0, 0, 5, 0, 0, 1]],
        // Add more medium puzzles
    ],
    [
        [[2, 0, 0, 0, 0, 0], [0, 3, 0, 1, 0, 0], [0, 2, 6, 0, 0, 3], [0, 0, 4, 0, 0, 6], [0, 0, 0, 0, 0, 0], [0, 0, 2, 6, 0, 5]],
        [[0, 0, 0, 0, 0, 5], [0, 0, 6, 2, 0, 0], [2, 0, 0, 0, 1, 0], [3, 0, 0, 5, 0, 0], [0, 0, 0, 0, 0, 3], [0, 0, 5, 0, 0, 4]],
        // Add more hard puzzles
    ],
];

let lives = 3;
let wrongInputs = 0;

document.addEventListener('DOMContentLoaded', function () {
    const gridSize = 6;
    const solveButton = document.getElementById("solve-btn");
    solveButton.addEventListener('click', solveSudoku);

    const sudokuGrid = document.getElementById("sudoku-grid");

    //creating sudoku grid and input cells

    for (let row = 0; row < gridSize; row++) {
        const newRow = document.createElement("tr");
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement("td");
            const input = document.createElement("input");
            input.type = "text";
            input.className = "cell";
            input.id = `cell-${row}-${col}`;
            input.dataset.row = row;
            input.dataset.col = col;
            input.addEventListener("keydown", function (e) {
                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                }
            });
            input.addEventListener("input", handleInput);
            cell.appendChild(input);
            newRow.appendChild(cell);

        }
        sudokuGrid.appendChild(newRow);

    }
    changeDifficulty(0);
});

function changeDifficulty(difficulty) {
    currentDifficulty = difficulty;
    resetGrid();
}

function board() {
    const gridSize = 6;
    const sudokuArray = [];

    //fill the sudoku array

    for (let row = 0; row < gridSize; row++) {
        sudokuArray[row] = [];
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cellValue = document.getElementById(cellId).value;
            sudokuArray[row][col] = cellValue !== "" ? parseInt(cellValue) : 0;
        }
    }
    return sudokuArray;
}

//handel input entered in square
function handleInput(event) {
    let row = event.srcElement.dataset.row;
    let col = event.srcElement.dataset.col;
    let b = [];
    b = board();
    console.log(b);
    const inputValue = event.target.value.replace(/[^0-9]/g, '');
    event.target.value = inputValue;
    const parsedValue = parseInt(inputValue);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 6 && isValidMove(b, row, col, parsedValue)) {
        event.target.classList.remove("output-cell");
        event.target.style.color = "black";
    } else {
        event.target.classList.add("output-cell");
        event.target.style.color = "red";
        if (!isNaN(parsedValue)) {
            wrongInputs++;
        }
        document.getElementById("lives").textContent = `Lives: ${lives - wrongInputs}`;
        if (wrongInputs >= 3) {
            gameOver();
        }
    }
}

//game over
function gameOver() {
    alert("Game Over!");
    resetGrid();
}

//function for solve sudoku
async function solveSudoku() {
    const gridSize = 6;
    const sudokuArray = board();
    //Indentifying user-input and mark

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cellId = `cell-${row}-${col}`;
            const cell = document.getElementById(cellId);

            if (sudokuArray[row][col] !== 0) {
                cell.classList.add("user-input");
            } else {
                cell.classList.add("output-cell");
            }


        }

    }

    //Solving the soduko and dosplaying the solution
    if (solveSudokuHelper(sudokuArray)) {
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const cellId = `cell-${row}-${col}`;
                const cell = document.getElementById(cellId);

                //filling in solved valued and applying animations
                if (!cell.classList.contains("user-input")) {
                    cell.value = sudokuArray[row][col];
                    cell.classList.add("solved");
                    await sleep(60); //delay for visualisation
                }
            }

        }
    } else {
        alert("No solution exists for the given Sudoku puzzle.");
        resetGrid();
    }
}

function solveSudokuHelper(board) {
    const gridSize = 6;

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] > 6 || board[row][col] < 0) {
                return false;
            }
            if (board[row][col] === 0) {
                for (let num = 1; num <= 6; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;

                        //recursively check if there is a solution

                        if (solveSudokuHelper(board)) {
                            return true; //solved
                        }

                        board[row][col] = 0;  //Backtrack
                    }
                }
                return false; //No valid number found
            }
        }
    }

    return true;//All cekks filled
}

//check board is valid or not
function isValidMove(board, row, col, num) {
    if (num > 6 || num < 1) {
        return false;
    }
    const gridSize = 6;

    //Check row and column for conflicts

    for (let i = 0; i < gridSize; i++) {
        if ((i != col && board[row][i] === num) || (i != row && board[i][col] === num)) {
            return false;//Conflict found
        }
    }

    //Check the 3*3 subgrid conflicts

    const startRow = Math.floor(row / 2) * 2;
    const startCol = Math.floor(col / 3) * 3;

    for (let i = startRow; i < startRow + 2; i++) {
        for (let j = startCol; j < startCol + 3; j++) {
            if (!(i == row && j == col) && board[i][j] == num) {
                return false; //Conflict found
            }
        }
    }

    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (board[i][j] == 0) {
                return true;
            }
        }
    }
    complete();
    return true; //No conflicts found

}
//animation for solving
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
//reset grid
function resetGrid() {
    lives = 3;
    wrongInputs = 0;
    const gridSize = 6;
    console.log(currentDifficulty);
    const puzzle = difficulties[currentDifficulty][Math.floor(Math.random() * difficulties[currentDifficulty].length)];
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const field = document.getElementById(`cell-${i}-${j}`);
            if (field) {
                field.value = puzzle[i][j] !== 0 ? puzzle[i][j] : "";
                field.classList.remove("user-input");
                field.style.color = '#1e25e8';
                //   field.classList.remove("output-cell");
            }
        }
    }
}


function gridReset() {
    document.getElementById("resetButton").addEventListener("click", (e) => {
        e.preventDefault(); // Prevents the form from being submitted and page refresh
        resetGrid();
    });
}

function complete() {
    alert("Congratulation !!! You Solved The Game")
}

// Call gridReset to attach the event listener to the resetButton
gridReset();
