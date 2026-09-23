/**
 * 12. Integer to Roman
Solved
Medium
Topics
premium lock icon
Companies
Seven different symbols represent Roman numerals with the following values:

Symbol	Value
I	1
V	5
X	10
L	50
C	100
D	500
M	1000
Roman numerals are formed by appending the conversions of decimal place values from highest to lowest. Converting a decimal place value into a Roman numeral has the following rules:

If the value does not start with 4 or 9, select the symbol of the maximal value that can be subtracted from the input, append that symbol to the result, subtract its value, and convert the remainder to a Roman numeral.
If the value starts with 4 or 9 use the subtractive form representing one symbol subtracted from the following symbol, for example, 4 is 1 (I) less than 5 (V): IV and 9 is 1 (I) less than 10 (X): IX. Only the following subtractive forms are used: 4 (IV), 9 (IX), 40 (XL), 90 (XC), 400 (CD) and 900 (CM).
Only powers of 10 (I, X, C, M) can be appended consecutively at most 3 times to represent multiples of 10. You cannot append 5 (V), 50 (L), or 500 (D) multiple times. If you need to append a symbol 4 times use the subtractive form.
Given an integer, convert it to a Roman numeral.

 

Example 1:

Input: num = 3749

Output: "MMMDCCXLIX"

Explanation:

3000 = MMM as 1000 (M) + 1000 (M) + 1000 (M)
 700 = DCC as 500 (D) + 100 (C) + 100 (C)
  40 = XL as 10 (X) less of 50 (L)
   9 = IX as 1 (I) less of 10 (X)
Note: 49 is not 1 (I) less of 50 (L) because the conversion is based on decimal places
Example 2:

Input: num = 58

Output: "LVIII"

Explanation:

50 = L
 8 = VIII
Example 3:

Input: num = 1994

Output: "MCMXCIV"

Explanation:

1000 = M
 900 = CM
  90 = XC
   4 = IV
 

Constraints:

1 <= num <= 3999
 */


/**
 * @param {number} num
 * @return {string}
 */

const MAP = {1: 'I', 5: 'V', 10: 'X', 50: 'L', 100: 'C', 500: 'D', 1000: 'M'};

var intToRoman = function(num) {
  const result = [];
  let i = 1;
  while (num > 0) {
    const place = num % 10;

    result.push(place*i);

    num = Math.floor(num/10);

    i *= 10;
  }

  return toRoman(result)
};


function toRoman(a) {
    let result = ''
    let i = a.length;
    while(i > 0) {
        i--;
        const _ = a[i]
        if (i>= 3) {
          result += (new Array(_/1000)).fill(MAP[1000]).join('');    
        } else if (i == 2) {
            let target = _/100;
            let temp = '';
            if (target > 3 && target < 5) {
                target = 5 - target;
                result += (new Array(target)).fill(MAP[100]).join('')
                result += MAP[500];
                continue;
            } else if (target <= 3) {
                result += (new Array(target)).fill(MAP[100]).join('')
                continue;
            }
            target -= 5;
            if (target <= 3) {
                temp = MAP[500]
                temp += (new Array(target)).fill(MAP[100]).join('')
            } else {
                target = 5 - target;
                temp = (new Array(target)).fill(MAP[100]).join('')
                temp += MAP[1000]
            }
            result += temp;
        } else if (i==1) {
            let target = _/10;
            let temp = '';
            if (target > 3 && target < 5) {
                target = 5 - target;
                result += (new Array(target)).fill(MAP[10]).join('')
                result += MAP[50];
                continue;
            } else if (target <= 3) {
                result += (new Array(target)).fill(MAP[10]).join('')
                continue;
            }
            target -= 5;
            if (target <= 3) {
                temp = MAP[50]
                temp += (new Array(target)).fill(MAP[10]).join('')
            } else {
                target = 5 - target;
                temp = (new Array(target)).fill(MAP[10]).join('')
                temp += MAP[100]
            }
            result += temp;
        } else {
            let target = _;
            let temp = '';
            if (target > 3 && target < 5) {
                target = 5 - target;
                result += (new Array(target)).fill(MAP[1]).join('')
                result += MAP[5];
                continue;
            } else if (target <= 3) {
                result += (new Array(target)).fill(MAP[1]).join('')
                continue;
            }
            target -= 5;
            if (target <= 3) {
                temp = MAP[5]
                temp += (new Array(target)).fill(MAP[1]).join('')
            } else {
                target = 5 - target;
                temp = (new Array(target)).fill(MAP[1]).join('')
                temp += MAP[10]
            }
            result += temp;
        }
    }

    return result
}