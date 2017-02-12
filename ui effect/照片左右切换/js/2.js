var imgs = ['img/1.jpeg', 'img/2.jpeg', 'img/3.jpeg', 'img/4.jpeg'];
// OR ['./img/1.jpeg', './img/2.jpeg', './img/3.jpeg', './img/4.jpeg'];

var ul = document.getElementById('list');
var btns = document.getElementsByTagName('a');


// preload all images. Then show images.
var num = 0; //预加载完成几张图片
for (var i = 0; i < imgs.length; i++) {
    var image = new Image();
    image.src = imgs[i];
    image.onload = function() {
        num++;
        if (num == imgs.length) {
            loadLi();
        }
    };
}

function loadLi() {
    var ulContent = '';
    for (var i = 0; i < imgs.length; i++) {
        ulContent += '<li style="background-image:url(' + imgs[i] + ');z-index:' + (imgs.length - i) + '"></li>';
    }
    ul.innerHTML = ulContent;
    lis = ul.children;
    for (var i = 0; i < lis.length; i++) {
        // var deg = parseInt(Math.random() * 100) % 3 + i * 4;
        var deg = getRandomInt(-3, 3) + i * 4;
        lis[i].deg = deg;
        // console.log(deg);
        lis[i].style.transform = 'rotate(' + deg + 'deg) scale(1.5)';
        lis[i].style.opacity = 0;
    }

    setTimeout(function() {
        show(lis);
    }, 100);
}

function show(lis) {
    for (var i = 0; i < lis.length; i++) {
        lis[i].style.transition = '.8s ' + (lis.length - i) * 300 + 'ms';
        lis[i].style.transform = 'rotate(' + lis[i].deg + 'deg) scale(1)';
        lis[i].style.opacity = 1;
    }
}

// 两个btn click使得图片分别向外移动
var iNow = 0; //当前显示图片索引
btns[0].onclick = function() {

    iNow--;
    if (iNow < 0) {
        iNow = lis.length - 1;
    }

    for (var i = 0; i < btns.length; i++) {
        btns[i].style.opacity = 0;
    }

    lis[iNow].addEventListener('transitionend', end, false);

    lis[iNow].style.transition = '1s';
    lis[iNow].style.left = '-100%';
    lis[iNow].style.opacity = 0;

};

btns[1].onclick = function() {

    iNow++;
    if (iNow > lis.length - 1) {
        iNow = 0;
    }

    for (var i = 0; i < btns.length; i++) {
        btns[i].style.opacity = 0;
    }

    lis[iNow].addEventListener('transitionend', end, false);

    lis[iNow].style.transition = '1s';
    lis[iNow].style.left = '100%';
    lis[iNow].style.opacity = 0;
};


// 四张图片zindex 4 ~ 1.
// 默认： 第一张图片zindex为4， 第二张3， 第三张2， 第四张zindex为1
// 把当前要显示的图片zindex设置最高。 大于当前图片zindex的图片zindex--。
// 比如当前要显示第2张图片， 它zindex变为4， 第一张图zindex从4减小到3， 第三、 四张zindex分别还是保留2、 1

// 图片从外侧回到中间
function end() {

    var currentZindex = this.style.zIndex;
    for (var i = 0; i < lis.length; i++) {
        if (lis[i].style.zIndex > currentZindex) {
            lis[i].style.zIndex -= 1;
        }
    }
    this.style.zIndex = lis.length;


    var _this = this;
    this.removeEventListener('transitionend', end, false);
    this.style.transition = 'none';  //防止下一句transform还会触发end
    this.style.transform = 'rotate(' + this.deg + 'deg) scale(1.2)';

    // 回到中心，最上方
    setTimeout(function() {
        _this.style.transition = '0.6s';
        _this.style.left = 0;
        _this.style.opacity = 1;
        _this.style.transform = 'rotate(' + _this.deg + 'deg) scale(1)';

        for (var i = 0; i < btns.length; i++) {
            btns[i].style.opacity = 1;
        }

    }, 50);

}



/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
