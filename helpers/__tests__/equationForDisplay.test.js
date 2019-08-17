import equationForDisplay from '../equationForDisplay';

test('given a valid equation array of length one returns correctly formatted equation for display', () => {
  const equation = [{ id: 1, num: 5, size: 20 }];
  const actual = equationForDisplay(equation);
  const expected = '5';

  expect(actual).toEqual(expected);
});

test('given a valid equation array of length two returns correctly formatted equation for display', () => {
  const equation = [{ id: 1, num: 5, size: 20 }, '+'];
  const actual = equationForDisplay(equation);
  const expected = '5 +';

  expect(actual).toEqual(expected);
});

test('given a valid equation array of length three returns correctly formatted equation for display', () => {
  const equation = [{ id: 1, num: 5, size: 20 }, '+', { id: 2, num: 10, size: 40 }];
  const actual = equationForDisplay(equation);
  const expected = '5 + 10';

  expect(actual).toEqual(expected);
});
