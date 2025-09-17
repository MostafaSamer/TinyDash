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
import { chunk, compact, flatten, uniq, difference, intersection, groupBy } from '@shockwavejs/tinydash';

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

### 1.0.0
- Initial release
- Added array utility functions: chunk, compact, flatten, uniq, difference, intersection, groupBy
- Full TypeScript support
- Comprehensive test coverage
