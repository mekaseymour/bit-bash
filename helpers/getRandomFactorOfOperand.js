const getRandomFactorOfOperand = operand => {
  const numbersNoGreaterThanOperand = new Array(operand).fill(undefined).map((e, i) => i + 1);
  const factors = numbersNoGreaterThanOperand.filter(n => operand % n === 0);
  const randomFactor = factors[Math.floor(Math.random() * factors.length)];

  return randomFactor;
};

export default getRandomFactorOfOperand;
