function setCookie(name, value, time) {
    var oDate = new Date();
    oDate.setDate(oDate.getDate() + time);
    var str = name + '=' + encodeURIComponent(value) + ';expires=' + oDate;
    document.cookie = str;
    console.log(document.cookie);
}

function getCookie(name) {
    var arrs1 = document.cookie.split('; ');
    for (var i = 0; i < arrs1.length; i++) {
        var arrs2 = arrs1[i].split('=');
        if (arrs2[0] == name) {
            return decodeURIComponent(arrs2[1]);
        }
    }
    return '';
}

function removeCookie(name) {
    setCookie(name, 1, -1);
}