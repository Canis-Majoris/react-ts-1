export const getProgressPercentage = (
  numerator: string | number,
  denominator: string | number
): number => {
  try {
    if (!numerator || !denominator) return 0;
    if (numerator === 0 && denominator === 0) {
      return 0;
    } else {
      return Math.floor((Number(numerator) / Number(denominator)) * 100);
    }
  } catch (e) {
    return 0;
  }
};
