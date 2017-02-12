/**
 * extent target object based on source
 * @param  {[json]} target
 * @param  {[json]} source
 * @return {[json]}        extended object
 * usage:
 *      var boy = {
            name: '无忌',
            image: '男性头像',
            age: 20,
            gender: '男'
        };

        var zuixiake = extend({"hobby":"swimming"}, boy);
        zuixiake.name = '醉侠客';
        alert(zuixiake.name);
        alert(zuixiake.gender);
        alert(zuixiake.hobby);
 */
function extend(target, source) {
    for (var i in source) {
        // if (source.hasOwnProperty(i)) {    // this will filter out the prototype property
        //     target[i] = source[i];
        // }

        target[i] = source[i];
    }
    return target;
}

/**
 * extent target object based on source
 * @return {[json]}
 * usage：
 *  //游戏随机生成名字
    var boy = {
        name: '无忌',
        image: '男性头像',
        age: 20,
        sex: '男'
    };

    //技能名称，等级，伤害值，需要的魔法
    var technology = {
        tname: '亡灵复活',
        tlevel: 10,
        tstrength: 3000,
        tmagic: 30
    };

    var shenqi = {
        sname: '霜之哀伤',
        slevel: 30,
        sstrength: 3000
    };
    //当这个人有了穿上盔甲，圣衣，六神合体，戴上魔法戒指之后，自动也拥有一个技能

    //第一种用法
    var zuixiake = extendMany({}, technology, shenqi);
    zuixiake.name = '醉侠客';
    alert(zuixiake.name);
    alert(zuixiake.tname);
    alert(zuixiake.sname);

    //第二种用法
    extendMany(boy, technology, shenqi);
    alert(boy.name);
    alert(boy.tname);
    alert(boy.sname);
 */
function extendMany() {
    var key,
        i = 0,
        len = arguments.length,
        target = null,
        copy;

    if (len === 0) {
        return;
    } else if (len === 1) {
        target = this;
    } else {
        i++;
        target = arguments[0];
    }
    for (; i < len; i++) {
        for (key in arguments[i]) {
            copy = arguments[i][key];
            target[key] = copy;
        }
    }
    return target;
}


/* 对象之间引用
var obj = {a:10};
var obj2 = obj;
obj2.a = 20;
alert(obj.a);  //20*/

/*使用浅拷贝
var obj = { a: 10 };
var obj2 = shallowCopy(obj);
obj2.a = 20;
alert(obj.a); //10
*/
function shallowCopy(obj) { //浅拷贝
    var newObj = {};
    for (var attr in obj) {
        newObj[attr] = obj[attr];
    }
    return newObj;
}

/*使用深拷贝
var obj = { a: { b: 10 }};
var obj2 = deepCopy(obj);
obj2.a.b = 20;
alert(obj.a.b); //10
*/
function deepCopy(obj) { //深拷贝
    if (typeof obj != 'object') {
        // console.trace();
        return obj;
    }

    var newObj = {};

    for (var attr in obj) {
        newObj[attr] = deepCopy(obj[attr]);
    }
    return newObj;
}
