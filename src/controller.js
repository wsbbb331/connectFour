const countColors = function(gameState) {
  const colorCounter = { "y": 0, "r": 0 };
  for (let i = 0; i < gameState.length; i++) {
    for (let j = 0; j < gameState[i].length; j++) {
      if(gameState[i][j] !== null) {
        if(!["y", "r"].includes(gameState[i][j])) {
          throw Error(`Unknown color ${gameState[i][j]} exists in the state`);
        }
        colorCounter[gameState[i][j]] += 1;
      }
    }
  }
  if (colorCounter.y - colorCounter.r > 1 || colorCounter.y - colorCounter.r < 0) {
    throw Error(`Disc count differences are wrong. colorCounter: ${JSON.stringify(colorCounter)}`);
  }
  return colorCounter;
};

const isStateValid = function (gameState) {
  try {
    if (gameState.length !== 6) {
      throw Error(`the game state doesn't have 6 rows. It has ${gameState.length}`);
    }
    for (let i = 0; i < 6; i++) {
      if (gameState[i].length !== 7) {
        throw Error(`the game state doesn't have 7 columns. It has ${gameState[i].length} on row ${i}`);
      }
    }
    countColors(gameState);
    for (let j = 0; j < 7; j++) {
      let belowIsStacked = gameState[5][j] !== null;
      for (let i = 4; i >= 0; i--) {
        if(belowIsStacked) {
          if(gameState[i][j] === null) {
            belowIsStacked = false;
          }
        } else {
          if(gameState[i][j] !== null) {
            throw Error(`There's a disc floating above air at column ${j}`);
          }
        }
      }
    }
  } catch (err) {
    console.error(err);
    return false;
  }
  return true;
};

const getCurrentPlayer = function (gameState) {
  if (!isStateValid(gameState)) return false;
  const colorCounts = countColors(gameState);
  return colorCounts.r === colorCounts.y ? "y" : "r";
};

const isConnected = function(gameState, rowStart, colStart, rowIncrement, colIncrement) {
  let currentColor = gameState[rowStart][colStart];
  let counter = 1;
  for (let i = rowStart + rowIncrement, j = colStart + colIncrement;
    j < 7 && j >= 0 && i >= 0 && i < 6;
    j += colIncrement, i += rowIncrement) {
    if (gameState[i][j] !== null && currentColor === gameState[i][j]) {
      counter += 1;
    } else {
      currentColor = gameState[i][j];
      counter = 1;
    }
    if (counter >= 4) {
      return true;
    }
  }
}

const hasWinner = function(gameState) {
  if (!isStateValid(gameState)) return false;
  // horizontal
  for(let i = 0; i < 6; i++) {
    if(isConnected(gameState, i, 0, 0, 1)) return true;
  }
  // vertical
  for (let j = 0; j < 7; j++) {
    if (isConnected(gameState, 0, j, 1, 0)) return true;
  }
  //left diagonal (bottom left to upper right)
  let leftStartCoordiates = [[3, 0], [4, 0], [5, 0], [5, 1], [5, 2], [5, 3]];
  for (let index = 0; index < leftStartCoordiates.length; index++) {
    let [i, j] = leftStartCoordiates[index];
    if (isConnected(gameState, i, j, -1, 1)) return true;
  }

  //right diagonal (bottom right to upper left)
  let rightStartCoordinates = [[3, 6], [4, 6], [5, 6], [5, 5], [5, 4], [5, 3]];
  for (let index = 0; index < rightStartCoordinates.length; index++) {
    let [i, j] = rightStartCoordinates[index];
    if (isConnected(gameState, i, j, -1, -1)) return true;
  }
  return false;
};

const play = function (gameState, col, color) {
  if (!isStateValid(gameState)) return false;
  try {
    if (hasWinner(gameState)) {
      throw Error("The game already has a winner");
    }
    if (col > 6 || col < 0) {
      throw Error(`column number ${col} out of range`);
    }
    if (!["y", "r"].includes(color)) {
      throw Error(`color has to be y or r. This color is ${color}.`);
    }
    let currentPlayer = getCurrentPlayer(gameState);
    if (color !== currentPlayer) {
      throw Error(`current player is ${currentPlayer}. You are ${color}.`);
    }
    for (let i = 5; i >= 0; i--) {
      if (gameState[i][col] === null) {
        gameState[i][col] = color;
        return gameState;
      }
    }
    throw Error("This column is already full");
  } catch (err) {
    console.error(err);
    return false;
  }
};

module.exports = {
  isStateValid: isStateValid,
  getCurrentPlayer: getCurrentPlayer,
  play: play,
  hasWinner: hasWinner,
};