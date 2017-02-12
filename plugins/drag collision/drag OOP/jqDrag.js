/**
 * jquery drag
 * @method drag
 * @param  {[jquery node type]}    $obj
 */
function drag($obj) {
    var disX = 0;
    var disY = 0;

    $obj.on('mousedown', function(ev) {
        disX = ev.pageX - $(this).offset().left;
        disY = ev.pageY - $(this).offset().top;

        $(document).on('mousemove.drag', function(ev) {
            $obj.css('left', ev.pageX - disX);
            $obj.css('top', ev.pageY - disY);

            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); // 防止拖动滑块的时候， 选中别的地方文字影响拖拽
        });

        $(document).on('mouseup.drag', function() {
            $(this).off('.drag');
        });

        return false;
    });
}
