import generateNumberNodesData from '../generateNumberNodesData';

test('generates correct number nodes data', () => {
  const nums = [29, 1, 1, 24, 3, 19];
  const actual = generateNumberNodesData(nums);
  const expected = [
    { size: 180, num: 29 },
    { size: 55, num: 1 },
    { size: 59, num: 1 },
    { size: 162, num: 24 },
    { size: 68, num: 3 },
    { size: 140, num: 19 },
  ];
  expect(actual).toEqual(expected);
});
