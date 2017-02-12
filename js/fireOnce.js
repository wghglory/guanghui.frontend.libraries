function once(fn, context) {
    // method 1:
    // return function() {
    //     try {
    //         fn.apply(context || this, arguments);
    //     } catch (e) {
    //         console.error(e); //一般可以注释掉这行
    //     } finally {
    //         fn = null;
    //     }
    // }

    var result;
    return function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}


// Usage 1:
var a = 0;
var canOnlyFireOnce = once(function() {
    a++;
    console.log(a);
});
canOnlyFireOnce(); //1
canOnlyFireOnce(); // nothing

alert(canOnlyFireOnce);
/* canOnlyFireOnce:
    function() {
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    }
*/

// Usage 2:
var name = "张三";
var canOnlyFireOnce = once(function() {
    console.log("你好" + this.name);
});
canOnlyFireOnce(); //你好张三
canOnlyFireOnce(); // nothing


// Usage 3:
var obj = {
    name: "天涯孤雁",
    age: 24
};
var canOnlyFireOnce = once(function() {
    console.log("你好" + this.name);
}, obj);
canOnlyFireOnce(); //你好天涯孤雁
canOnlyFireOnce(); // nothing
