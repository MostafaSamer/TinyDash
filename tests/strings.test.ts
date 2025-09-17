import { capitalize, camelCase, kebabCase, truncate, reverse } from '../src/strings';

describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
        expect(capitalize('hello')).toBe('Hello');
        expect(capitalize('world')).toBe('World');
        expect(capitalize('hello world')).toBe('Hello world');
    });

    it('should handle already capitalized strings', () => {
        expect(capitalize('Hello')).toBe('Hello');
        expect(capitalize('HELLO')).toBe('HELLO');
    });

    it('should handle empty strings', () => {
        expect(capitalize('')).toBe('');
    });

    it('should handle single character strings', () => {
        expect(capitalize('a')).toBe('A');
        expect(capitalize('A')).toBe('A');
    });

    it('should handle strings with special characters', () => {
        expect(capitalize('123hello')).toBe('123hello');
        expect(capitalize('!hello')).toBe('!hello');
    });

    it('should handle null and undefined', () => {
        expect(capitalize(null as any)).toBe(null);
        expect(capitalize(undefined as any)).toBe(undefined);
    });
});

describe('camelCase', () => {
    it('should convert space-separated words to camelCase', () => {
        expect(camelCase('hello world')).toBe('helloWorld');
        expect(camelCase('hello world test')).toBe('helloWorldTest');
    });

    it('should convert kebab-case to camelCase', () => {
        expect(camelCase('hello-world')).toBe('helloWorld');
        expect(camelCase('hello-world-test')).toBe('helloWorldTest');
    });

    it('should convert snake_case to camelCase', () => {
        expect(camelCase('hello_world')).toBe('helloWorld');
        expect(camelCase('hello_world_test')).toBe('helloWorldTest');
    });

    it('should handle mixed separators', () => {
        expect(camelCase('hello-world_test')).toBe('helloWorldTest');
        expect(camelCase('hello world_test')).toBe('helloWorldTest');
    });

    it('should handle already camelCase strings', () => {
        expect(camelCase('helloWorld')).toBe('helloWorld');
        expect(camelCase('helloWorldTest')).toBe('helloWorldTest');
    });

    it('should handle PascalCase strings', () => {
        expect(camelCase('HelloWorld')).toBe('helloWorld');
        expect(camelCase('HelloWorldTest')).toBe('helloWorldTest');
    });

    it('should handle empty strings', () => {
        expect(camelCase('')).toBe('');
    });

    it('should handle single words', () => {
        expect(camelCase('hello')).toBe('hello');
        expect(camelCase('HELLO')).toBe('hELLO');
    });

    it('should handle strings with numbers', () => {
        expect(camelCase('hello world 123')).toBe('helloWorld123');
        expect(camelCase('test123')).toBe('test123');
    });

    it('should handle special characters', () => {
        expect(camelCase('hello-world_test!')).toBe('helloWorldTest!');
        expect(camelCase('hello@world')).toBe('hello@world');
    });
});

describe('kebabCase', () => {
    it('should convert space-separated words to kebab-case', () => {
        expect(kebabCase('hello world')).toBe('hello-world');
        expect(kebabCase('hello world test')).toBe('hello-world-test');
    });

    it('should convert camelCase to kebab-case', () => {
        expect(kebabCase('helloWorld')).toBe('hello-world');
        expect(kebabCase('helloWorldTest')).toBe('hello-world-test');
    });

    it('should convert PascalCase to kebab-case', () => {
        expect(kebabCase('HelloWorld')).toBe('hello-world');
        expect(kebabCase('HelloWorldTest')).toBe('hello-world-test');
    });

    it('should convert snake_case to kebab-case', () => {
        expect(kebabCase('hello_world')).toBe('hello-world');
        expect(kebabCase('hello_world_test')).toBe('hello-world-test');
    });

    it('should handle mixed separators', () => {
        expect(kebabCase('hello_world test')).toBe('hello-world-test');
        expect(kebabCase('helloWorld_test')).toBe('hello-world-test');
    });

    it('should handle already kebab-case strings', () => {
        expect(kebabCase('hello-world')).toBe('hello-world');
        expect(kebabCase('hello-world-test')).toBe('hello-world-test');
    });

    it('should handle empty strings', () => {
        expect(kebabCase('')).toBe('');
    });

    it('should handle single words', () => {
        expect(kebabCase('hello')).toBe('hello');
        expect(kebabCase('HELLO')).toBe('hello');
    });

    it('should handle strings with numbers', () => {
        expect(kebabCase('hello world 123')).toBe('hello-world-123');
        expect(kebabCase('test123')).toBe('test123');
    });

    it('should handle special characters', () => {
        expect(kebabCase('hello_world_test!')).toBe('hello-world-test!');
        expect(kebabCase('hello@world')).toBe('hello@world');
    });

    it('should trim leading and trailing hyphens', () => {
        expect(kebabCase('-hello-world-')).toBe('hello-world');
        expect(kebabCase('--hello--world--')).toBe('hello-world');
    });
});

describe('truncate', () => {
    it('should truncate strings longer than the specified length', () => {
        expect(truncate('Hello world', 5)).toBe('Hello...');
        expect(truncate('This is a long string', 10)).toBe('This is a ...');
    });

    it('should return the original string if it is shorter than the length', () => {
        expect(truncate('Hello', 10)).toBe('Hello');
        expect(truncate('Hi', 5)).toBe('Hi');
    });

    it('should return the original string if it equals the length', () => {
        expect(truncate('Hello', 5)).toBe('Hello');
        expect(truncate('Test', 4)).toBe('Test');
    });

    it('should handle empty strings', () => {
        expect(truncate('', 5)).toBe('');
    });

    it('should handle zero length', () => {
        expect(truncate('Hello', 0)).toBe('');
        expect(truncate('Test', -1)).toBe('');
    });

    it('should handle single character strings', () => {
        expect(truncate('A', 1)).toBe('A');
        expect(truncate('A', 2)).toBe('A');
        expect(truncate('A', 0)).toBe('');
    });

    it('should handle strings with special characters', () => {
        expect(truncate('Hello!@#$', 5)).toBe('Hello...');
        expect(truncate('Test 123', 4)).toBe('Test...');
    });

    it('should handle unicode characters', () => {
        expect(truncate('Hello 世界', 5)).toBe('Hello...');
        expect(truncate('测试', 1)).toBe('测...');
    });
});

describe('reverse', () => {
    it('should reverse simple strings', () => {
        expect(reverse('hello')).toBe('olleh');
        expect(reverse('world')).toBe('dlrow');
        expect(reverse('test')).toBe('tset');
    });

    it('should reverse strings with spaces', () => {
        expect(reverse('hello world')).toBe('dlrow olleh');
        expect(reverse('a b c')).toBe('c b a');
    });

    it('should reverse strings with special characters', () => {
        expect(reverse('hello!')).toBe('!olleh');
        expect(reverse('test@123')).toBe('321@tset');
    });

    it('should handle empty strings', () => {
        expect(reverse('')).toBe('');
    });

    it('should handle single character strings', () => {
        expect(reverse('a')).toBe('a');
        expect(reverse('!')).toBe('!');
    });

    it('should handle palindromes', () => {
        expect(reverse('racecar')).toBe('racecar');
        expect(reverse('level')).toBe('level');
    });

    it('should handle unicode characters', () => {
        expect(reverse('hello 世界')).toBe('界世 olleh');
        expect(reverse('测试')).toBe('试测');
    });

    it('should handle numbers as strings', () => {
        expect(reverse('12345')).toBe('54321');
        expect(reverse('0')).toBe('0');
    });
});
