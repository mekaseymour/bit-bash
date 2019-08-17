import handleNodesOperation from '../handleNodesOperation';

/*
  handleNodesOperation takes an array of nodes and an equation array and returns
  and array whose first element is a new array of nodes and the second is a result
  for the equation
 */

test('given an array of nodes and an equation array returns correctly modified nodes and correct equation result', () => {
  const nodes = [{ id: 1, num: 2, size: 5 }, { id: 2, num: 3, size: 6 }, { id: 3, num: 10, size: 15 }];
  const equation = [{ id: 1, num: 2, size: 5 }, '+', { id: 2, num: 3, size: 6 }];

  const actual = handleNodesOperation(nodes, equation);
  const expectedNewNodes = [{ id: 1, num: 5, size: 5 }, { id: 3, num: 10, size: 15 }];
  const expectedEquationResult = 5;
  const expected = [expectedNewNodes, expectedEquationResult];

  expect(actual).toEqual(expected);
});
