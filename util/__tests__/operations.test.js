import operations, { ADD, SUBTRACT } from '../operations';

test('performs addition operation', () => {
  const actual = operations[ADD](5, 6);
  const expected = 11;

  expect(actual).toEqual(expected);
});

test('performs subtration operation', () => {
  const actual = operations[SUBTRACT](12, 7);
  const expected = 5;

  expect(actual).toEqual(actual);
});
