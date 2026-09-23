/**
 * 11. Container With Most Water
Solved
Medium
Topics
premium lock icon
Companies
Hint
You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store.

Notice that you may not slant the container.

 

Example 1:


Input: height = [1,8,6,2,5,4,8,3,7]
Output: 49
Explanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
Example 2:

Input: height = [1,1]
Output: 1
 */


/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
  let i = 0, j = height.length - 1, left = 0, right = height.length -1;
  let area = getArea(height, left, right, 0)[0];
  while (i < j) {
    if (height[left] < height[i]) {
        state = getArea(height, i, j, area);
        if (state[1]) {
            area = state[0];
            left = i
        }
    } else if (height[right] < height[j]) {
        state = getArea(height, i, j, area);
        if (state[1]) {
            area = state[0];
            right = j;
        }
    }

    // if (height[left] > height[right]) {
    //     j--;
    // } else if (height[left] < height[right]) {
    //     i++;
    // } else {
        if (height[i] > height[j]) {
            j--;
        } else {
            i++;
        }
    // }
  }

  return area;
};

function getArea(height, i, j, area) {
    const _height = Math.min(height[i], height[j]);
    const width = j-i;
    let _area = area;
    let updated = false;
    if ((_height * width) > _area) {
        _area = _height * width;
        updated = true;
    }
    return [_area, updated];
}