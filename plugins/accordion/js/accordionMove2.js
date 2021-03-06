// 2. open after shrinking finishes.
var accordionHeaders = document.querySelectorAll('.accordion h3');
var h3Height = accordionHeaders[0].offsetHeight;
var previousClickedHeader = null;

//default span caret is showing if there is a content under tab header.
bindTabHeaderClick();
removeCaret();

function removeCaret() { //remove caret if no content in div
    for (var i = 0; i < accordionHeaders.length; i++) {
        if (accordionHeaders[i].nextElementSibling.innerHTML == '') {
            removeClass(accordionHeaders[i].children[0], 'caret');
        }
    }
}


function bindTabHeaderClick() {
    for (var i = 0; i < accordionHeaders.length; i++) {
        accordionHeaders[i].onclick = function() {

            if (this.classList.contains('active')) { //clicked the same header, shrink it
                shrinkPreviousTab(this);
            } else { //when clicking another header，shrink previously clicked tab

                //after shrinking previous tab, open current content div
                shrinkPreviousTab(this, expandClickedTab, this);
            }

        };
    }
}

function shrinkPreviousTab(obj, callback, callbackPara) {

    if (previousClickedHeader != null) {

        //operate previously clicked h3
        removeClass(previousClickedHeader, 'active'); //remove active
        var previousContentDiv = previousClickedHeader.nextElementSibling;
        if (previousContentDiv.innerHTML != '') {
            removeClass(previousClickedHeader.children[0], 'caret-up');
            addClass(previousClickedHeader.children[0], 'caret');

            //operate parent div container of previously clicked h3
            tweenMove(previousClickedHeader.parentNode, {
                'height': h3Height
            }, 150, 'easeOut');

            //operate contentDiv under previously clicked h3
            tweenMove(previousContentDiv, {
                'top': 0
            }, 150, 'easeOut', function() {
                // console.log(previousContentDiv);
                previousContentDiv.style.display = 'none';
                if (callback) {
                    callback(callbackPara);
                }
            });
        } else { //previous clicked a header that has an empty content div under it.
            if (callback) {
                callback(callbackPara);
            }
        }
    } else if (previousClickedHeader == null && callback != null) { //first click, just open that contentDiv
        callback(callbackPara);
    }
    previousClickedHeader = obj;
}

function expandClickedTab(obj) {
    //open tab content...
    var parentDiv = obj.parentNode; //div container of current h3 and content
    var contentDiv = obj.nextElementSibling; //div under h3

    //operate current clicked h3
    addClass(obj, 'active');
    if (contentDiv.innerHTML != '') {

        addClass(obj.children[0], 'caret-up');

        contentDiv.style.display = 'block';

        //operate parent div container of clicked h3
        // parentDiv.style.height = h3Height + contentDiv.offsetHeight + 'px';
        tweenMove(parentDiv, {
            'height': h3Height + contentDiv.offsetHeight
        }, 100, 'easeOut');

        //operate contentDiv under clicked h3
        tweenMove(contentDiv, {
            'top': h3Height
        }, 800, 'easeOut');
    }
}