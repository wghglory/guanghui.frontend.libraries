function bindDropdownButtonClick() {
    var dropdownBtn = document.querySelectorAll('.dropdown button'); //because there may be may dropdown in a page
    for (var i = 0; i < dropdownBtn.length; i++) {
        dropdownBtn[i].onclick = function() {
            var dropdownMenu = this.nextElementSibling;
            var display = getStyle(dropdownMenu, 'display');
            if (display == 'none') {
                dropdownMenu.style.display = 'block';
            } else {
                dropdownMenu.style.display = 'none';
            }
        };

        bindDropdownItemClick(dropdownBtn[i]);
    }
}

// change here to get selected data
function bindDropdownItemClick(dropdownBtn) {
    var dropdownMenuItems = dropdownBtn.nextElementSibling.children; //.dropdown-menu li under this dropdownBtn;
    for (var i = 0; i < dropdownMenuItems.length; i++) {
        dropdownMenuItems[i].index = i;
        dropdownMenuItems[i].onclick = function() {
            console.log('index: ' + this.index + ' and value: ' + this.children[0].innerHTML); //Show selected value, index
            this.parentNode.style.display = 'none';
            dropdownBtn.innerHTML = this.children[0].innerHTML + ' <span class="caret"></span>';
        };
    }
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}

bindDropdownButtonClick();
