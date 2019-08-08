const repl = require('repl');
const { isStateValid, play, getCurrentPlayer } = require('../src/controller.js');
const r = repl.start('> ');
r.context.isStateValid = isStateValid;
r.context.play = play;
r.context.getCurrentPlayer = getCurrentPlayer;
