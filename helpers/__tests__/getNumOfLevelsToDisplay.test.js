import getNumOfLevelsToDisplay from '../getNumOfLevelsToDisplay';
import { LEVELS_PER_SECTION } from '../../config/gameConfig';

test('when the furthest level seen is less than the number of levels allotted per section returns number of levels for one section', () => {
  const context = {
    furthestSeenLevel: {
      id: 1,
    },
    completedLevels: [],
  };
  const actual = getNumOfLevelsToDisplay(context);

  expect(actual).toEqual(LEVELS_PER_SECTION);
});

test('when the furthest level seen is evenly divisible by the number of levels per section, and the furthest seen level has not been completed, return number of levels up to furthest seen level', () => {
  const furthestSeenLevel = LEVELS_PER_SECTION * 3;

  const context = {
    furthestSeenLevel: {
      id: furthestSeenLevel,
    },
    completedLevels: [
      {
        id: 2,
      },
    ],
  };
  const actual = getNumOfLevelsToDisplay(context);

  expect(actual).toEqual(furthestSeenLevel);
});

test('when the furthest level seen is evenly divisible by the number of levels per section, and the furthest seen level has been completed, return number of levels up to furthest seen level', () => {
  const furthestSeenLevel = LEVELS_PER_SECTION * 3; // 45

  const context = {
    furthestSeenLevel: {
      id: furthestSeenLevel,
    },
    completedLevels: [
      {
        id: furthestSeenLevel,
      },
    ],
  };
  const actual = getNumOfLevelsToDisplay(context);

  expect(actual).toEqual(45 + LEVELS_PER_SECTION);
});

test('when furthest seen level is not evenly divisible by levels per section, returns all levels up to the next section', () => {
  const context = {
    furthestSeenLevel: {
      id: 33,
    },
    completedLevels: [
      {
        id: 32,
      },
    ],
  };
  const actual = getNumOfLevelsToDisplay(context);

  // assuming LEVELS_PER_SECTION = 15
  expect(actual).toEqual(45);
});

test('when there is no level stored for furthest seen level returns levels per section', () => {
  const context = {
    furthestSeenLevel: {},
    completedLevels: [],
  };
  const actual = getNumOfLevelsToDisplay(context);

  expect(actual).toEqual(LEVELS_PER_SECTION);
});
