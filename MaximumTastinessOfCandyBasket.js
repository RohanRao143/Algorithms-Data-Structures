/**
 * 2517. Maximum Tastiness of Candy Basket
Solved
Medium
Topics
premium lock icon
Companies
Hint
You are given an array of positive integers price where price[i] denotes the price of the ith candy and a positive integer k.

The store sells baskets of k distinct candies. The tastiness of a candy basket is the smallest absolute difference of the prices of any two candies in the basket.

Return the maximum tastiness of a candy basket.

 

Example 1:

Input: price = [13,5,1,8,21,2], k = 3
Output: 8
Explanation: Choose the candies with the prices [13,5,21].
The tastiness of the candy basket is: min(|13 - 5|, |13 - 21|, |5 - 21|) = min(8, 8, 16) = 8.
It can be proven that 8 is the maximum tastiness that can be achieved.
Example 2:

Input: price = [1,3,1], k = 2
Output: 2
Explanation: Choose the candies with the prices [1,3].
The tastiness of the candy basket is: min(|1 - 3|) = min(2) = 2.
It can be proven that 2 is the maximum tastiness that can be achieved.
Example 3:

Input: price = [7,7,7,7], k = 2
Output: 0
Explanation: Choosing any two distinct candies from the candies we have will result in a tastiness of 0.
 

Constraints:

2 <= k <= price.length <= 105
1 <= price[i] <= 109
 */



/**
 * @param {number[]} price
 * @param {number} k
 * @return {number}
 */
var maximumTastiness = function(price, k) {
    price.sort((a, b) => a - b);

    // FIX: Wrapped in Math.floor to ensure mid stays an integer
    let checked = [];
    let low = 0;
    let high = price[price.length - 1] - price[0];

    let result = [];
    let maximumOfMinimum = 0;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);

        let target = mid + price[0];
        result = [price[0]];
        for (let i = 1; i<price.length; i++) {
            if (price[i] >= target) {
                result.push(price[i]);
                target = mid + price[i];
            }
        }

        if (result.length >= k) {
            maximumOfMinimum = mid; // This mid works! Save it.
            low = mid + 1;          // Eliminate everything smaller, try a bigger gap.
        } else {
            high = mid - 1;         // This mid is too big. Eliminate everything larger.
        }
    }

    return maximumOfMinimum;
};
