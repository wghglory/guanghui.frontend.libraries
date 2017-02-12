/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 从1到maxNum，随机取count个数字
 * @param  {[int]} maxNum 
 * @param  {[int]} count  
 * @return {[array]} 
 * 使用：var number = randomNumArray(35, 7);
 * 返回1-35之间7个数字
 */
function randomNumArray(maxNum, count) {
    var arr = [];
    var newArr = [];

    for (var i = 1; i <= maxNum; i++) {
        arr.push(i);
    }

    for (var i = 0; i < count; i++) {
        newArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1));
    }
    return newArr;
}

/*console.log(generateRandomNumbers({
    'min': 4,
    'max': 100,
    'num': 5,
    sort: '<'
}));*/
function generateRandomNumbers(option) {
    var min = option.min || 0;
    var num = option.num; //随机数个数
    var max = option.max; //随机数最大值
    var sort = option.sort; //是否排序  '>'：从大到小排序   '<'：从小到大排序  不传则不排序

    var arr = []; //[10,20]
    var json = {}; //{'10':1,'20':1}   10

    while (arr.length < num) {
        var iNum = Math.round(Math.random() * max);

        if (!json[iNum] && iNum > min) {
            arr.push(iNum);
            json[iNum] = 1; //必须是一个真值，否则过滤不掉重复的数字。
        }
    }

    if (sort == '>') {
        arr.sort(function(a, b) {
            return b - a;
        });
        return arr;
    } else if (sort == '<') {
        arr.sort(function(a, b) {
            return a - b;
        });
        return arr;
    } else {
        return arr;
    }
}


/**
 * generate random array based on original array. maybe generate 7 count from original 100 count
 * 从数组中随机获取10%, 1/10*originArr.length
 * @param  {[array]} originArr [original array]
 * @param  {[int]}   count     [count wants to be generated]
 * @return {[array]}           [new random array]
 */
function generateRandomPartialArr(originArr, count) {
    var arr = [];
    var newArr = [];
    for (var i = 0; i < originArr; i++) {
        arr.push(i);
    }

    for (var i = 0; i < count; i++) {
        //随机找一个位置,删除一个元素,splice返回就是刚才删除的元素. splice会改变原来数组.
        newArr.push(arr.splice(Math.floor(Math.random() * arr.length), 1));
    }

    return newArr;
}
