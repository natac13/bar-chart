import Immutable from 'immutable';

export default function blankGrid(rows, cols) {
  return Immutable.List(Array(rows).fill()).map(
    () => Immutable.List(Array(cols).fill(false))
  );
}
