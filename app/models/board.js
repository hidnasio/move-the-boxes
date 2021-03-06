import Ember from 'ember';
import RowEnumerable from 'move-the-boxes/models/board/row-enumerable';
import CellMap from 'move-the-boxes/models/board/cell-map';

const { computed } = Ember;

export default Ember.Object.extend({
  // Attributes
  rowCount: null,
  columnCount: null,

  // Constructor
  init() {
    this._super(...arguments);

    // set default size
    this.set('rowCount', this.get('rowCount') || 5);
    this.set('columnCount', this.get('columnCount') || 5);
  },

  cells: computed(function() {
    return CellMap.create({ board: this });
  }),

  rows: computed('cells', function() {
    return RowEnumerable.create({
      board: this
    });
  }).volatile(),

  pushCell(cell) {
    this.get('cells').push(cell);
  },

  isInsideLimits(row, column) {
    return (row >= 0 && column >= 0) &&
      (row < this.get('rowCount') && column < this.get('columnCount'));
  },

  at(row, column) {
    return this.get('cells').at(row, column);
  },

  targetsFulfilled() {
    let boxes = this.get('cells.data').filterBy('isBox');
    let targets = this.get('cells.data').filterBy('isTarget');

    targets.every((target) => {
      boxes.forEach((box) => box.set('isFulfilled', false));

      boxes
        .filterBy('row', target.get('row'))
        .filterBy('column', target.get('column'))
        .forEach((box) => box.set('isFulfilled', true));
    });

    return targets.every(
      (target) => boxes
        .filterBy('row', target.get('row'))
        .isAny('column', target.get('column'))
    );
  }
});
