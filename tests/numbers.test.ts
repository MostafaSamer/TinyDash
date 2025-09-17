import { random, clamp, sum, average } from '../src/numbers';

describe('random', () => {
    it('should generate random numbers within the specified range', () => {
        for (let i = 0; i < 100; i++) {
            const result = random(1, 10);
            expect(result).toBeGreaterThanOrEqual(1);
            expect(result).toBeLessThanOrEqual(10);
            expect(Number.isInteger(result)).toBe(true);
        }
    });

    it('should handle single value range', () => {
        expect(random(5, 5)).toBe(5);
    });

    it('should handle negative ranges', () => {
        for (let i = 0; i < 50; i++) {
            const result = random(-10, -1);
            expect(result).toBeGreaterThanOrEqual(-10);
            expect(result).toBeLessThanOrEqual(-1);
        }
    });

    it('should handle mixed positive and negative ranges', () => {
        for (let i = 0; i < 50; i++) {
            const result = random(-5, 5);
            expect(result).toBeGreaterThanOrEqual(-5);
            expect(result).toBeLessThanOrEqual(5);
        }
    });

    it('should throw error when min is greater than max', () => {
        expect(() => random(10, 1)).toThrow('Min value cannot be greater than max value');
        expect(() => random(5, 3)).toThrow('Min value cannot be greater than max value');
    });

    it('should handle zero range', () => {
        expect(random(0, 0)).toBe(0);
    });
});

describe('clamp', () => {
    it('should return the number if it is within bounds', () => {
        expect(clamp(5, 0, 10)).toBe(5);
        expect(clamp(0, 0, 10)).toBe(0);
        expect(clamp(10, 0, 10)).toBe(10);
    });

    it('should clamp to minimum value', () => {
        expect(clamp(-5, 0, 10)).toBe(0);
        expect(clamp(0, 5, 10)).toBe(5);
    });

    it('should clamp to maximum value', () => {
        expect(clamp(15, 0, 10)).toBe(10);
        expect(clamp(10, 0, 5)).toBe(5);
    });

    it('should handle negative bounds', () => {
        expect(clamp(-10, -5, 5)).toBe(-5);
        expect(clamp(10, -5, 5)).toBe(5);
        expect(clamp(0, -5, 5)).toBe(0);
    });

    it('should handle decimal numbers', () => {
        expect(clamp(1.5, 1, 2)).toBe(1.5);
        expect(clamp(0.5, 1, 2)).toBe(1);
        expect(clamp(2.5, 1, 2)).toBe(2);
    });

    it('should throw error when min is greater than max', () => {
        expect(() => clamp(5, 10, 1)).toThrow('Min value cannot be greater than max value');
        expect(() => clamp(5, 3, 1)).toThrow('Min value cannot be greater than max value');
    });

    it('should handle equal min and max', () => {
        expect(clamp(5, 5, 5)).toBe(5);
        expect(clamp(3, 5, 5)).toBe(5);
        expect(clamp(7, 5, 5)).toBe(5);
    });
});

describe('sum', () => {
    it('should sum positive numbers', () => {
        expect(sum([1, 2, 3, 4, 5])).toBe(15);
        expect(sum([10, 20, 30])).toBe(60);
    });

    it('should sum negative numbers', () => {
        expect(sum([-1, -2, -3])).toBe(-6);
        expect(sum([-10, 5, -5])).toBe(-10);
    });

    it('should sum mixed positive and negative numbers', () => {
        expect(sum([1, -2, 3, -4, 5])).toBe(3);
        expect(sum([-10, 20, -30, 40])).toBe(20);
    });

    it('should sum decimal numbers', () => {
        expect(sum([1.5, 2.5, 3.5])).toBe(7.5);
        expect(sum([0.1, 0.2, 0.3])).toBeCloseTo(0.6);
    });

    it('should return 0 for empty array', () => {
        expect(sum([])).toBe(0);
    });

    it('should handle arrays with undefined and null values', () => {
        expect(sum([1, undefined, 3, null, 5])).toBe(9);
        expect(sum([undefined, null, undefined])).toBe(0);
    });

    it('should throw error for non-array input', () => {
        expect(() => sum('not an array' as any)).toThrow('Input must be an array');
        expect(() => sum(123 as any)).toThrow('Input must be an array');
        expect(() => sum({} as any)).toThrow('Input must be an array');
    });

    it('should handle single element arrays', () => {
        expect(sum([42])).toBe(42);
        expect(sum([-10])).toBe(-10);
    });

    it('should handle zero values', () => {
        expect(sum([0, 0, 0])).toBe(0);
        expect(sum([1, 0, -1])).toBe(0);
    });
});

describe('average', () => {
    it('should calculate average of positive numbers', () => {
        expect(average([1, 2, 3, 4, 5])).toBe(3);
        expect(average([10, 20, 30])).toBe(20);
    });

    it('should calculate average of negative numbers', () => {
        expect(average([-1, -2, -3])).toBe(-2);
        expect(average([-10, -20, -30])).toBe(-20);
    });

    it('should calculate average of mixed numbers', () => {
        expect(average([1, -2, 3, -4, 5])).toBe(0.6);
        expect(average([-10, 20, -30, 40])).toBe(5);
    });

    it('should calculate average of decimal numbers', () => {
        expect(average([1.5, 2.5, 3.5])).toBe(2.5);
        expect(average([0.1, 0.2, 0.3])).toBeCloseTo(0.2);
    });

    it('should return 0 for empty array', () => {
        expect(average([])).toBe(0);
    });

    it('should handle arrays with undefined and null values', () => {
        expect(average([1, undefined, 3, null, 5])).toBe(3);
        expect(average([undefined, null, undefined])).toBe(0);
    });

    it('should throw error for non-array input', () => {
        expect(() => average('not an array' as any)).toThrow('Input must be an array');
        expect(() => average(123 as any)).toThrow('Input must be an array');
        expect(() => average({} as any)).toThrow('Input must be an array');
    });

    it('should handle single element arrays', () => {
        expect(average([42])).toBe(42);
        expect(average([-10])).toBe(-10);
    });

    it('should handle zero values', () => {
        expect(average([0, 0, 0])).toBe(0);
        expect(average([1, 0, -1])).toBe(0);
    });

    it('should handle very large numbers', () => {
        expect(average([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER])).toBe(Number.MAX_SAFE_INTEGER);
    });
});
