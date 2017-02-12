//default click first li of first header
var firstHeader = document.querySelector('.accordion h3');
var firstLi = firstHeader.nextElementSibling.querySelector('li');

firstHeader.onclick();
firstLi.onclick();


var depositAside = document.querySelector('.deposit');
var loanAside = document.querySelector('.loan');
var p = document.querySelector('.warning');
var panels = document.querySelectorAll('.panel');
var h3 = document.querySelectorAll('.accordion h3');
depositAside.onclick = function() {
    p.innerHTML = 'Real time data is not available for this account. Valid as of: 4/28/2016';
    removeClass(p, 'success');
    addClass(p, 'warning');

    for (var i = 0; i < panels.length; i++) {
        removeClass(panels[i], 'noShadow');
    }
    for (var i = 0; i < h3.length; i++) {
        removeClass(h3[i], 'noShadow');
    }
};
loanAside.onclick = function() {
    p.innerHTML = 'Valid as of ' + getDatetime();
    removeClass(p, 'warning');
    addClass(p, 'success');

    for (var i = 0; i < panels.length; i++) {
        addClass(panels[i], 'noShadow');
    }
    for (var i = 0; i < h3.length; i++) {
        addClass(h3[i], 'noShadow');
    }
};



