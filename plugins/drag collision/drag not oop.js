/**
 * normal drag, no OOP
 */
function drag(obj) {
    obj.onmousedown = function(ev) {
        var ev = ev || event;

        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if (obj.setCapture) {
            obj.setCapture();
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;
            obj.style.left = ev.clientX - disX + 'px';
            obj.style.top = ev.clientY - disY + 'px';

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动滑块的时候， 选中别的地方文字影响拖拽
        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            //释放全局捕获 releaseCapture();
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
        };

        return false;
    };
}

/**
 * [normal limit drag, not OOP]
 */
function limitDrag(obj) {

    obj.onmousedown = function(ev) {
        var ev = ev || event;

        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if (obj.setCapture) {
            obj.setCapture();
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;

            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if (L < 0) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }

            if (T < 0) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }

            obj.style.left = L + 'px';
            obj.style.top = T + 'px';

        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
        };

        return false;

    };

}


/**
 * drag with magnet, which attach the obj if very close
 */
function magneticDrag(obj) {

    obj.onmousedown = function(ev) {
        var ev = ev || event;
        var disX = ev.clientX - this.offsetLeft;
        var disY = ev.clientY - this.offsetTop;

        if (obj.setCapture) {
            obj.setCapture();
        }

        document.onmousemove = function(ev) {
            var ev = ev || event;

            var L = ev.clientX - disX;
            var T = ev.clientY - disY;

            if (L < 50) {
                L = 0;
            } else if (L > document.documentElement.clientWidth - obj.offsetWidth) {
                L = document.documentElement.clientWidth - obj.offsetWidth;
            }

            if (T < 50) {
                T = 0;
            } else if (T > document.documentElement.clientHeight - obj.offsetHeight) {
                T = document.documentElement.clientHeight - obj.offsetHeight;
            }

            obj.style.left = L + 'px';
            obj.style.top = T + 'px';

        };

        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
            if (obj.releaseCapture) {
                obj.releaseCapture();
            }
        };

        return false;
    };
}
