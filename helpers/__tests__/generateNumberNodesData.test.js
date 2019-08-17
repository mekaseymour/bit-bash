import generateNumberNodesData from '../generateNumberNodesData';

test('generates correct number nodes data', () => {
  const nums = [29, 1, 1, 24, 3, 19];
  const actual = generateNumberNodesData(nums);
  const expected = [
    { id: 1, size: 150, num: 29 },
    { id: 2, size: 50, num: 1 },
    { id: 3, size: 50, num: 1 },
    { id: 4, size: 136, num: 24 },
    { id: 5, size: 61, num: 3 },
    { id: 6, size: 118, num: 19 },
  ];
  expect(actual).toEqual(expected);
});
