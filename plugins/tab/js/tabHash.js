var tab = document.getElementById('tab');
var lis = tab.querySelectorAll('.tabNav>li');
var divs = tab.querySelectorAll('.tabNav~div');

/*
 * click to switch tab
 */
for (var i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        // get hash from dom and pass value to window
        var hash = this.dataset.hash;
        window.location.hash = hash;

        //reset all to default
        for (var j = 0; j < lis.length; j++) {
            lis[j].className = 'gradient';
            divs[j].style.display = 'none';

            if (hash == divs[j].dataset.hash) { //show current based on hash, which is the same with window.location.hash
                lis[j].className = 'active';
                divs[j].style.display = 'block';
            }
        }
    }
}


/*
 * page load part, including firsttime Load and change url manually
 * first time load will trigger firstHash part
 * change url manually will trigger hashchange and reload page, firstHash part will be executed as well...
 */

// if manually changing hash in url and click "enter", reload the page
window.onhashchange = function() {
    window.location.reload();
};

// first time pageload or reload page, show corresponding area based on hash
var firstHash = window.location.hash.substring(1) || 'index';
for (var i = 0; i < divs.length; i++) {
    if (firstHash == divs[i].dataset.hash) {
        lis[i].className = 'active';
        divs[i].style.display = 'block';
    }
}
