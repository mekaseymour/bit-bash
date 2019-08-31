import updateNodeSize from '../updateNodeSize';

test('if result is the new smallest number, return the MIN_NODE_SIZE', () => {
  const result = 10;
  const remainingNodes = [{ id: 1, num: 20, size: 100 }];
  const leftSideNode = { id: 2, num: 5, size: 80 };

  const actual = updateNodeSize(result, remainingNodes, leftSideNode);
  const expected = 0;

  expect(actual).toEqual(expected);
});

test('if result is the new largest number, return the MAX_NODE_SIZE', () => {
  const result = 20;
  const remainingNodes = [{ id: 1, num: 10, size: 70 }, { id: 3, num: 3, size: 60 }];
  const leftSideNode = { id: 2, num: 10, size: 70 };

  const actual = updateNodeSize(result, remainingNodes, leftSideNode);
  const expected = 0;

  expect(actual).toEqual(expected);
});

test('if result is equal to another number in the remaining nodes, return the same size as that node', () => {
  const result = 52;
  const remainingNodes = [{ id: 1, num: 52, size: 100 }, { id: 3, num: 3, size: 70 }];
  const leftSideNode = { id: 2, num: 2, size: 60 };

  const actual = updateNodeSize(result, remainingNodes, leftSideNode);
  const expected = 100;

  expect(actual).toEqual(expected);
});

test("if there are other remaining nodes on either side of result node, return a size for the result node that's between the sizes of its neighboring number nodes", () => {
  const result = 20;
  const remainingNodes = [{ id: 1, num: 10, size: 70 }, { id: 3, num: 30, size: 100 }];
  const leftSideNode = { id: 2, num: 5, size: 60 };

  const actual = updateNodeSize(result, remainingNodes, leftSideNode);
  const expected = actual > 70 && actual < 100;

  expect(expected).toBe(true);
});
