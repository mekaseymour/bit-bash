import resolveEquation from '../resolveEquation';

test('returns result of addition operation', () => {
  const actual = resolveEquation({ num: 4 }, { num: 5 }, '+');
  const expected = 9;

  expect(actual).toEqual(expected);
});

test('returns result of subtraction operation', () => {
  const actual = resolveEquation({ num: 10 }, { num: 2 }, '-');
  const expected = 8;

  expect(actual).toEqual(expected);
});

test('returns result of multiplication operation rounded to the nearest two decimals', () => {
  const actual = resolveEquation({ num: 2 }, { num: 3 }, '×');
  const expected = 6;

  expect(actual).toEqual(expected);
});

test('returns result of division operation rounded to the nearest two decimals', () => {
  const actual = resolveEquation({ num: 20 }, { num: 6 }, '÷');
  const expected = 3.33;

  expect(actual).toEqual(expected);
});
