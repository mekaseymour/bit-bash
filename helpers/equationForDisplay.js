const equationForDisplay = equation => {
  const forDisplay = equation.map((el, i) => (i === 1 ? el : el.num));
  return forDisplay.join(' ');
};

export default equationForDisplay;
