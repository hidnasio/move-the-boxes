import Ember from 'ember';
import extendLevel from 'move-the-boxes/models/level';
import {
  createBoard,
  createBox,
  createPlayer,
  createTarget,
  createWall
} from 'move-the-boxes/models/factory';

const { computed } = Ember;

export default extendLevel('tutorial', {
  minMoves: 12,

  board: computed(function() {
    let wall = [
      [0,0], [0,1], [0,2], [0,3], [0,4], [0,5],
      [1,0],               [1,3],        [1,5],
      [2,0],                             [2,5],
                           [3,3],        [3,5],
      [4,0],                             [4,5],
      [5,0], [5,1], [5,2], [5,3], [5,4], [5,5]
    ];

    let board = createBoard(6, 6);

    wall.forEach(([row, column]) => {
      board.pushCell(createWall(row, column));
    });

    board.pushCell(createBox(2, 3));
    board.pushCell(createTarget(3, 1));

    return board;
  }),

  player: computed(function() {
    return createPlayer(3, 0);
  })
});
