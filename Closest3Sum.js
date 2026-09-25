/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var threeSumClosest = function(nums, target) {
    nums.sort((a, b) => a - b);

    let closest;
    let closestDifference;
    let i = 0;
    while (i<nums.length - 2) {
        const base = nums[i];


        let j = i + 1;
        let swap = true;

        while(j < nums.length - 1) {

        let k = nums.length -1;

        while (j < k) {
            let comp = (base + nums[j] + nums[k]) - target;
            comp = Math.abs(comp)

            if ((closestDifference != 0 && !closestDifference) ||  comp <= closestDifference) {
                closestDifference = Math.abs((base + nums[j] + nums[k]) - target);
                closest = (base + nums[j] + nums[k]);
            }

            k--;
        }
            j++;
        }


        i++;
    }

    return closest;
};