function addClass(obj, classname) {
    if (obj.className == '') {
        obj.className = classname;
    } else {

        var arrClassName = obj.className.split(' ');
        var index = arrIndexOf(arrClassName, classname);
        if (index == -1) { // 要添加的class不存在时才添加
            obj.className += ' ' + classname;
        }
    }
}

function arrIndexOf(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return i;
        }
    }
    return -1;
}

function removeClass(obj, classname) {
    if (obj.className != '') {
        var arrClassName = obj.className.split(' ');
        var index = arrIndexOf(arrClassName, classname);
        if (index != -1) { // 存在时才删除
            arrClassName.splice(index, 1);
            obj.className = arrClassName.join(' ');
        }
    }
}
