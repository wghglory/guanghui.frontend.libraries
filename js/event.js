function bind(obj, ev, fn) { //事件绑定
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function on(id, ev, fn) {
    var dom = document.getElementById(id);
    if (dom.addEventListener) {
        dom.addEventListener(ev, fn, false);
    } else if (dom.attachEvent) {
        //如果支持 --IE
        dom.attachEvent('on' + ev, function() {
            fn.call(obj);
        });
    }
}

function un(id, ev, fn) {
    var dom = document.getElementById(id);
    if (dom.removeEventListener) {
        dom.removeEventListener(ev, fn);
    } else if (dom.detachEvent) {
        dom.detachEvent('on' + ev, fn);
    }
}

// 获取事件对象
function getEvent(event) {
    return event ? event : window.event;
}

// 获取元素
function getTarget(event) {
    var event = getEvent(event);
    return event.target || event.srcElement;
}

// 阻止冒泡以及捕获
function stopPropagation(event) {
    var event = getEvent(event);
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
}

// 阻止默认行为
function preventDefault(event) {
    var event = getEvent(event);
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

function getDetail(event) {
    var event = getEvent(event);
    if (event.wheelDelta) {
        return event.wheelDelta;
    } else {
        return -event.detail * 40;
    }
}

/**
 * stop Propagation
 * @param  {[node]} obj
 * usage：
 *     document.onclick = function() {
            alert("点击了空白处");
        };
        btn.onclick = function(event) {
            alert("点击了按钮");
            // var event = event || window.event;
            // if (event && event.stopPropagation) {
            //     event.stopPropagation(); //  w3c 标准
            // } else {
            //     event.cancelBubble = true; // ie 678  ie浏览器
            // }
        };
        stopPropagation(btn);
 */
function stopPropagation(obj) { //阻止点击事件冒泡
    bind(obj, 'touchstart', function(ev) {
        var e = ev || event;
        //IE678用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    });
    bind(obj, 'click', function(ev) {
        var e = ev || event;
        //IE678用cancelBubble=true来阻止而FF下需要用stopPropagation方法
        e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true;
    });
}



