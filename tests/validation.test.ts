import { isEmpty, isEqual, isEmail, isUUID, isDate } from '../src/validation';

describe('isEmpty', () => {
    it('should return true for null and undefined', () => {
        expect(isEmpty(null)).toBe(true);
        expect(isEmpty(undefined)).toBe(true);
    });

    it('should return true for empty strings', () => {
        expect(isEmpty('')).toBe(true);
        expect(isEmpty('   ')).toBe(false); // whitespace is not empty
    });

    it('should return true for empty arrays', () => {
        expect(isEmpty([])).toBe(true);
        expect(isEmpty([1, 2, 3])).toBe(false);
    });

    it('should return true for empty objects', () => {
        expect(isEmpty({})).toBe(true);
        expect(isEmpty({ a: 1 })).toBe(false);
    });

    it('should return false for non-empty values', () => {
        expect(isEmpty('hello')).toBe(false);
        expect(isEmpty(0)).toBe(false);
        expect(isEmpty(false)).toBe(false);
        expect(isEmpty(123)).toBe(false);
    });

    it('should handle nested empty objects', () => {
        expect(isEmpty({ a: {} })).toBe(false);
        expect(isEmpty({ a: [], b: {} })).toBe(false);
    });

    it('should handle arrays with empty elements', () => {
        expect(isEmpty([null, undefined, ''])).toBe(false);
        expect(isEmpty([[], {}])).toBe(false);
    });
});

describe('isEqual', () => {
    it('should return true for identical primitive values', () => {
        expect(isEqual(1, 1)).toBe(true);
        expect(isEqual('hello', 'hello')).toBe(true);
        expect(isEqual(true, true)).toBe(true);
        expect(isEqual(null, null)).toBe(true);
        expect(isEqual(undefined, undefined)).toBe(true);
    });

    it('should return false for different primitive values', () => {
        expect(isEqual(1, 2)).toBe(false);
        expect(isEqual('hello', 'world')).toBe(false);
        expect(isEqual(true, false)).toBe(false);
        expect(isEqual(null, undefined)).toBe(false);
    });

    it('should return true for identical arrays', () => {
        expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
        expect(isEqual([], [])).toBe(true);
        expect(isEqual(['a', 'b'], ['a', 'b'])).toBe(true);
    });

    it('should return false for different arrays', () => {
        expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
        expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
        expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    });

    it('should return true for identical objects', () => {
        expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
        expect(isEqual({}, {})).toBe(true);
        expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    });

    it('should return false for different objects', () => {
        expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
        expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
        expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
    });

    it('should handle nested structures', () => {
        const obj1 = { a: { b: { c: 1 } }, d: [1, 2, { e: 3 }] };
        const obj2 = { a: { b: { c: 1 } }, d: [1, 2, { e: 3 }] };
        const obj3 = { a: { b: { c: 2 } }, d: [1, 2, { e: 3 }] };
        
        expect(isEqual(obj1, obj2)).toBe(true);
        expect(isEqual(obj1, obj3)).toBe(false);
    });

    it('should handle arrays with objects', () => {
        expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 2 }])).toBe(true);
        expect(isEqual([{ a: 1 }, { b: 2 }], [{ a: 1 }, { b: 3 }])).toBe(false);
    });

    it('should handle different types', () => {
        expect(isEqual(1, '1')).toBe(false);
        expect(isEqual(true, 1)).toBe(false);
        expect(isEqual([], {})).toBe(false);
    });
});

describe('isEmail', () => {
    it('should return true for valid email addresses', () => {
        expect(isEmail('user@example.com')).toBe(true);
        expect(isEmail('test@domain.co.uk')).toBe(true);
        expect(isEmail('user.name@example.com')).toBe(true);
        expect(isEmail('user+tag@example.com')).toBe(true);
        expect(isEmail('user123@example123.com')).toBe(true);
    });

    it('should return false for invalid email addresses', () => {
        expect(isEmail('invalid-email')).toBe(false);
        expect(isEmail('@example.com')).toBe(false);
        expect(isEmail('user@')).toBe(false);
        expect(isEmail('user@.com')).toBe(false);
        expect(isEmail('user.example.com')).toBe(false);
        expect(isEmail('')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
        expect(isEmail(123 as any)).toBe(false);
        expect(isEmail(null as any)).toBe(false);
        expect(isEmail(undefined as any)).toBe(false);
        expect(isEmail({} as any)).toBe(false);
        expect(isEmail([] as any)).toBe(false);
    });

    it('should handle edge cases', () => {
        expect(isEmail('a@b.c')).toBe(true);
        expect(isEmail('user@subdomain.example.com')).toBe(true);
        expect(isEmail('user@example-domain.com')).toBe(true);
    });
});

describe('isUUID', () => {
    it('should return true for valid UUIDs', () => {
        expect(isUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true);
        expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
        expect(isUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
        expect(isUUID('6ba7b811-9dad-11d1-80b4-00c04fd430c8')).toBe(true);
    });

    it('should return false for invalid UUIDs', () => {
        expect(isUUID('invalid-uuid')).toBe(false);
        expect(isUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false); // too short
        expect(isUUID('123e4567-e89b-12d3-a456-4266141740000')).toBe(false); // too long
        expect(isUUID('123e4567-e89b-12d3-a456-42661417400g')).toBe(false); // invalid character
        expect(isUUID('123e4567-e89b-12d3-a456-42661417400-')).toBe(false); // extra dash
        expect(isUUID('')).toBe(false);
    });

    it('should return false for non-string inputs', () => {
        expect(isUUID(123 as any)).toBe(false);
        expect(isUUID(null as any)).toBe(false);
        expect(isUUID(undefined as any)).toBe(false);
        expect(isUUID({} as any)).toBe(false);
        expect(isUUID([] as any)).toBe(false);
    });

    it('should handle case sensitivity', () => {
        expect(isUUID('123E4567-E89B-12D3-A456-426614174000')).toBe(true);
        expect(isUUID('123e4567-E89b-12d3-A456-426614174000')).toBe(true);
    });
});

describe('isDate', () => {
    it('should return true for valid Date objects', () => {
        expect(isDate(new Date())).toBe(true);
        expect(isDate(new Date('2023-01-01'))).toBe(true);
        expect(isDate(new Date(1640995200000))).toBe(true);
    });

    it('should return true for valid date strings', () => {
        expect(isDate('2023-01-01')).toBe(true);
        expect(isDate('2023-12-31')).toBe(true);
        expect(isDate('2023-01-01T00:00:00.000Z')).toBe(true);
        expect(isDate('Jan 1, 2023')).toBe(true);
    });

    it('should return true for valid timestamp numbers', () => {
        expect(isDate(1640995200000)).toBe(true);
        expect(isDate(0)).toBe(true); // Unix epoch
        expect(isDate(946684800000)).toBe(true); // Year 2000
    });

    it('should return false for invalid date strings', () => {
        expect(isDate('invalid-date')).toBe(false);
        expect(isDate('2023-13-01')).toBe(false); // invalid month
        expect(isDate('2023-01-32')).toBe(false); // invalid day
        expect(isDate('not a date')).toBe(false);
        expect(isDate('')).toBe(false);
    });

    it('should return false for invalid inputs', () => {
        expect(isDate(null)).toBe(false);
        expect(isDate(undefined)).toBe(false);
        expect(isDate({})).toBe(false);
        expect(isDate([])).toBe(false);
        expect(isDate(true)).toBe(false);
    });

    it('should handle edge cases', () => {
        expect(isDate('2023-02-29')).toBe(false); // not a leap year
        expect(isDate('2024-02-29')).toBe(true); // leap year
        expect(isDate('2023-04-31')).toBe(false); // April has 30 days
    });

    it('should handle invalid Date objects', () => {
        const invalidDate = new Date('invalid');
        expect(isDate(invalidDate)).toBe(false);
    });
});
