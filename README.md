# Assumption
Assume the first player plays yellow. (in reality first player can choose color).

# Installation

`npm i`

# Test
`npm test` fully randomized. 100% code coverage.

# Run
`npm start` will start an interactive session to run commands
Note that `None` in problem statement is `null` for javascript.

# Optimization
* `get_current_player` and `play` should assert if current game state is valid. I added `return false` if such case happened.
* Current game play should keep track of game state and relevant fields, so that we only need to check new state change is valid.
* `play` shouldn't take color because from game state it should automatically infer color, unless it's the first step.