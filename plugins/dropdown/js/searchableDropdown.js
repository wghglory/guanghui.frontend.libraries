/** 检查字符串是否以subStr开头 **/
String.prototype.startWith = function(subStr) {
    if (subStr.length > this.length) {
        return false;
    }
    return (this.indexOf(subStr) === 0) ? true : false;
};

/**
 * get index if an element exists in array, return -1 if not existing
 * @method indexInArray
 * @param  {[array]}          arr
 * @param  {[string/int]}     element    [element needs to be checked]
 * @return {[int]}                       [return index]
 */
function indexInArray(arr, element) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == element) {
            return i;
        }
    }
    return -1;
}

(function() {
    var dropdown = document.querySelector('.dropdown');
    var select = dropdown.querySelector('select');
    var options = select.children;
    var input = dropdown.querySelector('input');
    var caret = dropdown.querySelector('.caret');
    var ul = dropdown.querySelector('ul');
    var lis = ul.children;
    var messageP = dropdown.querySelector('p'); // show "no datas found" if no matching
    var data = [];


    // 1. init: fill ul with lis and set first li (State) highlighted/selected. push data to array
    (function init() {
        var li = '';
        for (var i = 0; i < options.length; i++) {
            li += '<li data-key=' + options[i].value + '>' + options[i].innerHTML + '</li>';
            data.push(options[i].innerHTML);
        }
        ul.innerHTML = li;
        lis[0].classList.add('active'); //default if type nothing and click input/caret
    })();

    // call every input keyup
    function reset() {
        // remove class (not remove active)
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove('hide');
            lis[i].classList.remove('pending');
        }

        messageRemove();
    }

    function messageRemove() {
        messageP.classList.remove('message');
        messageP.innerHTML = '';
    }

    function messageAdd() {
        messageP.classList.add('message');
        messageP.innerHTML = 'No datas found';
    }

    function closeDropdown() {
        ul.style.maxHeight = 0; // height cannot have transition effect
        ul.classList.remove('open');
        dropdown.classList.remove('stretch');
    }

    function openDropdown() {
        ul.style.maxHeight = '20em';
        ul.classList.add('open');
        dropdown.classList.add('stretch');
    }

    // open dropdown
    input.onclick = function() {
        openDropdown();
    };

    // caret click, toggle dropdown
    caret.onclick = function() {
        if (ul.offsetHeight > 0) {
            closeDropdown();
        } else {
            openDropdown();
        }
    };

    // input type and up/down enter select
    input.onkeyup = function(e) {
        reset();

        // hide unmatched lis
        var val = this.value.toLowerCase();
        for (var i = 0; i < lis.length; i++) {
            if (!lis[i].innerHTML.toLowerCase().startWith(val)) {
                lis[i].classList.add('hide');
            }
        }

        // query elements must below for loop above since loop modifies hide class
        var activeLi = dropdown.querySelector('.active');
        var showLis = dropdown.querySelectorAll('li:not(.hide)');
        var firstShowLi = showLis[0]; // dropdown.querySelector('li:not(.hide)');

        if (firstShowLi == null) { // no any matching data. undefined == null true
            ul.classList.remove('open');
            dropdown.classList.add('stretch');
            messageAdd();

        } else {
            // re-search and modify first searched value as active. previous/hide element removes active class
            // if active class element has hide class, it means user clean everything and start to type others.
            // e.g. first type delaware, and then clean, at this moment delaware is still active, which should be removed. Type arizona
            if (activeLi.classList.contains('hide')) { // update active li
                activeLi.classList.remove('active'); // remove previous active
                firstShowLi.classList.add('active'); // first filtered element active
            }
            openDropdown();
            keycodeOperation();
        }

        function keycodeOperation() {
            // keyboard controls active element
            var code = e.keyCode || e.which;
            switch (code) {
                // enter to select active li
                case 13:
                case 108:
                    input.placeholder = input.value = activeLi.innerHTML;
                    input.dataset.key = activeLi.dataset.key;
                    closeDropdown();
                    break;
                    // case 38: //up
                    //     activeLi.classList.remove('active'); //remove previous active
                    //     var newActiveLi = activeLi.previousElementSibling;
                    //     // only up and down among filtered, not hide lis
                    //     if (newActiveLi != null && !newActiveLi.classList.contains('hide')) {
                    //         ul.scrollTop = newActiveLi.offsetTop;
                    //     } else { // first element, up, to last element
                    //         newActiveLi = showLis[showLis.length - 1];
                    //         ul.scrollTop = ul.scrollHeight;
                    //     }
                    //     newActiveLi.classList.add('active');
                    //     input.placeholder = newActiveLi.innerHTML;
                    //     break;
                    // case 40: //down
                    //     activeLi.classList.remove('active');
                    //     var newActiveLi = activeLi.nextElementSibling;
                    //     if (newActiveLi != null && !newActiveLi.classList.contains('hide')) {
                    //         ul.scrollTop = newActiveLi.offsetTop;
                    //     } else { // last element, up, to first element
                    //         ul.scrollTop = 0;
                    //         newActiveLi = showLis[0];
                    //     }
                    //     newActiveLi.classList.add('active');
                    //     input.placeholder = newActiveLi.innerHTML;
                    //     break;
                case 38:
                case 40:
                    upDown(code);
                    break;
                default:
                    input.placeholder = activeLi.innerHTML;
            }
        }

        function upDown(code) {
            activeLi.classList.remove('active');
            var newActiveLi = code == 38 ? activeLi.previousElementSibling : activeLi.nextElementSibling;
            if (newActiveLi != null && !newActiveLi.classList.contains('hide')) {
                ul.scrollTop = newActiveLi.offsetTop;
            } else { // first element, up, to last element
                newActiveLi = code == 38 ? showLis[showLis.length - 1] : showLis[0];
                ul.scrollTop = code == 38 ? ul.scrollHeight : 0;
            }
            newActiveLi.classList.add('active');
            input.placeholder = newActiveLi.innerHTML;
        }
    };

    // input blur check if data is selected from dropdown ul
    // add timer because using mouse click ul, input blur happened before clicking, click event sometimes cannot be fired
    // so li click happened before input blur
    input.onblur = function() {
        setTimeout(function() {
            // method 1 to check if input value is exactly same with one of data
            var matchedArr = data.filter(function(val, index, arr) {
                return val == input.value;
            });
            if (matchedArr.length == 0) {
                // if (indexInArray(data, input.value) == -1) {   // method 2
                input.value = '';
                input.placeholder = 'Select State';
            }
            reset();
            closeDropdown();
        }, 400);

    };

    // mouseover change active li
    ul.onmouseover = function(e) {
        var overLi = e.target;
        if (overLi.tagName.toLowerCase() == 'li') {
            // remove class
            for (var i = 0; i < lis.length; i++) {
                lis[i].classList.remove('pending');
            }
            overLi.classList.add('pending');
        }
    };

    // 不用ul click因为发现鼠标按住拖动时候target不明确有bug
    for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].onclick = function() {
            input.placeholder = input.value = this.innerHTML;
            input.dataset.key = this.dataset.key;
            var preActiveLi = dropdown.querySelector('.active');
            preActiveLi.classList.remove('active');
            this.classList.remove('pending');
            this.classList.add('active');

            closeDropdown();
        };
    }


})();
