function Drag() {
    this.obj = null;
    this.disX = 0;
    this.disY = 0;

    this.settings = { //默认参数

    };
}

Drag.prototype.init = function(opt) {
    var instance = this;

    this.obj = document.getElementById(opt.id);

    extend(this.settings, opt);

    this.obj.onmousedown = function(ev) {
        var ev = ev || window.event;
        instance.fnDown(ev);

        fireEvent(instance, 'toDown');

        document.onmousemove = function(ev) {
            var ev = ev || window.event;
            instance.fnMove(ev);

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动滑块的时候， 选中别的地方文字影响拖拽
        };
        document.onmouseup = function() {
            instance.fnUp();

            fireEvent(instance, 'toUp');
        };
        return false;
    };

};

Drag.prototype.fnDown = function(ev) {
    this.disX = ev.clientX - this.obj.offsetLeft;
    this.disY = ev.clientY - this.obj.offsetTop;
};
Drag.prototype.fnMove = function(ev) {
    this.obj.style.left = ev.clientX - this.disX + 'px';
    this.obj.style.top = ev.clientY - this.disY + 'px';
};
Drag.prototype.fnUp = function() {
    document.onmousemove = null;
    document.onmouseup = null;
};

function bindEvent(obj, events, fn) {
    //obj : 楼层
    //events : 书架
    //fn : 一本书

    obj.listeners = obj.listeners || {};
    obj.listeners[events] = obj.listeners[events] || [];

    obj.listeners[events].push(fn);

    if (obj.nodeType) {
        if (obj.addEventListener) {
            obj.addEventListener(events, fn, false);
        } else {
            // obj.attachEvent('on' + events, fn); //不考虑this指向问题
            obj.attachEvent('on' + events, function() {
                fn.call(obj);
            });
        }
    }
}

function fireEvent(obj, events) { //主动触发自定义事件
    if (obj.listeners && obj.listeners[events]) {
        for (var i = 0; i < obj.listeners[events].length; i++) {
            obj.listeners[events][i]();
        }
    }
}

function extend(child, parent) {
    for (var attr in parent) {
        child[attr] = parent[attr];
    }
}
