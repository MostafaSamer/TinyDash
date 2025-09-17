/**
 * Capitalize the first letter of a string.
 *
 * @example
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO') // 'HELLO'
 *
 * @param str The string to capitalize
 * @returns A new string with the first letter capitalized
 */
export function capitalize(str: string): string {
    if (!str || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Convert a string to camelCase.
 *
 * @example
 * camelCase('hello world') // 'helloWorld'
 * camelCase('hello-world') // 'helloWorld'
 * camelCase('hello_world') // 'helloWorld'
 *
 * @param str The string to convert
 * @returns A new string in camelCase format
 */
export function camelCase(str: string): string {
    if (!str || str.length === 0) return str;
    
    return str
        .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
        .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * Convert a string to kebab-case.
 *
 * @example
 * kebabCase('hello world') // 'hello-world'
 * kebabCase('helloWorld') // 'hello-world'
 * kebabCase('hello_world') // 'hello-world'
 *
 * @param str The string to convert
 * @returns A new string in kebab-case format
 */
export function kebabCase(str: string): string {
    if (!str || str.length === 0) return str;
    
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .toLowerCase()
        .replace(/^-+|-+$/g, '')
        .replace(/-+/g, '-');
}

/**
 * Truncate a string to a specified length and add ellipsis if needed.
 *
 * @example
 * truncate('Hello world', 5) // 'Hello...'
 * truncate('Hello', 10) // 'Hello'
 *
 * @param str The string to truncate
 * @param length The maximum length
 * @returns A new truncated string
 */
export function truncate(str: string, length: number): string {
    if (!str || str.length === 0) return str;
    if (length <= 0) return '';
    if (str.length <= length) return str;
    
    return str.slice(0, length) + '...';
}

/**
 * Reverse the characters in a string.
 *
 * @example
 * reverse('hello') // 'olleh'
 * reverse('world') // 'dlrow'
 *
 * @param str The string to reverse
 * @returns A new reversed string
 */
export function reverse(str: string): string {
    if (!str || str.length === 0) return str;
    return str.split('').reverse().join('');
}
