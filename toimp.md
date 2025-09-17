✅ Array Utilities
[Done] chunk(array, size) → Split array into groups of given size.
[Done] compact(array) → Remove falsy values (false, 0, null, undefined, NaN, "").
[Done] flatten(array, deep?) → Flatten nested arrays (shallow/deep).
[Done] uniq(array) → Return unique values.
[Done] difference(array, values) → Elements in array not in values.
[Done] intersection(...arrays) → Common values across arrays.
[Done] groupBy(array, fn | key) → Group items by function result or key.

✅ Object Utilities
deepClone(obj) → Deep copy an object.
merge(obj1, obj2) → Merge two objects (deep).
get(obj, path, defaultValue) → Safe access nested properties.
set(obj, path, value) → Set value at a nested property.
omit(obj, keys) → Return new object without specific keys.
pick(obj, keys) → Return object with only specific keys.

✅ String Utilities
capitalize(str) → Make first letter uppercase.
camelCase(str) → Convert string to camelCase.
kebabCase(str) → Convert string to kebab-case.
truncate(str, length) → Cut string with ... if too long.
reverse(str) → Reverse string characters.

✅ Number Utilities
random(min, max) → Random integer in range.
clamp(num, min, max) → Restrict number within bounds.
sum(array) → Sum of numbers.
average(array) → Mean of numbers.

✅ Validation Utilities
isEmpty(value) → Check if object/array/string is empty.
isEqual(a, b) → Deep comparison of two values.
isEmail(str) → Validate email format.
isUUID(str) → Validate UUID.
isDate(value) → Check if value is valid date.