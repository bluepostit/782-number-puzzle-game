// 1. Find the element
const button = document.querySelector('#show-hint');
// console.log(button);

// 2. Choose the event type
button.addEventListener('click', (event) => {
  // 3. Code the callback function
  // Toggle the hint!
  const hint = document.querySelector('.hint');
  hint.classList.toggle('active');
});

// Without refactoring:
// const areAdjacent = (cell1, cell2) => {
//   const cell1row = cell1.cellIndex;
//   const cell1column = cell1.parentElement.rowIndex;
//   const cell2row = cell2.cellIndex;
//   const cell2column = cell2.parentElement.rowIndex;

//   if (cell1row === cell2row) {
//     if (cell1column - cell2column === 1 || cell1column - cell2column === -1) {
//       return true;
//     } else {
//       return false;
//     }
//   } else if (cell1column === cell2column) {
//     if (cell1row - cell2row === 1 || cell1row - cell2row === -1) {
//       return true;
//     } else {
//       return false;
//     }
//   }
// }

// Refactored:
const areAdjacent = (cell1, cell2) => {
  const cell1row = cell1.cellIndex;
  const cell1column = cell1.parentElement.rowIndex;
  const cell2row = cell2.cellIndex;
  const cell2column = cell2.parentElement.rowIndex;

  if (cell1row === cell2row) {
    // Math.abs - absolute value ('force it to be positive')
    return Math.abs(cell1column - cell2column) === 1
  } else if (cell1column === cell2column) {
    return Math.abs(cell1row - cell2row) === 1
  }
  // If we got here, it's not adjacent at all!
  return false
}

const hasWon = () => {
  const tiles = document.querySelectorAll('td');
  const numbers = Array.from(tiles).map(e => Number.parseInt(e.innerHTML, 10))
  return numbers.join() === '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,NaN'
}

const tiles = document.querySelectorAll('td');
// console.log(tiles);

tiles.forEach((tile) => {
  tile.addEventListener('click', (event) => {
    const clickedTile = event.currentTarget;
    console.log(`cellIndex: ${clickedTile.cellIndex}`);
    console.log(`rowIndex: ${clickedTile.parentElement.rowIndex}`)
    const emptyTile = document.querySelector('td.empty');

    if (areAdjacent(clickedTile, emptyTile)) {
      emptyTile.classList.remove('empty');
      emptyTile.innerText = clickedTile.innerText;

      clickedTile.classList.add('empty');
      clickedTile.innerText = '';

      if (hasWon()) {
        alert('You win!');
      }
    }
  })
})


// when a tile is clicked:
//   if empty tile is adjacent:
//     get x and y of the clicked tile
//     get x and y of the empty tile
//
//     empty tile ->
//        remove the .empty class!
//        add the number from the clicked tile
//     clicked tile
//        add the .empty class
//        remove the number


// is the tile adjacent to the empty tile?
//   if they share the same row,
//      they must have column difference of 1
//   if they share the same column,
//      they must have row difference of 1
