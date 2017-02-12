/* usage：
var d1 = new Drag('div1');
d1.init({}); //配置参数

var d2 = new Drag('div2');
d2.init({
  toDown: function() {
    document.title = 'hello';
    document.body.style.background = 'black';
  }
});

var d3 = new LimitDrag('div3');
d3.init({
  toDown: function() {
    document.title = '妙味';
  },
  toUp: function() {
    document.title = '课堂';
  }
});

var d4 = new LimitDrag('div4');
d4.init({
  toUp: function() {
    document.title = 'beybye';
  }
});*/

function Drag(id) {
    this.obj = document.getElementById(id);
    this.disX = 0;
    this.disY = 0;

    // add this
    this.settings = { //默认参数
        toDown: function() {},
        toUp: function() {}
    };
}
Drag.prototype.init = function(options) {
    var instance = this;

    extend(this.settings, options); //add this

    this.obj.onmousedown = function(e) {
        var e = e || window.event;
        console.log(this); //this is div1, div cannot have fnDown
        instance.fnDown(e);

        instance.settings.toDown(); // add this~

        document.onmousemove = function(e) {
            // console.log(this); //this is document
            var e = e || window.event;
            instance.fnMove(e); //instance has fnMove, not the document

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动滑块的时候， 选中别的地方文字影响拖拽
        };

        document.onmouseup = function() {
            instance.fnUp();

            instance.settings.toUp(); //add this ~
        };
        return false;
    };
};

Drag.prototype.fnDown = function(e) {
    this.disX = e.clientX - this.obj.offsetLeft;
    this.disY = e.clientY - this.obj.offsetTop;
};

Drag.prototype.fnMove = function(e) {
    this.obj.style.left = e.clientX - this.disX + 'px';
    this.obj.style.top = e.clientY - this.disY + 'px';
};

Drag.prototype.fnUp = function() {
    document.onmousemove = document.onmouseup = null;
};

function extend(child, parent) {
    for (var attr in parent) {
        child[attr] = parent[attr];
    }
}

function LimitDrag(id) {
    Drag.call(this, id);
}
extend(LimitDrag.prototype, Drag.prototype);

LimitDrag.prototype.fnMove = function(e) {
    var l = e.clientX - this.disX;
    var t = e.clientY - this.disY;

    if (l < 0) {
        l = 0;
    } else if (l > document.documentElement.clientWidth - this.obj.offsetWidth) {
        l = document.documentElement.clientWidth - this.obj.offsetWidth;
    }

    if (t < 0) {
        t = 0;
    } else if (t > document.documentElement.clientHeight - this.obj.offsetHeight) {
        t = document.documentElement.clientHeight - this.obj.offsetHeight;
    }
    this.obj.style.left = l + 'px';
    this.obj.style.top = t + 'px';
};
