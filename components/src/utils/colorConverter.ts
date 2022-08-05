export const hexToRgb = (hex: string | null, alpha = '1') => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
    hex || '',
  );
  const rgbObj = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  return rgbObj
    ? `rgba(${rgbObj?.r}, ${rgbObj?.g}, ${rgbObj?.b}, ${alpha})`
    : null;
};
