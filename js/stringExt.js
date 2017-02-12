/** 删除指定索引位置的字符，索引无效将不删除任何字符 **/
String.prototype.deleteCharAt = function(index) {
    if (index < 0 || index >= this.length) {
        return this.valueOf();
    } else if (index === 0) {
        return this.substring(1, this.length);
    } else if (index == this.length - 1) {
        return this.substring(0, this.length - 1);
    } else {
        return this.substring(0, index) + this.substring(index + 1);
    }
};
/** 删除指定索引区间的字符串 **/
String.prototype.deleteChars = function(start, end) {
    if (start == end) {
        return this.deleteCharAt(start);
    } else {
        if (start > end) {
            var temp = start;
            start = end;
            end = temp;
        }
        if (start < 0) {
            start = 0;
        }
        if (end > this.length - 1) {
            end = this.length - 1;
        }
        return this.substring(0, start) + this.substring(end + 1, this.length);
    }
};

/** 将指定的字符串插入到指定的位置后面，索引无效将直接追加到字符串的末尾 **/
String.prototype.insertAt = function(offset, subStr) {
    if (offset < 0 || offset >= this.length - 1) {
        return this.concat(subStr);
    }
    return this.substring(0, offset + 1) + subStr + this.substring(offset + 1);
};

/** 将指定的位置的字符设置为另外指定的字符或字符串.索引无效将直接返回不做任何处理 **/
String.prototype.changeCharAt = function(index, subStr) {
    if (index < 0 || index > this.length - 1) {
        return this.valueOf();
    }
    return this.substring(0, index) + subStr + this.substring(index + 1);
};

/** 检查字符串是否以subStr开头 **/
String.prototype.startWith = function(subStr) {
    if (subStr.length > this.length) {
        return false;
    }
    return (this.indexOf(subStr) === 0) ? true : false;
};

/** 检查字符串是否以subStr结尾 **/
String.prototype.endWith = function(subStr) {
    if (subStr.length > this.length) {
        return false;
    } else {
        return (this.lastIndexOf(subStr) == (this.length - subStr.length)) ? true : false;
    }
};

/** 将字符串反序排列 **/
String.prototype.reverse = function() {
    // var temp = "";
    // for (var i = this.length - 1; i >= 0; i--) {
    //     temp = temp.concat(this.charAt(i));
    // }
    // return temp;
    return this.split('').reverse().join('');
};


/** 计算长度，每个汉字占两个长度，英文字符每个占一个长度 **/
String.prototype.charLength = function() {
    /*var temp = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255) {
            temp += 2;
        } else {
            temp += 1;
        }
    }
    return temp;*/

    /*if (/^[\u4e00-\u9fa5\uf900-\ufa2d]+$/.test(this)) {
        return this.length * 2;
    } else {
        var oMatches = this.match(/[\x00-\xff]/g);
        var oLength = this.length * 2 - oMatches.length;
        return oLength;
    }*/

    return this.replace(/[^\x00-\xff]/g, "**").length;
};

/** 判断字符串是否数字串 '553454' **/
String.prototype.isAllNumber = function() {
    /*for (var i = 0; i < this.length; i++) {
        if (this.charAt(i) < '0' || this.charAt(i) > '9') {
            return false;
        }
    }
    return true;*/
    var s = this.trim();
    return (s.replace(/\d/g, "").length === 0);
};

/** 测试是否是数字   '-14.55' '+12.8'  **/
String.prototype.isNumber = function() {
    /*var tmpFloat = parseFloat(this);
    if (isNaN(tmpFloat))
        return false;
    var tmpLen = this.length - tmpFloat.toString().length;
    return tmpFloat + "0".repeat(tmpLen) == this;*/
    var s = this.trim();
    return s.search(/^[+-]?[0-9.]*$/) >= 0;
};

/** 测试是否是整数 **/
String.prototype.isInt = function() {
    if (this == "NaN")
        return false;
    return this == parseInt(this).toString();
};

/** 获取N个相同的字符串 **/
String.prototype.toInt = function() {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};
/** 获取N个相同的字符串 **/
String.prototype.repeat = function(num) {
    var tmpArr = [];
    for (var i = 0; i < num; i++) tmpArr.push(this);
    return tmpArr.join("");
};
/** 合并多个空白为一个空白 **/
String.prototype.combineBlank = function() {
    return this.replace(/s+/g, " ");
};
/** 除去左边空白 **/
String.prototype.leftTrim = function() {
    return this.replace(/^s+/g, "");
};
/** 除去右边空白 **/
String.prototype.rightTrim = function() {
    return this.replace(/s+$/g, "");
};

/** 保留数字 **/
String.prototype.getNum = function() {
    // return this.replace(/[^\d]/g, "");  //return all numbers in string
    return this.match(/\d+/g); //return array, can join('') if needed
};
/** 检查是否包含汉字 **/
String.prototype.hasChinese = function() {
    return (this.length != this.replace(/[^\x00-\xff]/g, "**").length);
};
/** 保留中文 **/
String.prototype.getChinese = function() {
    // return this.replace(/[^u4e00-u9fa5uf900-ufa2d]/g, "");
    return this.replace(/[^\u4e00-\u9fa5\uf900-\ufa2d]/g, '');
};
/** 保留字母 **/
String.prototype.getLetter = function() {
    return this.replace(/[^A-Za-z]/g, "");
};

/*** 统计指定字符出现的次数 bacae1a***/
String.prototype.occurrence = function(ch) {
    //  var re = eval("/[^"+ch+"]/g");
    //  return this.replace(re, "").length;
    return this.split(ch).length - 1;
};

/*** 检查是否由数字字母和下划线组成 ***/
String.prototype.isAlpha = function() {
    return (this.replace(/\w/g, "").length === 0);
};

/*** 简单的email检查 ***/
String.prototype.isEmail = function() {　
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this);　
};

/*** 简单的日期检查，成功返回日期对象 ***/
String.prototype.toDate = function() {
    var p;
    var re1 = /(\d{4})[年./-](\d{1,2})[月./-](\d{1,2})[日]?$/; //2015-12-22
    var re2 = /(\d{1,2})[月./-](\d{1,2})[日./-](\d{4})[年]?$/; //12-22-2016
    if (re1.test(this)) {
        p = re1.exec(this);
        return new Date(p[1], p[2] - 1, p[3]);
    }
    if (re2.test(this)) {
        p = re2.exec(this);
        return new Date(p[3], p[1] - 1, p[2]);
    }
    return false;
};

/**
 * Convert string json date to Date object, string should be like /Date(1294499956278+0800)/
 * @return {[Date]} 
 */
String.prototype.convertJsondateToDate = function () {
    return new Date(parseInt(this.match(/\d+/)));
}

/**
 * Convert old .net serialized object json date to normal date 
 * @param  {[type]} jsondate [/Date(1294499956278+0800)/]
 * @return {[type]}          [can be 2016/09/30]
 */
String.prototype.convertJsondate = function() {
    var date = new Date(parseInt(this.match(/\d+/)));

    // var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    // var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    // return month + "/" + day + "/" + date.getFullYear();

    // if Date.prototype.format before String.prototype.convertJsondate. See time/datetime.js
    return date.format('YYYY-MM-DD');
}

// 获取文件全名
String.prototype.getFileName = function() {
    return this.replace(/^.*\/([^\/\?]*).*$/, '$1');
};

// 获取文件扩展名
String.prototype.getExtensionName = function() {
    return this.replace(/^.*\/[^\/]*(\.[^\.\?]*).*$/, '$1');
};

/*console.log('{0}+{1}={2}'.format('a', 'b', 'c')); //a+b=c*/
String.prototype.format = function() {
    var str = this;
    for (var i = 0, j = arguments.length; i < j; i++) {
        str = str.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i]);
    }

    return str;
};

/** 从左截取指定长度的字串
String.prototype.left = function(n) {
    return this.slice(0, n);
};**/
/** 从右截取指定长度的字串
String.prototype.right = function(n) {
    return this.slice(this.length - n);
};**/
/** 除去两边空白
String.prototype.trim = function() {
    return this.replace(/(^s+)|(s+$)/g, "");
};**/
