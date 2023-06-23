import {hexToRgb} from '../colorConverter';

describe('core/util/colorConverter::hexToRgb', () => {
  test('Hex value without alpha channel::valid format', () => {
    const result = hexToRgb('#ff0000');
    expect(result).toBeTruthy();
  });
  test('Hex value without alpha channel should return in rgba format', () => {
    const result = hexToRgb('#ff0000');
    expect(result).toBe('rgba(255, 0, 0, 1)');
  });
  test('Hex value without alpha channel::invalid format', () => {
    const result = hexToRgb('#ff0');
    expect(result).toBeFalsy();
  });
  test('Hex value with alpha channel should return in rgba format with the given alpha value', () => {
    const result = hexToRgb('#ff0000', '0.07');
    expect(result).toBe('rgba(255, 0, 0, 0.07)');
  });
  test('Hex value with alpha channel as a percentage::valid format', () => {
    const result = hexToRgb('#ff0000', '7%');
    expect(result).toBeTruthy();
  });
  test('Hex value with alpha channel as a decimal::valid format', () => {
    const result = hexToRgb('#ff0000', '0.07');
    expect(result).toBeTruthy();
  });
  test('Hex value with alpha channel as a percentage::invalid format', () => {
    const result = hexToRgb('#ff0', '7%');
    expect(result).toBeFalsy();
  });
  test('Hex value with alpha channel as a decimal::invalid format', () => {
    const result = hexToRgb('#ff0', '0.07');
    expect(result).toBeFalsy();
  });
  test('Set input value as empty::invalid format', () => {
    const result = hexToRgb('');
    expect(result).toBeFalsy();
  });
  test('Set input value as empty and alpha channel empty::invalid format', () => {
    const result = hexToRgb('', '');
    expect(result).toBeFalsy();
  });
});
