
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


/**
 * Flatten nested arrays (shallow/deep)
 *
 * @example
 * flatten([1, [2, [3, [4]]]]) // [1, 2, 3, 4]
 * flatten([1, [2, [3, [4]]]], true) // [1, 2, 3, 4]
 *
 * @param array The array to flatten
 * @param deep Whether to flatten deeply
 * @returns A new array of flattened values
 */

export function flatten<T>(array: T[], deep: boolean = false) {
    if (deep) {
        return array.flat(Infinity);
    }
    return array.flat();
}


/**
 * Return unique values
 *
 * @example
 * uniq([1, 2, 3, 2, 1]) // [1, 2, 3]
 *
 * @param array The array to flatten
 * @returns A new array of unique values
 */

export function uniq<T>(array: T[]) {
    return [...new Set(array)];
}


/**
 * Elements in array not in values.
 *
 * @example
 * difference([1, 2, 3, 2, 1], [2, 3]) // [1]
 *
 * @param array The array to difference
 * @param values The values to difference
 * @returns A new array of difference values
 */

export function difference<T>(array: T[], values: T[]) {
    return array.filter(item => !values.includes(item));
}