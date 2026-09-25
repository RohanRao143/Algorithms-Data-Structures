/**
 * 36. Valid Sudoku
Solved
Medium
Topics
premium lock icon
Companies
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.
 

Example 1:


Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    const rowTrack = {}, columnTrack = {}, cellTrack = {};

    function validSudoku(board) {
        let i = 0;
        let valid  = true;
        while (i < board.length) {
            let j = 0;
            while (j < board[i].length) {
                if (board[i][j] == '.') {
                } else {
                    const key = JSON.stringify(getBlock([i+1, j+1]));
                    if ((rowTrack[i+1] && rowTrack[i+1].indexOf(board[i][j]) > -1) ||
                    (columnTrack[j+1] && columnTrack[j+1].indexOf(board[i][j]) > -1) ||
                    (cellTrack[key] && cellTrack[key].indexOf(board[i][j]) > -1)
                    ) {
                        console.log(board[i][j], getBlock([i+1, j+1]), rowTrack, columnTrack, cellTrack, i, j)
                        valid = false;
                        break;
                    }
            
            
                    if (rowTrack[i+1]) {
                        rowTrack[i+1].push(board[i][j])
                    } else {
                        rowTrack[i+1] = [board[i][j]]
                    }
            
                    if (columnTrack[j+1]) {
                        columnTrack[j+1].push(board[i][j])
                    } else {
                        columnTrack[j+1] = [board[i][j]]
                    }
            
                    if (cellTrack[key]) {
                        cellTrack[key].push(board[i][j]);
                    } else {
                        cellTrack[key] = [board[i][j]];
                    }
                }
                j++;
            }

            if (!valid) {
                break;
            }
            i++;
        }

        return valid;
    }

    var getBlock = function(cell) {
        return [Math.ceil(cell[0]/3), Math.ceil(cell[1]/3)];
    }
    return validSudoku(board);
};

