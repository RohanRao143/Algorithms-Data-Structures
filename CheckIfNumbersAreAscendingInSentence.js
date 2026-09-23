/**
 * 2042. Check if Numbers Are Ascending in a Sentence
Solved
Easy
Topics
premium lock icon
Companies
Hint
A sentence is a list of tokens separated by a single space with no leading or trailing spaces. Every token is either a positive number consisting of digits 0-9 with no leading zeros, or a word consisting of lowercase English letters.

For example, "a puppy has 2 eyes 4 legs" is a sentence with seven tokens: "2" and "4" are numbers and the other tokens such as "puppy" are words.
Given a string s representing a sentence, you need to check if all the numbers in s are strictly increasing from left to right (i.e., other than the last number, each number is strictly smaller than the number on its right in s).

Return true if so, or false otherwise.
 */

/**
 * @param {string} s
 * @return {boolean}
 */
var areNumbersAscending = function(s) {
    let inAscending = true;

    let prev = null;
    let next = null;
    let i = 0;
    let numStarted = false;
    let curr = null;

    while (i < s.length) {
        const result = getNumber(s, i);
        if (result == null) {
            i++;
            // continue;
        } else {
            const current = result[0];
            if (prev == null) {
                prev = current;
            } else {
                if (current > prev) {
                    prev = current;
                } else {
                    inAscending = false;
                    break;
                }
            }

            i = result[1] + 1;
        }
    }
    
    return inAscending;
};

function getNumber(str, start) {
    if (str.length - 1 == start) {
        const current = parseInt(str[start]);
        return isNaN(current) ? null : [current, start];
    }

    let result = 0;
    let end = start;
    for (let i = start; i < str.length; i++) {
        const current = parseInt(str[i]);
        if (isNaN(current)) {
            break;
        }
        result *= 10;
        result += current;
        end = i;
    }

    return result != null && result != 0 ? [result, end] : null
}