# TinyDash

A lightweight utility library for common array operations in TypeScript. TinyDash provides essential array manipulation functions with full TypeScript support and zero dependencies.

## Features

- 🚀 **Zero Dependencies** - Lightweight and fast
- 📦 **TypeScript First** - Full type safety and IntelliSense support
- 🎯 **Tree Shakeable** - Import only what you need
- 🧪 **Well Tested** - Comprehensive test coverage
- 📚 **JSDoc** - Detailed documentation and examples

## Installation

```bash
npm install @shockwavejs/tinydash
```

```bash
yarn add @shockwavejs/tinydash
```

```bash
pnpm add @shockwavejs/tinydash
```

## Usage

```typescript
import { 
  chunk, compact, flatten, uniq, difference, intersection, groupBy,
  deepClone, merge, get, set, omit, pick,
  capitalize, camelCase, kebabCase, truncate, reverse,
  random, clamp, sum, average,
  isEmpty, isEqual, isEmail, isUUID, isDate
} from '@shockwavejs/tinydash';

// Chunk array into smaller arrays
const numbers = [1, 2, 3, 4, 5];
const chunks = chunk(numbers, 2);
// Result: [[1, 2], [3, 4], [5]]

// Remove falsy values
const mixed = [1, 2, 0, null, undefined, '', false, 3];
const cleaned = compact(mixed);
// Result: [1, 2, 3]

// Flatten arrays
const nested = [1, [2, [3, [4]]]];
const flat = flatten(nested, true);
// Result: [1, 2, 3, 4]

// Get unique values
const duplicates = [1, 2, 3, 2, 1, 3];
const unique = uniq(duplicates);
// Result: [1, 2, 3]

// Find differences
const arr1 = [1, 2, 3, 4];
const arr2 = [2, 3, 5];
const diff = difference(arr1, arr2);
// Result: [1, 4]

// Find intersections
const arrays = [[1, 2, 3], [2, 3, 4], [3, 4, 5]];
const common = intersection(arrays);
// Result: [3]

// Group by function
const numbers = [1, 2, 3, 4, 5, 6];
const grouped = groupBy(numbers, (n) => n % 2 === 0 ? 'even' : 'odd');
// Result: { odd: [1, 3, 5], even: [2, 4, 6] }

// Deep clone objects
const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
// Result: { a: 1, b: { c: 2 } } (independent copy)

// Merge objects deeply
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { b: { d: 3 }, e: 4 };
const merged = merge(obj1, obj2);
// Result: { a: 1, b: { c: 2, d: 3 }, e: 4 }

// Safe property access
const data = { user: { profile: { name: 'John' } } };
const name = get(data, 'user.profile.name', 'Unknown');
// Result: 'John'

// Set nested properties
const obj = {};
const result = set(obj, 'a.b.c', 1);
// Result: { a: { b: { c: 1 } } }

// Omit properties
const user = { id: 1, name: 'John', email: 'john@example.com' };
const publicUser = omit(user, ['email']);
// Result: { id: 1, name: 'John' }

// Pick specific properties
const fullUser = { id: 1, name: 'John', email: 'john@example.com', password: 'secret' };
const safeUser = pick(fullUser, ['id', 'name', 'email']);
// Result: { id: 1, name: 'John', email: 'john@example.com' }

// Capitalize strings
const title = capitalize('hello world');
// Result: 'Hello world'

// Convert to camelCase
const camel = camelCase('hello-world test');
// Result: 'helloWorldTest'

// Convert to kebab-case
const kebab = kebabCase('helloWorld test');
// Result: 'hello-world-test'

// Truncate strings
const short = truncate('This is a very long string', 10);
// Result: 'This is a ...'

// Reverse strings
const reversed = reverse('hello');
// Result: 'olleh'

// Generate random numbers
const randomNum = random(1, 10);
// Result: 7 (random number between 1 and 10)

// Clamp numbers within bounds
const clamped = clamp(15, 0, 10);
// Result: 10

// Calculate sum and average
const numbers = [1, 2, 3, 4, 5];
const total = sum(numbers);
// Result: 15
const mean = average(numbers);
// Result: 3

// Check if values are empty
const empty = isEmpty('');
// Result: true
const notEmpty = isEmpty('hello');
// Result: false

// Deep equality comparison
const equal = isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } });
// Result: true

// Validate email and UUID
const validEmail = isEmail('user@example.com');
// Result: true
const validUUID = isUUID('123e4567-e89b-12d3-a456-426614174000');
// Result: true

// Check if value is a valid date
const validDate = isDate('2023-01-01');
// Result: true
```

## API Reference

### `chunk<T>(array: T[], size: number): T[][]`

Splits an array into chunks of specified size.

**Parameters:**
- `array` - The array to split
- `size` - The chunk size (must be greater than 0)

**Returns:** A new array of chunks

**Example:**
```typescript
chunk([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
```

### `compact<T>(array: T[]): T[]`

Removes falsy values (false, 0, null, undefined, NaN, "").

**Parameters:**
- `array` - The array to compact

**Returns:** A new array with falsy values removed

**Example:**
```typescript
compact([1, 2, 0, null, undefined, '', false]) // [1, 2]
```

### `flatten<T>(array: T[], deep?: boolean): T[]`

Flattens nested arrays.

**Parameters:**
- `array` - The array to flatten
- `deep` - Whether to flatten deeply (default: false)

**Returns:** A new flattened array

**Example:**
```typescript
flatten([1, [2, [3]]]) // [1, 2, [3]]
flatten([1, [2, [3]]], true) // [1, 2, 3]
```

### `uniq<T>(array: T[]): T[]`

Returns unique values from an array.

**Parameters:**
- `array` - The array to get unique values from

**Returns:** A new array with unique values

**Example:**
```typescript
uniq([1, 2, 3, 2, 1]) // [1, 2, 3]
```

### `difference<T>(array: T[], values: T[]): T[]`

Returns elements in array not in values.

**Parameters:**
- `array` - The array to check
- `values` - The values to exclude

**Returns:** A new array with difference values

**Example:**
```typescript
difference([1, 2, 3, 4], [2, 3]) // [1, 4]
```

### `intersection<T>(arrays: T[][]): T[]`

Returns common values across arrays.

**Parameters:**
- `arrays` - Array of arrays to find intersection

**Returns:** A new array with common values

**Example:**
```typescript
intersection([[1, 2, 3], [2, 3, 4], [3, 4, 5]]) // [3]
```

### `groupBy<T>(array: T[], fn: (item: T) => string): Record<string, T[]>`

Groups items by function result or key.

**Parameters:**
- `array` - The array to group
- `fn` - The function to group by

**Returns:** An object with grouped values

**Example:**
```typescript
groupBy([1, 2, 3, 4, 5], (n) => n % 2 === 0 ? 'even' : 'odd')
// { odd: [1, 3, 5], even: [2, 4] }
```

### `deepClone<T>(obj: T): T`

Creates a deep copy of an object, handling circular references.

**Parameters:**
- `obj` - The object to clone

**Returns:** A deep copy of the object

**Example:**
```typescript
deepClone({ a: 1, b: { c: 2 } }) // { a: 1, b: { c: 2 } }
```

### `merge<T, U>(obj1: T, obj2: U): T & U`

Merges two objects deeply, with the second object taking precedence.

**Parameters:**
- `obj1` - The first object
- `obj2` - The second object

**Returns:** A new merged object

**Example:**
```typescript
merge({ a: 1, b: { c: 2 } }, { b: { d: 3 } }) // { a: 1, b: { c: 2, d: 3 } }
```

### `get<T>(obj: any, path: string, defaultValue?: T): T | undefined`

Safely accesses nested properties using dot notation.

**Parameters:**
- `obj` - The object to access
- `path` - The dot-separated path
- `defaultValue` - The default value if path doesn't exist

**Returns:** The value at the path or default value

**Example:**
```typescript
get({ a: { b: { c: 1 } } }, 'a.b.c') // 1
get({ a: { b: { c: 1 } } }, 'a.b.d', 'default') // 'default'
```

### `set<T>(obj: any, path: string, value: T): any`

Sets a value at a nested property using dot notation.

**Parameters:**
- `obj` - The object to modify
- `path` - The dot-separated path
- `value` - The value to set

**Returns:** The modified object

**Example:**
```typescript
set({}, 'a.b.c', 1) // { a: { b: { c: 1 } } }
```

### `omit<T, K>(obj: T, keys: K[]): Omit<T, K>`

Returns a new object without the specified keys.

**Parameters:**
- `obj` - The object to omit keys from
- `keys` - The keys to omit

**Returns:** A new object without the specified keys

**Example:**
```typescript
omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { b: 2 }
```

### `pick<T, K>(obj: T, keys: K[]): Pick<T, K>`

Returns a new object with only the specified keys.

**Parameters:**
- `obj` - The object to pick keys from
- `keys` - The keys to pick

**Returns:** A new object with only the specified keys

**Example:**
```typescript
pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
```

### `capitalize(str: string): string`

Capitalizes the first letter of a string.

**Parameters:**
- `str` - The string to capitalize

**Returns:** A new string with the first letter capitalized

**Example:**
```typescript
capitalize('hello world') // 'Hello world'
```

### `camelCase(str: string): string`

Converts a string to camelCase format.

**Parameters:**
- `str` - The string to convert

**Returns:** A new string in camelCase format

**Example:**
```typescript
camelCase('hello world') // 'helloWorld'
camelCase('hello-world') // 'helloWorld'
camelCase('hello_world') // 'helloWorld'
```

### `kebabCase(str: string): string`

Converts a string to kebab-case format.

**Parameters:**
- `str` - The string to convert

**Returns:** A new string in kebab-case format

**Example:**
```typescript
kebabCase('hello world') // 'hello-world'
kebabCase('helloWorld') // 'hello-world'
kebabCase('hello_world') // 'hello-world'
```

### `truncate(str: string, length: number): string`

Truncates a string to a specified length and adds ellipsis if needed.

**Parameters:**
- `str` - The string to truncate
- `length` - The maximum length

**Returns:** A new truncated string

**Example:**
```typescript
truncate('Hello world', 5) // 'Hello...'
truncate('Hello', 10) // 'Hello'
```

### `reverse(str: string): string`

Reverses the characters in a string.

**Parameters:**
- `str` - The string to reverse

**Returns:** A new reversed string

**Example:**
```typescript
reverse('hello') // 'olleh'
reverse('world') // 'dlrow'
```

### `random(min: number, max: number): number`

Generates a random integer between min and max (inclusive).

**Parameters:**
- `min` - The minimum value (inclusive)
- `max` - The maximum value (inclusive)

**Returns:** A random integer between min and max

**Example:**
```typescript
random(1, 10) // 7 (random number between 1 and 10)
random(0, 100) // 42 (random number between 0 and 100)
```

### `clamp(num: number, min: number, max: number): number`

Clamps a number between min and max values.

**Parameters:**
- `num` - The number to clamp
- `min` - The minimum value
- `max` - The maximum value

**Returns:** The clamped number

**Example:**
```typescript
clamp(5, 0, 10) // 5
clamp(-5, 0, 10) // 0
clamp(15, 0, 10) // 10
```

### `sum(array: number[]): number`

Calculates the sum of numbers in an array.

**Parameters:**
- `array` - The array of numbers to sum

**Returns:** The sum of all numbers

**Example:**
```typescript
sum([1, 2, 3, 4, 5]) // 15
sum([1.5, 2.5, 3.5]) // 7.5
```

### `average(array: number[]): number`

Calculates the average (mean) of numbers in an array.

**Parameters:**
- `array` - The array of numbers to average

**Returns:** The average of all numbers

**Example:**
```typescript
average([1, 2, 3, 4, 5]) // 3
average([1.5, 2.5, 3.5]) // 2.5
```

### `isEmpty(value: any): boolean`

Checks if a value is empty (null, undefined, empty string, empty array, or empty object).

**Parameters:**
- `value` - The value to check

**Returns:** True if the value is empty, false otherwise

**Example:**
```typescript
isEmpty('') // true
isEmpty([]) // true
isEmpty({}) // true
isEmpty('hello') // false
```

### `isEqual(a: any, b: any): boolean`

Performs deep equality comparison between two values.

**Parameters:**
- `a` - The first value to compare
- `b` - The second value to compare

**Returns:** True if values are deeply equal, false otherwise

**Example:**
```typescript
isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } }) // true
isEqual([1, 2, 3], [1, 2, 3]) // true
```

### `isEmail(str: string): boolean`

Validates if a string is a valid email address.

**Parameters:**
- `str` - The string to validate

**Returns:** True if the string is a valid email, false otherwise

**Example:**
```typescript
isEmail('user@example.com') // true
isEmail('invalid-email') // false
```

### `isUUID(str: string): boolean`

Validates if a string is a valid UUID.

**Parameters:**
- `str` - The string to validate

**Returns:** True if the string is a valid UUID, false otherwise

**Example:**
```typescript
isUUID('123e4567-e89b-12d3-a456-426614174000') // true
isUUID('invalid-uuid') // false
```

### `isDate(value: any): boolean`

Checks if a value is a valid Date object or can be parsed as a date.

**Parameters:**
- `value` - The value to check

**Returns:** True if the value is a valid date, false otherwise

**Example:**
```typescript
isDate(new Date()) // true
isDate('2023-01-01') // true
isDate('invalid-date') // false
```

## Development

### Prerequisites

- Node.js >= 14.0.0
- npm, yarn, or pnpm

### Setup

```bash
# Clone the repository
git clone https://github.com/MostafaSamer/TinyDash.git
cd TinyDash

# Install dependencies
npm install

# Run tests
npm test

# Build the package
npm run build

# Run in development mode
npm run dev
```

### Testing

```bash
npm test
```

## License

MIT © [Mostafa Samir](https://github.com/MostafaSamer)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### 1.3.0
- Added number utility functions: random, clamp, sum, average
- Added validation utility functions: isEmpty, isEqual, isEmail, isUUID, isDate
- Comprehensive test coverage for all new utilities (164 total tests)
- Enhanced number and validation capabilities

### 1.2.0
- Added string utility functions: capitalize, camelCase, kebabCase, truncate, reverse
- Comprehensive test coverage for all string utilities
- Enhanced string manipulation capabilities

### 1.1.0
- Added object utility functions: deepClone, merge, get, set, omit, pick
- Enhanced deepClone to handle circular references
- Comprehensive test coverage for all object utilities

### 1.0.0
- Initial release
- Added array utility functions: chunk, compact, flatten, uniq, difference, intersection, groupBy
- Full TypeScript support
- Comprehensive test coverage
