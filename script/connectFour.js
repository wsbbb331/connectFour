const repl = require('repl');
const { isStateValid, play, getCurrentPlayer, hasWinner } = require('../src/controller.js');
console.log("Welcome to Connect Four game! Here are the available functions!");
console.log("isStateValid(gameState)");
console.log("play(gameState, col, color)");
console.log("getCurrentPlayer(gameState)");
console.log("hasWinner(gameState)");
const r = repl.start('> ');

r.context.isStateValid = isStateValid;
r.context.play = play;
r.context.getCurrentPlayer = getCurrentPlayer;
r.context.hasWinner = hasWinner;
