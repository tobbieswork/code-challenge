// There are multiple ways to solve the problem of summing numbers from 1 to a given number n.
// Below are several implementations using different approaches.
// JavaScript convention naming (camelCase).

// Solution 1: Using the formula n(n + 1)/2
// Solution 2: Using a loop
// Solution 3: Using recursion
// Additional solutions can be added as needed.

// Pros and cons of each approach:
// 1. Formula: O(1) time complexity, O(1) space complexity. Very efficient.
// 2. Loop: O(n) time complexity, O(1) space complexity. Simple and easy to understand, but less efficient for large n.
// 3. Recursion: O(n) time complexity, O(n) space complexity due to call stack. Elegant but can lead to stack overflow for large n.
// 4. Array.reduce: O(n) time complexity, O(n) space complexity due to array creation. Functional style but less efficient due to extra memory usage.

// Choose solution 1 for best performance in this specific case.
// Choose solution 2 for simplicity and clarity.
// Choose solution 3 for demonstrating recursion.
// Choose solution 4 for a functional programming approach.

/**
 * Sums numbers from 1 to n using the formula n(n + 1)/2.
 * @param {number} n The number up to which to sum.
 * @returns {number} The sum from 1 to n.
 */
export function sumToNumberFormula(n) {
    // Using the formula n(n + 1)/2
    if (n < 1) {
        return 0;
    }
    return (n * (n + 1)) / 2;
}

/**
 * Sums numbers from 1 to n using a loop.
 * @param {number} n The number up to which to sum.
 * @returns {number} The sum from 1 to n.
 */
export function sumToNumberLoop(n) {
    // Using a loop
    if (n < 1) {
        return 0;
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

/**
 * Sums numbers from 1 to n using recursion.
 * @param {number} n The number up to which to sum.
 * @returns {number} The sum from 1 to n.
 */
export function sumToNumberRecursive(n) {
    // Using recursion
    if (n < 1) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return n + sumToNumberRecursive(n - 1);
}

// More solutions:
/**
 * Sums numbers from 1 to n using Array.reduce.
 * @param {number} n The number up to which to sum.
 * @returns {number} The sum from 1 to n.
 */
export function sumToNumberReduce(d) {
    // Using Array.reduce
    if (d < 1) {
        return 0;
    }
    return Array.from({ length: d }, (_, i) => i + 1).reduce(
        (acc, val) => acc + val,
        0
    );
}
