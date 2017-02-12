var list = document.querySelector('.list');
var divs = list.getElementsByTagName('div');
var btns = document.getElementsByTagName('input');

// show
btns[0].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.transition = '0.5s ' + i * 100 + 'ms';
        divs[i].style.transform = 'rotateX(0deg)';
    }
};

// hide
btns[1].onclick = function() {
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.transition = '0.5s ' + (divs.length - i) * 100 + 'ms';
        divs[i].style.transform = 'rotateX(60deg)';
    }
};
