var preloadImages = ["http://pic3.nipic.com/20090602/846299_152058002_2.jpg", "http://pic12.nipic.com/20110212/2457331_151615433709_2.jpg", "http://pic18.nipic.com/20111207/5252423_202255633000_2.jpg", "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjHxqnSheXNAhVR72MKHaAUAcUQjRwIBw&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FLas_Vegas&psig=AFQjCNH6flvbEWHPSHg5hFZX4nVTPO1f9w&ust=1468107734538560", "https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=&url=https%3A%2F%2Fwww.namepros.com%2Fthreads%2Fvirtual-reality-domains-vr.823495%2Fpage-717&psig=AFQjCNH6flvbEWHPSHg5hFZX4nVTPO1f9w&ust=1468107734538560", "http://pic18.nipic.com/20111207/525000_2.jpg"];
var imageNumLoaded = 0;

var animationElements = document.getElementById('loadingSection').querySelectorAll('div');
var percent = document.getElementsByClassName('percent')[0];

function updatePercentAndStopAnimation() {
    imageNumLoaded++;
    percent.innerHTML = parseInt(imageNumLoaded / preloadImages.length * 100) + "%";
    if (imageNumLoaded == preloadImages.length) {

        for (var j = 0; j < animationElements.length; j++) {
            animationElements[j].style.animationPlayState  = "paused";
        }
    }
}

for (var i = 0; i < preloadImages.length; i++) {
    var oImg = new Image();

    oImg.onload = updatePercentAndStopAnimation;
    oImg.onerror = updatePercentAndStopAnimation;

    oImg.src = preloadImages[i];
}
