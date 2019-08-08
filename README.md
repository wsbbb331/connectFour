# Assumption
* the first player plays yellow (in reality first player can choose color).
* The game has 6 rows and 7 columns

# Installation
`npm i`

# Test
`npm test` fully randomized. 100% code coverage.

# Run
`npm start` will start an interactive session to run commands

Note that `None` in problem statement is `null` for javascript.

# Optimization
* `getCurrentPlayer`, `play` and `hasWinner` should assert if current game state is valid. I added `return false` if such case happened.
* `play` will return false if the game already has a winner or the wrong player is playing.
* A real gameplay should keep track of game state and relevant fields, so that we only need to check if new state change is valid.
* `play` shouldn't take color because from game state, it is able to automatically infer color, unless it's the first step.
* `isStateValid` should return a "not valid" reason if the game state is not valid. This can increase reliability of tests (we can know for what exact reason the test fails and if it is the expected one).