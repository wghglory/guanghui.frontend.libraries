/**
 * 两数组公共子项查询 find shared value from complex array which includes 2 array.
 * @method findSharedFrom2Arr
 * @param  {[array]}   arr    must be[[],[]]
 * @return {[array]}           shared value in array
 * usage:
 * 			var data = [
			     [3, 8, 5],
			     [1, 9, 4, 3, 6, 7, 5, 2]
			 ]; //公共子项 3 , 5
			 console.log(findSharedFrom2Arr(data));
 */
function findSharedFrom2Arr(arr) {
    var arr0 = arrayDistinct(arr[0]);
    var arr1 = arrayDistinct(arr[1]);
    var result = [];
    for (var i = 0; i < arr0.length; i++) {
        for (var j = 0; j < arr1.length; j++) {
            if (arr0[i] == arr1[j]) {
                result.push(arr0[i]);
                break;
            }
        }
    }
    return result;
}


/**
 * findLongestSharedStringFrom2Arr 两数组公共最长字符串查询
 * bug: 如果有两个大串长度一样，只会显示后一个。如上面cccccc and asdsho, result will be asdsho
 * @method findLongestSharedStringFrom2Arr
 * @param  {[array]}                        arr [description]
 * @return {[string]}                            [description]
 * usage:
 * 			var data = ['asdshowcccccc', 'ccccccddshoweeasdsho']; // asdsho
				console.log(findLongestSharedStringFrom2Arr(data));
 */
function findLongestSharedStringFrom2Arr(arr) {
    var str0 = arr[0];
    var str1 = arr[1];
    var count = 0;
    var index = 0;
    for (var i = 0; i < str0.length; i++) {
        for (var j = 0; j < str1.length; j++) {
            if (str0.charAt(i) == str1.charAt(j)) {
                var k = 1;
                while (str0.charAt(i + k) == str1.charAt(j + k)) {
                    k++;
                    if (k > count) {
                        count = k;
                        index = i;
                    }
                }
            }
        }
    }
    return str0.substr(index, count);
}


/**
 * 这个数必须在每一个数组中出现过，即出现个数==大数组长度
 * 多数组公共子项查询 find shared value from complex array which includes many array.
 * @method findShared
 * @param  {[array]}   arr
 * @return {[array]}
 * usage:
 * 			var data = [
			     [3, 8, 5],
			     [1, 9, 4, 3, 6, 7, 5, 2],
			     [3, 4, 5],
			     [5, 6, 7, 3]
			 ]; //公共子项 3 , 5
			 console.log(findShared(data));
 */
function findShared(arr) {
    var wholeArr = [];
    var json = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        wholeArr = wholeArr.concat(arrayDistinct(arr[i])); //先去重每个小数组再合并到大数组
    }
    //console.log(wholeArr);
    for (var i = 0; i < wholeArr.length; i++) {
        if (!json[wholeArr[i]]) {
            json[wholeArr[i]] = [wholeArr[i]]; //json[3] = [3];
        } else {
            json[wholeArr[i]].push(wholeArr[i]); //json[3] = [3][3]...
        }
    }
    for (var attr in json) {
        if (json[attr].length == arr.length) {
            result.push(attr);
        }
    }
    return result;
}



/**
 * [findLongestSharedString 多组数公共最长字符串查询]
 * @method findLongestSharedString
 * @param  {[array]}   arr
 * @return {[string]}
 * usage:
 * 			var data = ['asdshow', 'helloshow', 'showhi', 'hahashowhehe']; //show
				console.log(findLongestSharedString(data));
 */
function findLongestSharedString(arr) {
    arr = sortByLength(arr); //根据长度排序，把最少长度的提取出来作为基准，建立正则，提高性能
    // console.log(arr);   // ["showhi", "asdshow", "helloshow", "hahashowhehe"]
    var firstStr = arr.shift(); //第一个作为比较基准
    var strArr = [];
    var count = 0;
    var result = '';
    // console.log(firstStr);   //showhi  string
    // console.log(arr);  // ["asdshow", "helloshow", "hahashowhehe"]

    //把所有组合列出来
    for (var i = 0; i < firstStr.length; i++) {
        for (var j = i + 1; j <= firstStr.length; j++) {
            strArr.push(firstStr.substring(i, j));
        }
    }
    // console.log(strArr);  // ["s", "sh", "sho", "show", "showh", "showhi", "h", "ho", "how", "howh", "howhi", "o", "ow", "owh", "owhi", "w", "wh", "whi", "h", "hi", "i"]

    // 上面每一个都作为正则匹配的依据，和arr进行匹配
    for (var i = 0; i < strArr.length; i++) {
        var wholeArr = [];
        var re = new RegExp(strArr[i]);
        for (var j = 0; j < arr.length; j++) { //匹配每一个arr子项
            var reArr = arr[j].match(re);
            if (reArr) {
                wholeArr = wholeArr.concat(reArr);
            }
        }
        // console.log(wholeArr);  // ["s", "s", "s"]
        // 4demo.html (第 38 行)
        // ["sh", "sh", "sh"]
        // 4demo.html (第 38 行)
        // ["sho", "sho", "sho"]
        // 4demo.html (第 38 行)
        // ["show", "show", "show"]
        // 4demo.html (第 38 行)
        // ["showh"]。。。。。。
        if (wholeArr.length == arr.length) {
            if (wholeArr[0].length > count) {
                count = wholeArr[0].length;
                result = wholeArr[0];
            }
        }
    }
    return result;
}


/**
 * remove duplicate values from array
 * @method arrayDistinct
 * @param  {[array]}    arr [array that needs to remove duplicate]
 * @return {[array]}        [refined array]
 */
function arrayDistinct(arr) {
    /*method 1: 拿出第一位，后面所有和它比较；第二次固定好第二位，后面再和他比较
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) {
                arr.splice(j, 1);
                j--;
            }
        }
    }
    return arr;*/

    /*method 2:
    var json = {};
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!json[arr[i]]) {
            json[arr[i]] = 1;
            result.push(arr[i]);
        }
    }
    return result;*/

    // method 3:
    return arr.filter(function(item, pos) {
        return arr.indexOf(item) == pos;
    });
}


/**
 * get index if an element exists in array, return -1 if not existing
 * @method indexInArray
 * @param  {[array]}          arr
 * @param  {[string/int]}     element    [element needs to be checked]
 * @return {[int]}                       [return index]
 */
function indexInArray(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return i;
        }
    }
    return -1;
}


/**
 * 类数组转换成数组
 */
var fruits = ['Banana', 'Orange', 'Lemon', 'Apple', 'Mango'];
console.log(fruits.slice(1, 3)); //["Orange", "Lemon"]
/**
 * int numbers to array int: console.log(toArray(1, 2, 3)); // [1, 2, 3]
 * @method toArray
 * @return {[array]}
 */
function toArray() {
    return Array.prototype.slice.call(arguments);
}
// 字符串转数组
console.log(Array.from('miaov')); //["m", "i", "a", "o", "v"]

var divs = document.getElementsByTagName('div');
// var arr = [].slice.call(divs);  //类数组转为数组
var arr = Array.from(divs); //ES6
console.log(arr);



/**
 * sort based on string length in array, ["hello","guanghui"] sort and guanghui will be longer
 * @method sortByLength
 * @param  {[array]}     arr [description]
 * @return {[int]}           [number compares with 0, to determine the order]
 */
function sortByLength(arr) {
    return arr.sort(function(str1, str2) {
        return str1.length - str2.length;
    });
}



/**
 * 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1.   arr.sort(randomSort);
 * @method randomSort
 * @param  {[type]}   a [description]
 * @param  {[type]}   b [description]
 * @return {[int]}     [-1 or 1]
 */
function randomSort(a, b) {
    return Math.random() > 0.5 ? -1 : 1;
}


/**
 * 快速排序
 * 使用方法： alert(quickSort([12, 5, 37, 6, 22, 40]));
 * @param  {[array]} arr [description]
 * @return {[array]}     [array after sort]
 * 1.找一个基准点
 * 2.建立两个数组，分别存储左边和右边的数组
 * 3.利用递归进行下次比较
 */
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    var num = Math.floor(arr.length / 2);
    var numValue = arr.splice(num, 1);

    var left = [];
    var right = [];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < numValue) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    // array1.concat(array2, array3,..., arrayX)
    return quickSort(left).concat([numValue], quickSort(right));
}
