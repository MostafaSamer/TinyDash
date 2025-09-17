import { deepClone, merge, get, set, omit, pick } from '../src/objects';

describe('deepClone', () => {
    it('should clone primitive values', () => {
        expect(deepClone(42)).toBe(42);
        expect(deepClone('hello')).toBe('hello');
        expect(deepClone(true)).toBe(true);
        expect(deepClone(null)).toBe(null);
        expect(deepClone(undefined)).toBe(undefined);
    });

    it('should clone simple objects', () => {
        const obj = { a: 1, b: 2 };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
    });

    it('should clone nested objects', () => {
        const obj = { a: { b: { c: 1 } } };
        const cloned = deepClone(obj);
        expect(cloned).toEqual(obj);
        expect(cloned.a).not.toBe(obj.a);
        expect(cloned.a.b).not.toBe(obj.a.b);
    });

    it('should clone arrays', () => {
        const arr = [1, 2, [3, 4]];
        const cloned = deepClone(arr);
        expect(cloned).toEqual(arr);
        expect(cloned).not.toBe(arr);
        expect(cloned[2]).not.toBe(arr[2]);
    });

    it('should clone dates', () => {
        const date = new Date('2023-01-01');
        const cloned = deepClone(date);
        expect(cloned).toEqual(date);
        expect(cloned).not.toBe(date);
        expect(cloned instanceof Date).toBe(true);
    });

    it('should handle circular references', () => {
        const obj: any = { a: 1 };
        obj.self = obj;
        const cloned = deepClone(obj);
        expect(cloned.a).toBe(1);
        expect(cloned.self).toBe(cloned);
    });
});

describe('merge', () => {
    it('should merge simple objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const result = merge(obj1, obj2);
        expect(result).toEqual({ a: 1, b: 3, c: 4 });
    });

    it('should merge nested objects', () => {
        const obj1 = { a: { b: 1, c: 2 } };
        const obj2 = { a: { c: 3, d: 4 } };
        const result = merge(obj1, obj2);
        expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
    });

    it('should not modify original objects', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { b: 3, c: 4 };
        const original1 = { ...obj1 };
        const original2 = { ...obj2 };
        merge(obj1, obj2);
        expect(obj1).toEqual(original1);
        expect(obj2).toEqual(original2);
    });

    it('should handle arrays by replacing them', () => {
        const obj1 = { items: [1, 2, 3] };
        const obj2 = { items: [4, 5] };
        const result = merge(obj1, obj2);
        expect(result).toEqual({ items: [4, 5] });
    });

    it('should handle dates by replacing them', () => {
        const obj1 = { date: new Date('2023-01-01') };
        const obj2 = { date: new Date('2023-12-31') };
        const result = merge(obj1, obj2);
        expect(result.date).toEqual(new Date('2023-12-31'));
    });
});

describe('get', () => {
    const obj = { a: { b: { c: 1, d: [2, 3] } } };

    it('should get nested values', () => {
        expect(get(obj, 'a.b.c')).toBe(1);
        expect(get(obj, 'a.b.d')).toEqual([2, 3]);
    });

    it('should return default value for non-existent paths', () => {
        expect(get(obj, 'a.b.e', 'default')).toBe('default');
        expect(get(obj, 'x.y.z', null)).toBe(null);
    });

    it('should return undefined when no default provided', () => {
        expect(get(obj, 'a.b.e')).toBeUndefined();
    });

    it('should handle empty path', () => {
        expect(get(obj, '')).toBe(obj);
    });

    it('should handle null/undefined objects', () => {
        expect(get(null, 'a.b.c', 'default')).toBe('default');
        expect(get(undefined, 'a.b.c', 'default')).toBe('default');
    });

    it('should handle primitive values in path', () => {
        expect(get({ a: 1 }, 'a.b.c', 'default')).toBe('default');
    });
});

describe('set', () => {
    it('should set nested values', () => {
        const obj = {};
        const result = set(obj, 'a.b.c', 1);
        expect(result).toEqual({ a: { b: { c: 1 } } });
    });

    it('should not modify original object', () => {
        const obj = {};
        set(obj, 'a.b.c', 1);
        expect(obj).toEqual({});
    });

    it('should overwrite existing values', () => {
        const obj = { a: { b: { c: 1 } } };
        const result = set(obj, 'a.b.c', 2);
        expect(result).toEqual({ a: { b: { c: 2 } } });
    });

    it('should handle shallow paths', () => {
        const obj = {};
        const result = set(obj, 'a', 1);
        expect(result).toEqual({ a: 1 });
    });

    it('should handle arrays in path', () => {
        const obj = { items: [1, 2, 3] };
        const result = set(obj, 'items.1', 99);
        expect(result).toEqual({ items: [1, 99, 3] });
    });

    it('should create intermediate objects', () => {
        const obj = { a: 1 };
        const result = set(obj, 'b.c.d', 2);
        expect(result).toEqual({ a: 1, b: { c: { d: 2 } } });
    });
});

describe('omit', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };

    it('should omit specified keys', () => {
        const result = omit(obj, ['a', 'c']);
        expect(result).toEqual({ b: 2, d: 4 });
    });

    it('should not modify original object', () => {
        const original = { ...obj };
        omit(obj, ['a', 'c']);
        expect(obj).toEqual(original);
    });

    it('should handle non-existent keys', () => {
        const result = omit(obj, ['x', 'y'] as any);
        expect(result).toEqual(obj);
    });

    it('should handle empty keys array', () => {
        const result = omit(obj, []);
        expect(result).toEqual(obj);
    });

    it('should handle all keys', () => {
        const result = omit(obj, ['a', 'b', 'c', 'd']);
        expect(result).toEqual({});
    });
});

describe('pick', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };

    it('should pick specified keys', () => {
        const result = pick(obj, ['a', 'c']);
        expect(result).toEqual({ a: 1, c: 3 });
    });

    it('should not modify original object', () => {
        const original = { ...obj };
        pick(obj, ['a', 'c']);
        expect(obj).toEqual(original);
    });

    it('should handle non-existent keys', () => {
        const result = pick(obj, ['x', 'y'] as any);
        expect(result).toEqual({});
    });

    it('should handle empty keys array', () => {
        const result = pick(obj, []);
        expect(result).toEqual({});
    });

    it('should handle all keys', () => {
        const result = pick(obj, ['a', 'b', 'c', 'd']);
        expect(result).toEqual(obj);
    });

    it('should only include keys that exist in the object', () => {
        const result = pick(obj, ['a', 'x', 'b', 'y'] as any);
        expect(result).toEqual({ a: 1, b: 2 });
    });
});
