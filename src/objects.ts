/**
 * Deep clone an object, creating a completely independent copy.
 *
 * @example
 * deepClone({ a: 1, b: { c: 2 } }) // { a: 1, b: { c: 2 } }
 *
 * @param obj The object to clone
 * @returns A deep copy of the object
 */
export function deepClone<T>(obj: T, visited = new WeakMap()): T {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }
    
    // Handle circular references
    if (visited.has(obj)) {
        return visited.get(obj);
    }
    
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as T;
    }
    
    if (obj instanceof Array) {
        const cloned = [] as any;
        visited.set(obj, cloned);
        for (let i = 0; i < obj.length; i++) {
            cloned[i] = deepClone(obj[i], visited);
        }
        return cloned as T;
    }
    
    if (typeof obj === 'object') {
        const cloned = {} as T;
        visited.set(obj, cloned);
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = deepClone(obj[key], visited);
            }
        }
        return cloned;
    }
    
    return obj;
}

/**
 * Merge two objects deeply, with the second object taking precedence.
 *
 * @example
 * merge({ a: 1, b: { c: 2 } }, { b: { d: 3 } }) // { a: 1, b: { c: 2, d: 3 } }
 *
 * @param obj1 The first object
 * @param obj2 The second object
 * @returns A new merged object
 */
export function merge<T, U>(obj1: T, obj2: U): T & U {
    const result = { ...obj1 } as T & U;
    
    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            const value = (obj2 as any)[key];
            if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
                (result as any)[key] = merge((result as any)[key] || {}, value);
            } else {
                (result as any)[key] = value;
            }
        }
    }
    
    return result;
}

/**
 * Safely access nested properties using dot notation.
 *
 * @example
 * get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 * get({ a: { b: { c: 1 } } }, 'a.b.d', 'default') // 'default'
 *
 * @param obj The object to access
 * @param path The dot-separated path
 * @param defaultValue The default value if path doesn't exist
 * @returns The value at the path or default value
 */
export function get<T>(obj: any, path: string, defaultValue?: T): T | undefined {
    if (!path) {
        return obj;
    }
    
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current === null || current === undefined || typeof current !== 'object') {
            return defaultValue;
        }
        current = current[key];
    }
    
    return current !== undefined ? current : defaultValue;
}

/**
 * Set a value at a nested property using dot notation.
 *
 * @example
 * set({}, 'a.b.c', 1) // { a: { b: { c: 1 } } }
 *
 * @param obj The object to modify
 * @param path The dot-separated path
 * @param value The value to set
 * @returns The modified object
 */
export function set<T>(obj: any, path: string, value: T): any {
    const keys = path.split('.');
    const result = { ...obj };
    let current = result;
    
    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
            current[key] = {};
        }
        current = current[key];
    }
    
    current[keys[keys.length - 1]] = value;
    return result;
}

/**
 * Return a new object without the specified keys.
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { b: 2 }
 *
 * @param obj The object to omit keys from
 * @param keys The keys to omit
 * @returns A new object without the specified keys
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> {
    const result = { ...obj };
    keys.forEach(key => delete result[key]);
    return result;
}

/**
 * Return a new object with only the specified keys.
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 *
 * @param obj The object to pick keys from
 * @param keys The keys to pick
 * @returns A new object with only the specified keys
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
    obj: T,
    keys: K[]
): Pick<T, K> {
    const result = {} as Pick<T, K>;
    keys.forEach(key => {
        if (key in obj) {
            result[key] = obj[key];
        }
    });
    return result;
}
