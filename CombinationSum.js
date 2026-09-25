/**
 * 39. Combination Sum
Solved
Medium
Topics
premium lock icon
Companies
Given an array of distinct integers candidates and a target integer target, return a list of all unique combinations of candidates where the chosen numbers sum to target. You may return the combinations in any order.

The same number may be chosen from candidates an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.

The test cases are generated such that the number of unique combinations that sum up to target is less than 150 combinations for the given input.

 

Example 1:

Input: candidates = [2,3,6,7], target = 7
Output: [[2,2,3],[7]]
Explanation:
2 and 3 are candidates, and 2 + 2 + 3 = 7. Note that 2 can be used multiple times.
7 is a candidate, and 7 = 7.
These are the only two combinations.
Example 2:

Input: candidates = [2,3,5], target = 8
Output: [[2,2,2,2],[2,3,3],[3,5]]
Example 3:

Input: candidates = [2], target = 1
Output: []
 

Constraints:

1 <= candidates.length <= 30
2 <= candidates[i] <= 40
All elements of candidates are distinct.
1 <= target <= 40
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */


const COMBINATIONS = {

}


var getRepititiveCombinations = function(combination, target) {
    combination.sort();
    
    const results = [];

    function exploreCombinations(currentIndex, currentCombination, remainingTarget) {
        if (currentIndex >= combination.length) {
            return
        }
        
        if (remainingTarget == 0) {
            results.push(currentCombination);
            return;
        }

        if (remainingTarget < 0) {
            return;
        }

        // path a repeat current number;
        const current = combination[currentIndex];

        // Remove it from remaining target and add it to current combination;
        exploreCombinations(currentIndex, currentCombination.push(current), remainingTarget - current);

        // Remove last element ?
        currentCombination.pop();

        // Path B add another number by shifting index
        exploreCombinations(currentIndex + 1, currentCombination, remainingTarget);
    }

    exploreCombinations(0, [], target);

    return results;

}

var getRepititiveCombinationsV2 = function(combination, target) {
    // Note: Use (a, b) => a - b for numeric sorting in JS, 
    // otherwise .sort() treats numbers as strings (e.g., 10 comes before 2)
    combination.sort((a, b) => a - b);
    
    if (COMBINATIONS[`${JSON.stringify(combination)}-${target}`]) {
        return COMBINATIONS[`${JSON.stringify(combination)}-${target}`];
    }
    
    const results = [];

    function exploreCombinations(currentIndex, currentCombination, remainingTarget) {
        // BUG 1 FIX: Check if we successfully hit the target FIRST 
        // before checking if we ran out of array indices.
        if (remainingTarget === 0) {
            // BUG 2 FIX: Push a shallow COPY [...array] so future .pop()s don't ruin it
            results.push([...currentCombination]);
            return;
        }

        if (remainingTarget < 0) {
            return;
        }

        if (currentIndex >= combination.length) {
            return;
        }

        // Path A: Repeat current number
        const current = combination[currentIndex];
        currentCombination.push(current);

        // Recurse keeping the same currentIndex
        exploreCombinations(currentIndex, currentCombination, remainingTarget - current);

        // Backtrack: Remove the last element
        currentCombination.pop();

        // Path B: Skip this number completely and shift index forward
        exploreCombinations(currentIndex + 1, currentCombination, remainingTarget);
    }

    exploreCombinations(0, [], target);

    COMBINATIONS[`${JSON.stringify(combination)}-${target}`] = results;
    return results;
};


var combinationSum = function(candidates, target) {
    candidates.sort((a,b)=> a-b);
    const filteredCandidates = candidates.filter((a) => a <= target);

    let combinations = [[]];

    const results = [];
    for (let i = 0; i<filteredCandidates.length; i++) {
        let _combinations = [];
        combinations.forEach((comb) => {
            _combinations.push([...comb, filteredCandidates[i]]);
        });
        combinations.push(..._combinations);
    }
    let filteredCombinations = combinations.filter(comb => comb.length && comb.reduce((a,b)=> a+b) <= target);


    // return filteredCombinations;

    // foeach combinations if the sume is target add it to result, if it is less than target find combinations of target - sum and all that combinations need to be glued to original combination
    
    filteredCombinations.forEach((comb) => {
        if (comb.length) {
            if (comb.reduce((a,b)=> a+b) == target) {
                results.push(comb);
            } else {
                let tempCombinations = getRepititiveCombinationsV2(comb, target - comb.reduce((a,b)=> a+b));
                tempCombinations = tempCombinations.map(_ => [...comb, ..._]);
                results.push(...tempCombinations);
            }
            
        }
    });

    return results;

};


// getRepititiveCombinationsV2 itself works as a solution.