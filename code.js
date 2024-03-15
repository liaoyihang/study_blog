function LIS(nums) {
    if (nums.length === 0) {
        return []
    }
    
    const results = [[nums[0]]]

    for (let index = 0; index < nums.length; index++) {
        const n = nums[index];
        _update(n)
    }

    function _update(n) {
        console.log("开始本次更新");
        for(let i = results.length - 1; i >= 0; i--) {
            const line = results[i]
            const tail = line[line.length -1]
            if (n > tail) {
                results[i + 1] = [...line, n]
                console.log(`更新results的第${i+1}行, n为${n}, tail为${tail}, 更新前: [${line}]，更新后: [${results[i + 1]}]`);
                break
            } else if (n < tail && i ===0) {
                results[i] = [n]
                console.log(`更新results的第${i}行, n为${n}, tail为${tail},  更新前: [${line}]，更新后: [${results[i]}]`);
            }
        }
        console.log("结束本次更新\n");
    }

    return results
}
// [4, 5, 1, 2, 7, 3, 6, 9]
// [1, 2, 3, 6, 9]
// const res = LIS([4, 5, 1, 2, 7, 3, 6, 9, 3, 5, 10])
const res = LIS([102, 103, 101, 105, 106, 108, 107, 109, 104])
console.log(res);