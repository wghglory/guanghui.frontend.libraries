// 2. open after shrinking finishes.
var guanghui = {};
guanghui.accordion = {};

guanghui.accordion.accordionHeaders = document.querySelectorAll('.accordion h3');
//default span caret is showing if there is a content under tab header.

guanghui.accordion.removeCaret = function() { //remove caret if no content in div
    for (var i = 0; i < guanghui.accordion.accordionHeaders.length; i++) {
        if (guanghui.accordion.accordionHeaders[i].nextElementSibling.innerHTML == '') {
            removeClass(guanghui.accordion.accordionHeaders[i].children[0], 'caret'); //span: accordionHeaders[i].children[0].className = '';
        }
    }
}

guanghui.accordion.restoreAccordion = function() {
    for (var i = 0; i < guanghui.accordion.accordionHeaders.length; i++) {
        removeClass(guanghui.accordion.accordionHeaders[i], 'active'); // accordionHeaders[i].className = '';
        if (guanghui.accordion.accordionHeaders[i].nextElementSibling.innerHTML != '') {
            removeClass(guanghui.accordion.accordionHeaders[i].children[0], 'caret-up');
            addClass(guanghui.accordion.accordionHeaders[i].children[0], 'caret'); // accordionHeaders[i].children[0].className = 'caret';
            guanghui.accordion.accordionHeaders[i].nextElementSibling.style.display = 'none';
        }
    }
}

guanghui.accordion.bindTabHeaderClick = function() {
    console.log(guanghui.accordion.accordionHeaders.length);
    for (var i = 0; i < guanghui.accordion.accordionHeaders.length; i++) {
        guanghui.accordion.accordionHeaders[i].onclick = function() {

            if (this.classList.contains('active')) { //this.className == 'active' 如果再次重复点击header，还原到最初状态。无法提取出来，因为会清空class
                guanghui.accordion.restoreAccordion();
            } else { //点击其他header，还原兄弟节点
                guanghui.accordion.restoreAccordion();

                addClass(this, 'active');

                if (this.nextElementSibling.innerHTML != '') {
                    addClass(this.children[0], 'caret-up');
                    this.nextElementSibling.style.display = 'block'; //div under h3
                }
            }

        };
    }
}

/******************right section area*************************/

/*
    fix right content height
    rightContent.style.height = contentDivs[this.index].offsetHeight + 'px';
 */
var rightContent = document.querySelector('.content');

// click li of accordion content div ul(no effect for content on the right side)
guanghui.accordion.previousClickedLi = null;

guanghui.accordion.bindAccordionLiClick = function() {
    var lis = document.querySelectorAll('.accordion li');
    var contentDivs = document.querySelectorAll('.content>div'); //li 对应的 div

    console.log('check if lis and contentDivs have same length!!' + lis.length + ': ' + contentDivs.length);

    for (var i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function() {

            // // method 1: restore all accordion li and all content div
            // for (var j = 0; j < lis.length; j++) {
            //     lis[j].className = '';
            //     contentDivs[j].style.display = 'none';
            // }

            // method 2: restore previous click state
            if (guanghui.accordion.previousClickedLi != null) {
                removeClass(guanghui.accordion.previousClickedLi, 'active'); // previousClickedLi.className = '';
                contentDivs[guanghui.accordion.previousClickedLi.index].style.display = 'none';
            }
            guanghui.accordion.previousClickedLi = this; //record current li


            addClass(this, 'active'); //this.className = 'active';
            //show corresponsing content div
            contentDivs[this.index].style.display = 'block';
            rightContent.style.height = contentDivs[this.index].offsetHeight + 'px';
        };
    }
}

guanghui.accordion.bindTabHeaderClick();
guanghui.accordion.removeCaret();
guanghui.accordion.bindAccordionLiClick();


// // 2. open after shrinking finishes.
// var accordion = document.querySelector('.accordion');
// var accordionHeaders = accordion.querySelectorAll('h3');


// //default span caret is showing if there is a content under tab header.
// bindTabHeaderClick();
// removeCaret();
// bindAccordionLiClick();

// function removeCaret() { //remove caret if no content in div
//     for (var i = 0; i < accordionHeaders.length; i++) {
//         if (accordionHeaders[i].nextElementSibling.innerHTML == '') {
//             removeClass(accordionHeaders[i].children[0], 'caret'); //span: accordionHeaders[i].children[0].className = '';
//         }
//     }
// }

// function restoreAccordion() {
//     for (var i = 0; i < accordionHeaders.length; i++) {
//         removeClass(accordionHeaders[i], 'active'); // accordionHeaders[i].className = '';
//         if (accordionHeaders[i].nextElementSibling.innerHTML != '') {
//             removeClass(accordionHeaders[i].children[0], 'caret-up');
//             addClass(accordionHeaders[i].children[0], 'caret'); // accordionHeaders[i].children[0].className = 'caret';
//             accordionHeaders[i].nextElementSibling.style.display = 'none';
//         }
//     }
// }

// function bindTabHeaderClick() {
//     for (var i = 0; i < accordionHeaders.length; i++) {
//         accordionHeaders[i].onclick = function() {

//             if (this.classList.contains('active')) { //this.className == 'active' 如果再次重复点击header，还原到最初状态。无法提取出来，因为会清空class
//                 restoreAccordion();
//             } else { //点击其他header，还原兄弟节点
//                 restoreAccordion();

//                 addClass(this, 'active');

//                 if (this.nextElementSibling.innerHTML != '') {
//                     addClass(this.children[0], 'caret-up');
//                     this.nextElementSibling.style.display = 'block'; //div under h3
//                 }
//             }

//         };
//     }
// }


// // click li of accordion content div ul(no effect for content on the right side)
// var previousClickedLi = null;

// function bindAccordionLiClick() {
//     var lis = accordion.querySelectorAll('li');
//     var contentDivs = document.querySelectorAll('.content>div'); //li 对应的 div

//     console.log('check if lis and contentDivs have same length!!' + lis.length + ': ' + contentDivs.length);

//     for (var i = 0; i < lis.length; i++) {
//         lis[i].index = i;
//         lis[i].onclick = function() {

//             // // method 1: restore all accordion li and all content div
//             // for (var j = 0; j < lis.length; j++) {
//             //     lis[j].className = '';
//             //     contentDivs[j].style.display = 'none';
//             // }

//             // method 2: restore previous click state
//             if (previousClickedLi != null) {
//                 removeClass(previousClickedLi, 'active'); // previousClickedLi.className = '';
//                 contentDivs[previousClickedLi.index].style.display = 'none';
//             }
//             previousClickedLi = this; //record current li


//             addClass(this, 'active'); //this.className = 'active';
//             //show corresponsing content div
//             contentDivs[this.index].style.display = 'block';
//         };
//     }
// }
