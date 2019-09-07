import getOppositeOperator from '../getOppositeOperator';
import { ADD, SUBTRACT, MULTIPLY, DIVIDE } from '../../util/operations';

test('when function recives addition operator, returns subtraction', () => {
  const actual = getOppositeOperator(ADD);
  const expected = SUBTRACT;

  expect(actual).toEqual(expected);
});

test('when function recives subtraction operator, returns addition', () => {
  const actual = getOppositeOperator(SUBTRACT);
  const expected = ADD;

  expect(actual).toEqual(expected);
});

test('when function recives multiplication operator, returns division', () => {
  const actual = getOppositeOperator(MULTIPLY);
  const expected = DIVIDE;

  expect(actual).toEqual(expected);
});

test('when function recives division operator, returns multiplication', () => {
  const actual = getOppositeOperator(DIVIDE);
  const expected = MULTIPLY;

  expect(actual).toEqual(expected);
});
