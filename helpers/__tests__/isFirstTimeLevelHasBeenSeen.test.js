import isFirstTimeLevelHasBeenSeen from '../isFirstTimeLevelHasBeenSeen';

test('returns true if furthest level seen does not exist in context', () => {
  const context = { furthestSeenLevel: {} };
  const level = 1;

  const actual = isFirstTimeLevelHasBeenSeen(context, level);

  expect(actual).toEqual(true);
});

test('returns true if furthest level seen exists in context and the given level is greater than the furthest seen level', () => {
  const context = {
    furthestSeenLevel: {
      id: 14,
    },
  };
  const level = 15;

  const actual = isFirstTimeLevelHasBeenSeen(context, level);

  expect(actual).toEqual(true);
});

test('returns true if furthest level seen exists in context and the given level is less than or equal to the furthest seen level', () => {
  const context = {
    furthestSeenLevel: { id: 20 },
  };

  const level = 20;

  const actual = isFirstTimeLevelHasBeenSeen(context, level);

  expect(actual).toEqual(false);
});
