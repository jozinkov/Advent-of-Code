let res1 = 0;
let res2 = 0;

const getResults = function (fileData) {
  let [player1, player2] = fileData.split('\n\n').filter(l => l !== '');

  player1 = player1
    .replace('Player 1:\n', '')
    .split('\n')
    .map(n => +n);
  player2 = player2
    .replace('Player 2:\n', '')
    .split('\n')
    .filter(l => l !== '')
    .map(n => +n);

  let player11 = player1.slice();
  let player22 = player2.slice();

  // order of cards each round
  let statesPl1 = [];
  let statesPl2 = [];

  const moveCards = function (winner, loser) {
    winner.push(winner[0]);
    winner.push(loser[0]);
    winner.splice(0, 1);
    loser.splice(0, 1);
  };

  let duplicate = false;

  const combat = function (pl1, pl2) {
    let newDeck1 = pl1.slice(1, pl1[0] + 1);
    let newDeck2 = pl2.slice(1, pl2[0] + 1);
    return play(newDeck1, newDeck2, true);
  };

  let gameResult = undefined;
  const play = function (pl1, pl2, recursive = false) {
    duplicate = false;
    if (recursive) {
      const pl1round = pl1.join(',');
      const pl2round = pl2.join(',');
      // if current state exist, end the game (Player1 WINS)
      if (
        statesPl1.includes(pl1round) &&
        statesPl2.includes(pl2round) &&
        statesPl1.indexOf(pl1round) === statesPl2.indexOf(pl2round)
      ) {
        duplicate = true;
        gameResult = 0;
        return;
      }
      // record new state of both players
      statesPl1.push(pl1round);
      statesPl2.push(pl2round);
    }

    // check for remaining cards in their decks
    // 1) both have at least as many cards as the value of the card they just drew - COMBAT
    if (recursive && pl1[0] <= pl1.length - 1 && pl2[0] <= pl2.length - 1) {
      const states = [statesPl1.slice(), statesPl2.slice()];
      // new game states
      statesPl1 = [];
      statesPl2 = [];
      // start combat
      combat(pl1, pl2);
      if (gameResult === 1 || gameResult === 0) moveCards(pl1, pl2);
      if (gameResult === 2) moveCards(pl2, pl1);
      // bring back previous game states
      statesPl1 = states[0];
      statesPl2 = states[1];
    }
    // 2) higher-value card determines the winner
    else {
      if (pl1[0] > pl2[0]) moveCards(pl1, pl2);
      else moveCards(pl2, pl1);
    }

    if (pl1.length > 0 && pl2.length > 0 && !recursive) play(pl1, pl2);
    else if (pl1.length > 0 && pl2.length > 0 && recursive)
      play(pl1, pl2, true);
    else {
      gameResult = pl1.length === 0 ? 2 : 1;
      return;
    }
  };

  // calculate the winning player's score
  const winnerScore = function (pl1, pl2) {
    const winner = pl1.length === 0 ? pl2 : pl1;
    winner.reverse();
    let result = 0;
    for (let i = 0; i < winner.length; i++) {
      result += winner[i] * (i + 1);
    }
    return result;
  };

  // NORMAL GAME
  play(player1, player2);
  res1 = winnerScore(player1, player2);

  // RECURSIVE GAME
  play(player11, player22, true);
  if (duplicate) {
    player11.reverse();
    for (let i = 0; i < player11.length; i++) {
      res2 += player11[i] * (i + 1);
    }
  } else res2 = winnerScore(player11, player22);
};
export { getResults, res1, res2 };
