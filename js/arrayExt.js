/** 删除数组中指定索引的数据 **/
Array.prototype.deleteAt = function(index) {
    if (index < 0) {
        return this;
    }
    return this.slice(0, index).concat(this.slice(index + 1, this.length));
};
/** 数组洗牌 **/
Array.prototype.random = function() {
    /*var tempArr = [],
        me = this,
        t;
    while (me.length > 0) {
        t = Math.floor(Math.random() * me.length);
        tempArr[tempArr.length] = me[t];
        me = me.deleteAt(t);
    }
    return tempArr;*/

    return this.sort(function() {
        return Math.random() > 0.5 ? "-1" : "1";
    });
};

/** 数字数组排序：1降序，0或者不传升序**/
Array.prototype.sortNum = function(i) {
    if (!i) {
        i = 0;
    }
    if (i == 1) {
        return this.sort(function(a, b) {
            return b - a;
        });
    }
    return this.sort(function(a, b) {
        return a - b;
    });

    /*从小到大
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;*/

    /*从大到小
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] > this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;*/
};
/** 获取数字数组中的最大项 **/
Array.prototype.getMax = function() {
    return this.sortNum(1)[0];

    /*var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] > oValue) {
            oValue = this[i];
        }
    }
    return oValue;*/
};
/** 获取数字数组中的最小项 **/
Array.prototype.getMin = function() {
    return this.sortNum(0)[0];

    /*var oValue = 0;
    for (var i = 0; i < this.length; i++) {
        if (this[i] < oValue) {
            oValue = this[i];
        }
    }
    return oValue;*/
};

/** 去除数组中的重复项 **/
Array.prototype.distinct = function() {
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
};

/** 原生有了。数组第一次出现指定元素的位置，注意O大写
Array.prototype.indexOf = function(o) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == o) {
            return i;
        }
    }
    return -1;
};
**/
