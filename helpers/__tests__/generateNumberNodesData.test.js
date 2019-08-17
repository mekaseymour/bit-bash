import generateNumberNodesData from '../generateNumberNodesData';

test('generates correct number nodes data', () => {
  const nums = [29, 1, 1, 24, 3, 19];
  const actual = generateNumberNodesData(nums);
  const expected = [
    { size: 150, num: 29 },
    { size: 50, num: 1 },
    { size: 50, num: 1 },
    { size: 136, num: 24 },
    { size: 61, num: 3 },
    { size: 118, num: 19 },
  ];
  expect(actual).toEqual(expected);
});
