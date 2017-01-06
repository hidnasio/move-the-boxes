import Ember from 'ember';
import Level from 'move-the-boxes/models/level';
import Forgery from 'move-the-boxes/mixins/forgery';

const { computed } = Ember;

const MAP = `
XXXXXXX
X. X .X
X * * X
X@w w X
X *   X
X  X .X
XXXXXXX
`;

export default Level.extend(Forgery, {
  minMoves: 29,

  board: computed(function() {
    return this.boardFromString(MAP);
  }),

  player: computed(function() {
    return this.playerFromString(MAP);
  })
});
