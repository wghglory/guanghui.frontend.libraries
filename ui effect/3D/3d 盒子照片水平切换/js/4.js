var btns = document.querySelectorAll('#btns li');
var picUl = document.getElementById('list');


(function btnClick() {

    var iNow = 0;

    // for (var i = 0; i < btns.length; i++) {
    //     btns[i].index = i;
    //     btns[i].onclick = function() {
    //         btns[iNow].classList.remove('active');
    //         iNow = this.index;
    //         btns[iNow].classList.add('active');
    //     }
    // }
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function() {

            if (i == iNow)
                return;

            btns[iNow].classList.remove('active');
            picUl.children[iNow].classList.remove('active');

            iNow = i;
            btns[iNow].classList.add('active');

            var degree = i * 90;
            picUl.style.transform = 'rotateY(' + degree + 'deg)';
            picUl.children[i].classList.add('active');
        }
    }
})();
