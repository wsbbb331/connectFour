const { assert } = require('chai');
const controller = require('../src/controller.js');

const buildGameState = function () {
  return [
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, "y", "r", null, null, null],
    [null, null, "r", "y", null, null, null],
    ["r", "y", "y", "y", "r", "r", "y"],
    ["r", "r", "y", "y", "r", "y", "r"],
  ];
};

describe('ConnectFour', () => {
  describe('#isStateValid', async () => {
    it('returns true when given a valid game state', async () => {
      const gameState = buildGameState();
      assert.isTrue(controller.isStateValid(gameState));
    });

    it('returns false when given the game state contains a floating disc', async () => {
      const gameState = buildGameState();
      gameState[0][0] = "y";
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when given the game state contains a floating disc on an empty col', async () => {
      const gameState = buildGameState();
      gameState[1][0] = "y";
      gameState[1][4] = null;
      gameState[1][5] = null;
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when given the game state contains an unknown color', async () => {
      const gameState = buildGameState();
      gameState[2][2] = "bad";
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the disc counts of the two colors are different (too many reds)', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "r";
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the disc counts of the two colors are different (too many yellow)', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "y";
      gameState[2][0] = "y";
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the game state has more than 6 rows', async () => {
      const gameState = buildGameState();
      gameState.push([null, null, null, null, null, null, null]);
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the game state has less than 6 rows', async () => {
      let gameState = buildGameState();
      gameState.pop();
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the game state has less more 7 col in certain row', async () => {
      const gameState = buildGameState();
      gameState[0].push("r");
      assert.isFalse(controller.isStateValid(gameState));
    });

    it('returns false when the game state has less than 7 col in certain row', async () => {
      const gameState = buildGameState();
      gameState[0].pop();
      assert.isFalse(controller.isStateValid(gameState));
    });
  });

  describe('#getCurrentPlayer', async () => {
    it('returns yellow when there are same number of yellow and red', async () => {
      const gameState = buildGameState();
      assert.equal(controller.getCurrentPlayer(gameState), 'y');
    });

    it('returns red when there are one more yellow than red', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "y";
      assert.equal(controller.getCurrentPlayer(gameState), 'r');
    });

    it('returns false when game state is invalid', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "r";
      assert.isFalse(controller.getCurrentPlayer(gameState));
    });
  });

  describe('#play', async () => {
    it('returns new game state after insert a new plate', async () => {
      const gameState = buildGameState();
      const nextGameState = controller.play(gameState, 0, "y");
      assert.deepEqual(nextGameState, [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "r", null, null, null],
        ["y", null, "r", "y", null, null, null],
        ["r", "y", "y", "y", "r", "r", "y"],
        ["r", "r", "y", "y", "r", "y", "r"],
      ]);
    });

    it('returns false when game state is invalid', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "r";
      assert.isFalse(controller.play(gameState, 0, "y"));
    });

    it('returns false when the game already has a winner', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "r", null, null, null],
        [null, null, "r", "y", null, null, null],
        ["r", "y", "y", "y", "y", "r", "r"],
        ["r", "r", "y", "y", "r", "y", "r"],
      ];
      assert.isFalse(controller.play(gameState, 0, "y"));
    });

    it('returns false when column input is negative', async () => {
      const gameState = buildGameState();
      assert.isFalse(controller.play(gameState, -1, "y"));
    });

    it('returns false when column input is out of bound', async () => {
      const gameState = buildGameState();
      assert.isFalse(controller.play(gameState, 7, "y"));
    });

    it('returns false when the color is neither yellor or red', async () => {
      const gameState = buildGameState();
      assert.isFalse(controller.play(gameState, 0, "bad"));
    });

    it('returns false when the wrong player is playing', async () => {
      const gameState = buildGameState();
      assert.isFalse(controller.play(gameState, 0, "r"));
    });

    it('returns false when the column is already full', async () => {
      const gameState = buildGameState();
      gameState[1][2] = "y";
      gameState[0][2] = "r";
      assert.isFalse(controller.play(gameState, 2, "y"));
    });
  });

  describe('#hasWinner', async () => {
    it('returns false when there are no winners yet', async () => {
      const gameState = buildGameState();
      assert.isFalse(controller.hasWinner(gameState));
    });

    it('returns false when the game state is not valid', async () => {
      const gameState = buildGameState();
      gameState[3][0] = "r";
      assert.isFalse(controller.hasWinner(gameState));
    });

    it('returns true when there are four yellows horizontally', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "r", null, null, null],
        [null, null, "r", "y", null, null, null],
        ["r", "y", "y", "y", "y", "r", "r"],
        ["r", "r", "y", "y", "r", "y", "r"],
      ];
      assert.isTrue(controller.hasWinner(gameState));
    });

    it('returns true when there are five yellows horizontally', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "r", null, null, null],
        [null, null, "r", "y", null, null, null],
        ["r", "y", "y", "y", "y", "y", "r"],
        ["r", "r", "y", "y", "r", "r", "r"],
      ];
      assert.isTrue(controller.hasWinner(gameState));
    });

    it('returns true when there are four yellows vertically', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "r", "y", null, null, null],
        [null, null, "r", "y", null, null, null],
        ["r", "y", "y", "y", "r", "r", "y"],
        ["r", "r", "y", "y", "r", "y", "r"],
      ];
      assert.isTrue(controller.hasWinner(gameState));
    });

    it('returns true when there are four yellows left diagonally', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "r", null, null, null],
        [null, null, "r", "y", null, null, null],
        ["r", "r", "y", "y", "y", "r", "r"],
        ["r", "y", "y", "y", "r", "y", "r"],
      ];
      assert.isTrue(controller.hasWinner(gameState));
    });

    it('returns true when there are four reds right diagonally', async () => {
      const gameState = [
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, "y", "y", "y", null, null],
        [null, null, "r", "y", "r", null, null],
        ["r", "r", "y", "y", "y", "r", "r"],
        ["y", "r", "y", "r", "r", "y", "r"],
      ];
      assert.isTrue(controller.hasWinner(gameState));
    });
  });
})