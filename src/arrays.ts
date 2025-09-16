
/**
 * Splits an array into chunks of specified size.
 *
 * @example
 * chunk([1, 2, 3, 4, 5], 2) // [[1,2], [3,4], [5]]
 *
 * @param array The array to split
 * @param size The chunk size
 * @returns A new array of chunks
 */

export function chunk<T>(array: T[], size: number) {
    if (size <= 0) throw new Error("Size must be greater than 0");
    const result: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
        result.push(array.slice(i, i + size));
    }
    return result;
}


/**
 * Remove falsy values (false, 0, null, undefined, NaN, "").
 *
 * @example
 * compact([1, 2, 3, 0, null, undefined, NaN, "", false]) // [1, 2, 3]
 *
 * @param array The array to compact
 * @returns A new array of compacted values
 */

export function compact<T>(array: T[]) {
    return array.filter(Boolean);
}