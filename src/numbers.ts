/**
 * Generate a random integer between min and max (inclusive).
 *
 * @example
 * random(1, 10) // 7 (random number between 1 and 10)
 * random(0, 100) // 42 (random number between 0 and 100)
 *
 * @param min The minimum value (inclusive)
 * @param max The maximum value (inclusive)
 * @returns A random integer between min and max
 */
export function random(min: number, max: number): number {
    if (min > max) {
        throw new Error('Min value cannot be greater than max value');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Clamp a number between min and max values.
 *
 * @example
 * clamp(5, 0, 10) // 5
 * clamp(-5, 0, 10) // 0
 * clamp(15, 0, 10) // 10
 *
 * @param num The number to clamp
 * @param min The minimum value
 * @param max The maximum value
 * @returns The clamped number
 */
export function clamp(num: number, min: number, max: number): number {
    if (min > max) {
        throw new Error('Min value cannot be greater than max value');
    }
    return Math.min(Math.max(num, min), max);
}

/**
 * Calculate the sum of numbers in an array.
 *
 * @example
 * sum([1, 2, 3, 4, 5]) // 15
 * sum([1.5, 2.5, 3.5]) // 7.5
 *
 * @param array The array of numbers to sum
 * @returns The sum of all numbers
 */
export function sum(array: number[]): number {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    return array.reduce((acc, num) => {
        if (num === null || num === undefined || isNaN(num)) {
            return acc;
        }
        return acc + num;
    }, 0);
}

/**
 * Calculate the average (mean) of numbers in an array.
 *
 * @example
 * average([1, 2, 3, 4, 5]) // 3
 * average([1.5, 2.5, 3.5]) // 2.5
 *
 * @param array The array of numbers to average
 * @returns The average of all numbers
 */
export function average(array: number[]): number {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    if (array.length === 0) {
        return 0;
    }
    
    const validNumbers = array.filter(num => 
        num !== null && num !== undefined && !isNaN(num)
    );
    
    if (validNumbers.length === 0) {
        return 0;
    }
    
    return sum(array) / validNumbers.length;
}
