export const gameIsInCompletedState = nodes => nodes.length === 1;
export const gameIsInWinningState = (game, nodes) => gameIsInCompletedState(nodes) && nodes[0].num === game.target;
