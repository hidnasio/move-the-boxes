import Ember from 'ember';
import extendLevel from 'move-the-boxes/models/level';
import Forgery from 'move-the-boxes/mixins/forgery';

const { computed } = Ember;

const MAP = `
~~~~~~~~XXXXXXXX~
~~~~~~~~X     @X~
~~~~~~~~X *X* XX~
~~~~~~~~X *  *X~~
~~~~~~~~XX* * X~~
XXXXXXXXX * X XXX
X....  XX *  *  X
XX...    *  *   X
X....  XXXXXXXXXX
XXXXXXXX~~~~~~~~~
`;

export default extendLevel('pollock', Forgery, {
  minMoves: 13,
  zoom: 0.6,

  board: computed(function() {
    return this.boardFromString(MAP);
  }),

  player: computed(function() {
    return this.playerFromString(MAP);
  })
});
