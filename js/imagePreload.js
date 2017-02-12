/**
 * [preloadImages]
 * @method preloadImages
 * @param  {[array]}      arr  [array of images that need preload]
 * @return {[object]}          [done with callback]
 */
function preloadImages(arr) {
    var imgArr = [],
        loadedImgNum = 0;

    var callback = function() {};
    var arr = (typeof arr != "object") ? [arr] : arr;

    function loadImage() {
        loadedImgNum++;
        if (loadedImgNum == arr.length) { // all preloads done
            callback(imgArr); // fire callback and pass imgArr array as parameter
        }
    }

    for (var i = 0; i < arr.length; i++) {
        imgArr[i] = new Image();
        imgArr[i].src = arr[i];
        imgArr[i].onload = function() {
            loadImage();
        };
        imgArr[i].onerror = function() {
            loadImage();
        };
    }

    return { //return blank object with done() method
        done: function(cbFunction) {
            callback = cbFunction || callback; //remember user defined callback functions to be called when images load
        }
    };
}

preloadImages(arr).done(function(images) {
    // alert(images.length);
    // alert(images[0].src + " " + images[0].width);
    // console.log('all loaded');
    bImgLoad = true;
});
