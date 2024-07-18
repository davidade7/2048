const newGame = document.querySelector('#new-game');
const game = document.querySelector('#game');
const scoreDisplay = document.querySelector('#score-number');
const messageDisplay = document.querySelector('#message-display');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let score = 0
let grid = [["","","",""],["","","",""],["","","",""],["","","",""]]
// let grid = [[2,"","",""],[2,"","",""],[4,"","",""],[4,"","",""]]


// Function to return a random number between 0 and 3
const randomNum = () => {
  const number = Math.floor(Math.random() * 4);
  // console.log("Random Number >>", number);
  return number
}

// Function to add a square to the grid
const addSquare = () => {
  let row = randomNum();
  let col = randomNum();

  while (grid[row][col] !== "") {
    row = randomNum();
    col = randomNum();
  }
  cell = document.querySelector(`#cell-${row}-${col}`);
  cell.innerText = 2;

  grid[row][col] = 2;
}

// Function to reset the grid and the screen
const resetGrid = () => {
  // Reset the grid
  grid = [["","","",""],["","","",""],["","","",""],["","","",""]];

  // Reset the screen
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const cell = document.querySelector(`#cell-${i}-${j}`);
      cell.innerText = "";
    }
  }

  // Reset the score
  score = 0;
  scoreDisplay.innerText = score;
}

// Function to update the score
const updateScore = (scoreToAdd) => {
  score += scoreToAdd;
  scoreDisplay.innerText = score; 
}

// Function to compare two 2D arrays
const compareArrays = (array1, array2) => {
  for (let i = 0; i < array1.length; i++) {
    for (let j = 0; j < array1[i].length; j++) {
      if (array1[i][j] !== array2[i][j]) {
        return false;
      }
    }
  }
  return true
}

// Function to move the squares down to clear the spaces
const moveDownClearSpaces = () => {
  console.log("Move Down")
  for (let j = 0 ; j < 4; j++) {
    // Check if the column is empty
    let empty = true;
    for (let i = 0; i < 4; i++) {
      if (grid[i][j] !== "") {
        empty = false;
      }
    }
    // Switch to the next column if the current one is empty
    if (empty) {
      continue;
    }
    
    // Begin the movement
    for (let i = 3; i > 0; i--) {
      // Check if the cell is empty
      if (grid[i][j] === "") {

        // Check the cells above
        for (let k = i - 1; k >= 0; k--) {
          if (grid[k][j] !== "") {
            // Swap the cells
            grid[i][j] = grid[k][j];
            grid[k][j] = "";
            // Update the screen
            cell = document.querySelector(`#cell-${i}-${j}`);
            cell.innerText = grid[i][j];
            cell = document.querySelector(`#cell-${k}-${j}`);
            cell.innerText = grid[k][j];
            break;
          } 
          // The cell is empty
          else {
            continue;
          }
        }
      } 
      // The cell is not empty, so continue
      else {
        continue
      }
    }
  }
}

// Function to move the squares up to clear the spaces
const moveUpClearSpaces = () => {
  console.log("Move Up")
  for (let j = 0 ; j < 4; j++) {
    // Check if the column is empty
    let empty = true;
    for (let i = 0; i < 4; i++) {
      if (grid[i][j] !== "") {
        empty = false;
      }
    }
    // Switch to the next column if the current one is empty
    if (empty) {
      continue;
    }
    
    // Begin the movement
    for (let i = 0; i < 4; i++) {
      // Check if the cell is empty
      if (grid[i][j] === "") {

        // Check the cells below
        for (let k = i + 1; k < 4; k++) {
          if (grid[k][j] !== "") {
            // Swap the cells
            grid[i][j] = grid[k][j];
            grid[k][j] = "";
            // Update the screen
            cell = document.querySelector(`#cell-${i}-${j}`);
            cell.innerText = grid[i][j];
            cell = document.querySelector(`#cell-${k}-${j}`);
            cell.innerText = grid[k][j];
            break;
          } 
          // The cell is empty
          else {
            continue;
          }
        }
      } 
      // The cell is not empty, so continue
      else {
        continue
      }
    }
  }
}

// Function for DOWN movement
const moveDown = () => {
  let tempGrid = JSON.parse(JSON.stringify(grid))
  
  // #1 - Move the squares down
  moveDownClearSpaces();

  // #2 - Merge the squares
  for (let j = 0; j < 4; j++) {
    for (let i = 3; i > 0; i--) {
      if (grid[i][j] === grid[i-1][j] && grid[i][j] !== "") {
        grid[i][j] = grid[i][j] * 2;
        grid[i-1][j] = "";
        // Update the screen
        cell = document.querySelector(`#cell-${i}-${j}`);
        cell.innerText = grid[i][j];
        cell = document.querySelector(`#cell-${i-1}-${j}`);
        cell.innerText = "";
        // Update the score
        updateScore(grid[i][j]);
      }
    }
  }

  // #3 - Move the squares down
  moveDownClearSpaces();

  // #4 - Add a new square only if the grid has changed
  if (compareArrays(grid, tempGrid)) {
    console.log("Down movement not possible")
    messageDisplay.innerText = "Down movement not possible"
  } else {
    addSquare()
    messageDisplay.innerText = ""
  }
}

// Function for UP movement
const moveUp = () => {
  let tempGrid = JSON.parse(JSON.stringify(grid))

  // #1 - Move the squares up
  moveUpClearSpaces()

  // #2 - Merge the squares
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      if (grid[i][j] === grid[i+1][j] && grid[i][j] !== "") {
        grid[i][j] = grid[i][j] * 2;
        grid[i+1][j] = "";
        // Update the screen
        cell = document.querySelector(`#cell-${i}-${j}`);
        cell.innerText = grid[i][j];
        cell = document.querySelector(`#cell-${i+1}-${j}`);
        cell.innerText = "";
        // Update the score
        updateScore(grid[i][j]);
      }
    }
  }

  // #3 - Move the squares up
  moveUpClearSpaces()

  // #4 - Add a new square only if the grid has changed
  if (compareArrays(grid, tempGrid)) {
    console.log("Up movement not possible")
    messageDisplay.innerText = "Up movement not possible"
  } else {
    addSquare()
    messageDisplay.innerText = ""
  }
}


newGame.addEventListener('click', () => {
  console.log("-----------------------")
  console.log("New Game");
  // reset
  resetGrid()

  // Add first square
  addSquare();
  console.log("Grid >>", grid)
});

// ------------------- MOVE DOWN -------------------
// Move Down when the down button is clicked
btnDown.addEventListener('click', () => {
  moveDown();
})
// Move Down when the down arrow key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowDown") {
    moveDown();
  }
})

// ------------------- MOVE UP -------------------
// Move Up when the up button is clicked
btnUp.addEventListener('click', () => {
  moveUp();
})
// Move Up when the up arrow key is pressed
document.addEventListener('keydown', (event) => {
  if (event.key === "ArrowUp") {
    moveUp();
  }
})
