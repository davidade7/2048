const newGame = document.querySelector('#new-game');
const game = document.querySelector('#game');
const score = document.querySelector('#score-number');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');


let grid = [["","","",""],["","","",""],["","","",""],["","","",""]]
// const grid = [[2,4,"",8],[2,4,16,""],["",4,"",8],[2,"","",""]]


// Function to return a random number between 0 and 3
const randomNum = () => {
  const number = Math.floor(Math.random() * 4);
  console.log("Random Number >>", number);
  return number
}


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

btnDown.addEventListener('click', () => {
  console.log("bas")
  
  // #1 - Move the squares down
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

  // #2 - Merge the squares


  // #3 - Move the squares down


  // #4 - Add a new square
  // addSquare()
})