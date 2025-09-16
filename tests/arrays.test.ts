import { chunk, compact } from '../src/arrays';

describe('chunk', () => {
  test('should split array into chunks of specified size', () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(chunk([1, 2, 3, 4, 5, 6], 3)).toEqual([[1, 2, 3], [4, 5, 6]]);
    expect(chunk([1, 2, 3, 4, 5, 6, 7], 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
  });

  test('should handle empty array', () => {
    expect(chunk([], 2)).toEqual([]);
  });

  test('should handle single element array', () => {
    expect(chunk([1], 2)).toEqual([[1]]);
  });

  test('should handle chunk size larger than array length', () => {
    expect(chunk([1, 2, 3], 5)).toEqual([[1, 2, 3]]);
  });

  test('should handle chunk size of 1', () => {
    expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]]);
  });

  test('should handle string arrays', () => {
    expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
  });

  test('should handle mixed type arrays', () => {
    expect(chunk([1, 'a', true, null], 2)).toEqual([[1, 'a'], [true, null]]);
  });

  test('should throw error for invalid chunk size', () => {
    expect(() => chunk([1, 2, 3], 0)).toThrow('Size must be greater than 0');
    expect(() => chunk([1, 2, 3], -1)).toThrow('Size must be greater than 0');
  });
});

describe('compact', () => {
  test('should remove falsy values', () => {
    expect(compact([1, 2, 3, 0, null, undefined, NaN, '', false])).toEqual([1, 2, 3]);
  });

  test('should handle empty array', () => {
    expect(compact([])).toEqual([]);
  });

  test('should handle array with only falsy values', () => {
    expect(compact([false, 0, null, undefined, NaN, ''])).toEqual([]);
  });

  test('should handle array with only truthy values', () => {
    expect(compact([1, 2, 3, 'hello', true, {}])).toEqual([1, 2, 3, 'hello', true, {}]);
  });

  test('should handle mixed arrays', () => {
    expect(compact([1, 0, 'hello', '', true, false, null, undefined])).toEqual([1, 'hello', true]);
  });

  test('should handle arrays with objects and arrays', () => {
    const obj = { a: 1 };
    const arr = [1, 2];
    expect(compact([obj, null, arr, undefined, false])).toEqual([obj, arr]);
  });

  test('should handle arrays with zero and empty string', () => {
    expect(compact([0, '', 1, 'hello'])).toEqual([1, 'hello']);
  });

  test('should handle arrays with NaN', () => {
    expect(compact([1, NaN, 2, 3])).toEqual([1, 2, 3]);
  });
});
