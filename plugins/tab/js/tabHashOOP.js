// this kind of tab doesn't need OOP I think.

function Tab(id) {
    this.tabSection = document.getElementById(id);
    this.lis = this.tabSection.querySelectorAll('.tabNav>li');
    this.divs = this.tabSection.querySelectorAll('.tabNav~div');
}

Tab.prototype.init = function() {

    // bind events
    var instance = this;
    for (var i = 0; i < this.lis.length; i++) {

        this.lis[i].onclick = function() {
            // get hash from dom and pass value to window
            var hash = this.dataset.hash;
            window.location.hash = hash;

            instance.change(hash);
        }
    }

    // if manually changing hash in url and click "enter", reload the page
    window.onhashchange = function() {
        window.location.reload();
    };


    // first time pageload or reload page, show corresponding area based on hash
    var firstHash = window.location.hash.substring(1) || 'index';

    for (var i = 0; i < this.divs.length; i++) {
        if (firstHash == this.divs[i].dataset.hash) {
            this.lis[i].className = 'active';
            this.divs[i].style.display = 'block';
        }
    }


};

Tab.prototype.change = function(hash) {
    //reset all to default
    for (var i = 0; i < this.lis.length; i++) {
        this.lis[i].className = 'gradient';
        this.divs[i].style.display = 'none';

        if (hash == this.divs[i].dataset.hash) { //show current based on hash, which is the same with window.location.hash
            this.lis[i].className = 'active';
            this.divs[i].style.display = 'block';
        }
    }

};
