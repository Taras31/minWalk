function minWalk(gridList, startX, startY, endX, endY) {
    let cellsProp = getCellsValue(gridList);
    if (!cellsProp) return 'Error row';
    let begin = gridStay(gridList, startX, startY);
    let stop = gridStay(gridList, endX, endY);
    if (!begin) return 'Error begin';
    if (!stop) return 'Error end';
    if (cellsProp[startX][startY] !== '.') return 'Start cell is not available';
    if (cellsProp[endX][endY] !== '.') return 'End cell is not available';
    let cells = getNumCells(gridList, cellsProp, startX, startY, endX, endY);
    if (!cells) return 'Destination cell is not available';
    return takeAllSteps(cells);
}

// Array with input data.
function getCellsValue(gridList) {
    let cellsProp = [];
    let cellsLine = [];
    if (!Array.isArray(gridList)) return;
    if (gridList.length === 1 || gridList.length >= 100) return;
  
    for (let i = 0; i < gridList.length; i++) {
      cellsLine = gridList[i].split(''); cellsProp[i] = [];
      if (cellsLine.length !== gridList.length) return;
      if (i > 0 && cellsLine.length !== cellsProp[i - 1].length) return;
  
      for (let j = 0; j < cellsLine.length; j++) {
        let cellsVal = cellsLine[j];
        if (cellsVal !== '.' && cellsVal !== 'X') return;
        cellsProp[i][j] = cellsVal;
      }
    }
    return cellsProp;
  }

// Check x, y coordinates in the grid.
function gridStay(gridList, x, y) {
    let maxY = gridList[0].split('').length - 1;
    let maxX = gridList.length - 1;
    if (typeof x !== 'number' || typeof y !== 'number') return false;
    if (y > maxY || y < 0) return false;
    if (x > maxX || x < 0) return false;
    return true;
  }

// Add numbers to cells needed for walking.
function getNumCells(gridList, cellsProp, startX, startY, endX, endY) {
    let counts = false;
    let cells = [{y: startY, x: startX}];
    let cellNumber = 0;
  
    while (!counts) {
      if (!cells[cellNumber]) return;
      let x = cells[cellNumber].x;
      let y = cells[cellNumber].y;
      verifyCell(gridList, x - 1, y, cells, cellsProp);
      verifyCell(gridList, x, y + 1, cells, cellsProp);
      verifyCell(gridList, x + 1, y, cells, cellsProp);
      verifyCell(gridList, x, y - 1, cells, cellsProp);
      verifyCell(gridList, x - 1, y - 1, cells, cellsProp);
      verifyCell(gridList, x - 1, y + 1, cells, cellsProp);
      verifyCell(gridList, x + 1, y + 1, cells, cellsProp);
      verifyCell(gridList, x + 1, y - 1, cells, cellsProp);
      let a = cells.find(cell => cell.x === endX && cell.y === endY);
      if (a) counts = true;
      cellNumber++;
    }
    return cells;
  }

// Function for checking cell numbering.
function verifyCell(gridList, x, y, cells, cellsProp) {
  let inner = gridStay(gridList, x, y);
  if (!inner) return;
  if (cellsProp[x][y] === 'X') return;
  let found = cells.find(cell => cell.x === x && cell.y === y);
  if (found) return;
  cells[++counter] = { x, y };
}

let counter = 0;

// Function returns the number of steps to the destination cell.
function takeAllSteps(cells) {
    let way = [...cells]; way[0].steps = 0;
  
    for (let i = 1; i < way.length; i++) {
      let y = way[i].y;
      let x = way[i].x;
      let moveArr = [];
      moveArr = takeArrSteps(x - 1, y, way, moveArr);
      moveArr = takeArrSteps(x, y + 1, way, moveArr);
      moveArr = takeArrSteps(x + 1, y, way, moveArr);
      moveArr = takeArrSteps(x, y - 1, way, moveArr);
      moveArr = takeArrSteps(x - 1, y - 1, way, moveArr);
      moveArr = takeArrSteps(x - 1, y + 1, way, moveArr);
      moveArr = takeArrSteps(x + 1, y + 1, way, moveArr);
      moveArr = takeArrSteps(x + 1, y - 1, way, moveArr);
      way[i].steps = Math.min(...moveArr) + 1;
    }
    return way[way.length - 1].steps;
  }

// To prepare array with steps.
function takeArrSteps(x, y, way, moveArr) {
    let found = way.find(cell => cell.x === x && cell.y === y);
    if (!found || (found.steps !== 0 && !found.steps)) return moveArr;
    moveArr.push(found.steps);
    return moveArr;
  }

let result = minWalk(
[
'.X.',
'.X.',
'...',
], 
2, 1,
0, 2
);

let resultNumber = document.getElementById('result'); resultNumber.textContent = result;