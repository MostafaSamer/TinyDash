/**
 * Check if a value is empty (null, undefined, empty string, empty array, or empty object).
 *
 * @example
 * isEmpty('') // true
 * isEmpty([]) // true
 * isEmpty({}) // true
 * isEmpty('hello') // false
 * isEmpty([1, 2, 3]) // false
 *
 * @param value The value to check
 * @returns True if the value is empty, false otherwise
 */
export function isEmpty(value: any): boolean {
    if (value === null || value === undefined) {
        return true;
    }
    
    if (typeof value === 'string' || Array.isArray(value)) {
        return value.length === 0;
    }
    
    if (typeof value === 'object') {
        return Object.keys(value).length === 0;
    }
    
    return false;
}

/**
 * Perform deep equality comparison between two values.
 *
 * @example
 * isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) // true
 * isEqual([1, 2, 3], [1, 2, 3]) // true
 * isEqual('hello', 'hello') // true
 *
 * @param a The first value to compare
 * @param b The second value to compare
 * @returns True if values are deeply equal, false otherwise
 */
export function isEqual(a: any, b: any): boolean {
    if (a === b) {
        return true;
    }
    
    if (a === null || b === null || a === undefined || b === undefined) {
        return a === b;
    }
    
    if (typeof a !== typeof b) {
        return false;
    }
    
    if (typeof a !== 'object') {
        return a === b;
    }
    
    if (Array.isArray(a) !== Array.isArray(b)) {
        return false;
    }
    
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    
    if (keysA.length !== keysB.length) {
        return false;
    }
    
    for (const key of keysA) {
        if (!keysB.includes(key)) {
            return false;
        }
        if (!isEqual(a[key], b[key])) {
            return false;
        }
    }
    
    return true;
}

/**
 * Validate if a string is a valid email address.
 *
 * @example
 * isEmail('user@example.com') // true
 * isEmail('invalid-email') // false
 * isEmail('test@domain.co.uk') // true
 *
 * @param str The string to validate
 * @returns True if the string is a valid email, false otherwise
 */
export function isEmail(str: string): boolean {
    if (typeof str !== 'string') {
        return false;
    }
    
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(str);
}

/**
 * Validate if a string is a valid UUID (any version).
 *
 * @example
 * isUUID('123e4567-e89b-12d3-a456-426614174000') // true
 * isUUID('invalid-uuid') // false
 * isUUID('123e4567-e89b-12d3-a456-42661417400') // false
 *
 * @param str The string to validate
 * @returns True if the string is a valid UUID, false otherwise
 */
export function isUUID(str: string): boolean {
    if (typeof str !== 'string') {
        return false;
    }
    
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
}

/**
 * Check if a value is a valid Date object or can be parsed as a date.
 *
 * @example
 * isDate(new Date()) // true
 * isDate('2023-01-01') // true
 * isDate('invalid-date') // false
 * isDate(1640995200000) // true
 *
 * @param value The value to check
 * @returns True if the value is a valid date, false otherwise
 */
export function isDate(value: any): boolean {
    if (value instanceof Date) {
        return !isNaN(value.getTime());
    }
    
    if (typeof value === 'string' || typeof value === 'number') {
        const date = new Date(value);
        if (isNaN(date.getTime())) {
            return false;
        }
        
        // Additional validation for simple date strings to catch invalid dates like '2023-02-29'
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
            const originalString = value.toString();
            const reconstructedString = date.toISOString().split('T')[0];
            return originalString === reconstructedString;
        }
        
        return true;
    }
    
    return false;
}
