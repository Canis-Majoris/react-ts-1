import Color from 'color';

export const generatePallete = (a, b) => {
  const baseColor = Color(a);
  const mixColor = Color(b);
  return [
    baseColor.hex(),
    baseColor.mix(mixColor, 0.25).hex(),
    baseColor.mix(mixColor, 0.5).hex(),
    baseColor.mix(mixColor, 0.75).hex(),
    mixColor.hex(),
  ];
};
