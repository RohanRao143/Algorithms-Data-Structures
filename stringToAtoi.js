/**
 * 8. String to Integer (atoi)
Solved
Medium
Topics
premium lock icon
Companies
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.

 

Example 1:

Input: s = "42"

Output: 42

Explanation:

The underlined characters are what is read in and the caret is the current reader position.
Step 1: "42" (no characters read because there is no leading whitespace)
         ^
Step 2: "42" (no characters read because there is neither a '-' nor '+')
         ^
Step 3: "42" ("42" is read in)
 */



/**
 * @param {string} s
 * @return {number}
 */

const INT_MIN = Math.pow(-2, 31), INT_MAX = Math.pow(2, 31) - 1;
var myAtoi = function(s) {

    if (!s || !s.length) {
        return 0;
    }

    let isNegative = false;
    let result = '';
    let afterDigit = false;

    for(let index = 0; index < s.length; index++) {
        const char = s[index];
        if (!afterDigit && isNaN(parseInt(char))) {
            if (char == ' ') {
            } else if (char == '+') {
                isNegative = false;
                afterDigit = true;
            } else if (char == '-') {
                isNegative = true;
                afterDigit = true;
            } else {
                result = 0;
                break;
            }
            continue;
        }

        if (!isNaN(parseInt(char))) {
            afterDigit = true;
            result += char;
        } else {
            break;
        }
    }

    if (result == 0)
        return 0;
    
    let parsed = 0;

    for (let i = 0; i < result.length; i++) {
        let toAdd = parseInt(result[i]);
        if (result.length - i - 1 > 0) 
        toAdd *= Math.pow(10, result.length - i - 1);
        parsed += toAdd;
    }

    parsed = isNegative ? -parsed : parsed

    if (parsed > INT_MAX) {
        parsed = INT_MAX;
    } else if (parsed < INT_MIN) {
        parsed = INT_MIN;
    }

    return parsed;
};