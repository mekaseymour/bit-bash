import furthestCompletedLevel from '../furthestCompletedLevel';

test('given context with non-empty array of completed levels returns last level in array', () => {
  const context = {
    completedLevels: [{ id: 1 }, { id: 2 }, { id: 3 }],
  };

  const actual = furthestCompletedLevel(context);

  expect(actual).toEqual({ id: 3 });
});

test('given context with empty array of completed levels returns undefined', () => {
  const context = {
    completedLevels: [],
  };

  const actual = furthestCompletedLevel(context);

  expect(actual).toEqual(undefined);
});
