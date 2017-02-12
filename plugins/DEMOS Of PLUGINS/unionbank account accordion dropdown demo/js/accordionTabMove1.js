// 1. shrink and open together
var accordion = document.querySelector('.accordion');
var accordionHeaders = accordion.querySelectorAll('h3');
var h3Height = accordionHeaders[0].offsetHeight;
var previousClickedHeader = null;

//default span caret is showing if there is a content under tab header.
bindTabHeaderClick();
removeCaret();
bindAccordionLiClick();

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

                //note: shrink and open happens at the same time. see accordionMove2 if open happens after shrink finishes.
                shrinkPreviousTab(this);
                expandClickedTab(this);
            }

        };
    }
}

function shrinkPreviousTab(obj) {

    if (previousClickedHeader != null) {

        //operate previously clicked h3
        removeClass(previousClickedHeader, 'active');
        var previousContentDiv = previousClickedHeader.nextElementSibling;
        if (previousContentDiv.innerHTML != '') {
            removeClass(previousClickedHeader.children[0], 'caret-up');
            addClass(previousClickedHeader.children[0], 'caret');
            //operate parent div container of previously clicked h3
            tweenMove(previousClickedHeader.parentNode, {
                'height': h3Height
            }, 100, 'easeOut');

            //operate contentDiv under previously clicked h3
            tweenMove(previousContentDiv, {
                'top': 0
            }, 100, 'easeOut', function() {
                // console.log(previousContentDiv);
                previousContentDiv.style.display = 'none';
            });
        }
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
        }, 500, 'easeOut');
    }
}

/******************right section area*************************/

/*
    fix right content height
    rightContent.style.height = contentDivs[this.index].offsetHeight + 'px';
 */
var rightContent = document.querySelector('.content');

var previousClickedLi = null;

function bindAccordionLiClick() {
    var lis = accordion.querySelectorAll('li');
    var contentDivs = document.querySelectorAll('.content>div'); //li 对应的 div

    console.log('check if lis and contentDivs have same length!!' + lis.length + ': ' + contentDivs.length);

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {

            // restore previous click state
            if (previousClickedLi != null) {
                removeClass(previousClickedLi, 'active'); // previousClickedLi.className = '';
                // console.log('outer: '+previousClickedLi.index);

                var preClickedIndex = previousClickedLi.index;
                tweenMove(contentDivs[previousClickedLi.index], {
                    'opacity': 0
                }, 700, 'easeOut', function() {
                    // note!: preClickedIndex != previousClickedLi.index inside this fun!
                    // contentDivs[previousClickedLi.index].style.display = 'none';  //wrong...
                    // console.log('inner: previous index: ' + preClickedIndex);
                    contentDivs[preClickedIndex].style.display = 'none';
                });
            }
            previousClickedLi = this; //record current li

            addClass(this, 'active'); //this.className = 'active';
            //show corresponsing content div

            contentDivs[this.index].style.display = 'block';


            rightContent.style.height = contentDivs[this.index].offsetHeight + 'px';

            var _this = this;
            tweenMove(contentDivs[this.index], {
                'opacity': 100
            }, 1000, 'easeOut', function() {
                // note!: cannot use this.index, use _this
                // this is undefined
                // console.log('this.index: ' + this.index + ' and _this index: ' + _this.index);
            });

        };
    }
}
