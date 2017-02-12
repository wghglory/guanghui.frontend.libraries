function selectedText() {
    if (window.getSelection) { //标准
        return window.getSelection().toString();
    } else { //ie
        return document.selection.createRange().text;
    }
}
// document.onmouseup = function() {
//     console.log(selectText());
// };
