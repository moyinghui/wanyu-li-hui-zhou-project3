/**
 * Sudoku Puzzle Generator
 * Generates valid Sudoku puzzles with unique solutions
 */

// Helper function to clone a 2D array
function clone2D(array) {
    return array.map((row) => [...row]);
}

// Get block dimensions based on grid size
function getBlockDimensions(size) {
    if (size === 6) {
        return { blockRows: 2, blockCols: 3 };
    }
    return { blockRows: 3, blockCols: 3 };
}

// Check if placing num at (row, col) is valid
function isSafe(board, row, col, num, size) {
    const { blockRows, blockCols } = getBlockDimensions(size);

    // Check row
    for (let c = 0; c < size; c++) {
        if (board[row][c] === num) return false;
    }

    // Check column
    for (let r = 0; r < size; r++) {
        if (board[r][col] === num) return false;
    }

    // Check sub-grid
    const startRow = row - (row % blockRows);
    const startCol = col - (col % blockCols);
    for (let r = startRow; r < startRow + blockRows; r++) {
        for (let c = startCol; c < startCol + blockCols; c++) {
            if (board[r][c] === num) return false;
        }
    }

    return true;
}

// Solve Sudoku using backtracking
function solveSudoku(board, size) {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (board[row][col] === 0) {
                // Try numbers 1 to size
                const numbers = Array.from({ length: size }, (_, i) => i + 1);
                // Shuffle for variety
                for (let i = numbers.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
                }

                for (const num of numbers) {
                    if (isSafe(board, row, col, num, size)) {
                        board[row][col] = num;
                        if (solveSudoku(board, size)) {
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
}

// Count number of solutions (used to ensure uniqueness)
function countSolutions(board, size, limit = 2) {
    let count = 0;

    function backtrack() {
        if (count >= limit) return;

        let row = -1;
        let col = -1;

        outer: for (let r = 0; r < size; r++) {
            for (let c = 0; c < size; c++) {
                if (board[r][c] === 0) {
                    row = r;
                    col = c;
                    break outer;
                }
            }
        }

        if (row === -1) {
            count++;
            return;
        }

        for (let num = 1; num <= size; num++) {
            if (isSafe(board, row, col, num, size)) {
                board[row][col] = num;
                backtrack();
                board[row][col] = 0;
                if (count >= limit) return;
            }
        }
    }

    backtrack();
    return count;
}

// Generate a complete solved Sudoku board
function generateSolution(size) {
    const board = Array(size)
        .fill(null)
        .map(() => Array(size).fill(0));

    // Fill diagonal blocks first (they are independent)
    const { blockRows, blockCols } = getBlockDimensions(size);
    const numbers = Array.from({ length: size }, (_, i) => i + 1);

    for (let block = 0; block < size; block += blockCols) {
        const shuffled = [...numbers];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }

        let idx = 0;
        for (let r = 0; r < blockRows; r++) {
            for (let c = 0; c < blockCols; c++) {
                board[block + r][c] = shuffled[idx++];
            }
        }
    }

    // Solve the rest
    solveSudoku(board, size);
    return board;
}

// Generate a puzzle from a solution by removing cells
function generatePuzzle(solution, cluesCount) {
    const size = solution.length;
    const totalCells = size * size;
    const board = clone2D(solution);

    // Create shuffled list of all cell indices
    const indices = Array.from({ length: totalCells }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const maxToRemove = totalCells - cluesCount;
    let removed = 0;

    for (const idx of indices) {
        if (removed >= maxToRemove) break;

        const r = Math.floor(idx / size);
        const c = idx % size;

        if (board[r][c] === 0) continue;

        const backup = board[r][c];
        board[r][c] = 0;

        const temp = clone2D(board);
        const solutions = countSolutions(temp, size, 2);

        if (solutions !== 1) {
            // Not unique, restore the cell
            board[r][c] = backup;
        } else {
            removed++;
        }
    }

    return board;
}

/**
 * Generate a Sudoku puzzle
 * @param {string} difficulty - "EASY" or "NORMAL"
 * @returns {Object} { board: number[][], solution: number[][] }
 */
export function generateSudokuPuzzle(difficulty) {
    const isEasy = difficulty === "EASY";
    const size = isEasy ? 6 : 9;
    const cluesCount = isEasy ? 18 : 30;

    // Generate solution
    const solution = generateSolution(size);

    // Generate puzzle from solution
    const board = generatePuzzle(solution, cluesCount);

    return { board, solution };
}



