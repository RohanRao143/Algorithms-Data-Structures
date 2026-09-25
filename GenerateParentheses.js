/**
 * 22. Generate Parentheses
Solved
Medium
Topics
premium lock icon
Companies
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

 

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 

Constraints:

1 <= n <= 8
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
    let result = new Set([]);

    for (let i = 0; i < n; i++) {
        const _result = new Set([]);
        if (i==0) {
            _result.add('()');
        } else {
            let j = 0;
            for (const value of result) {
                const current = value;
                let k = 0;
                let generated = '';
                while (k < current.length) {
                    generated = current.substring(0, k+1) + '()' + current.substring(k+1, current.length);
                    _result.add(generated);
                    k++;
                }
            }
        }
        result = new Set([..._result]);
    }

    return [...result];
};