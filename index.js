var boxBg = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#564545', '#607d8b', '#405d6b', '#9e9e9e', '#70737d', '#389fa0', '#38a05e', '#b3c981', '#76a803', '#fecf43', '#e2785f'];	//box背景色
var bodyBg = ['#F7E8ED', '#F2D9E6', '#ECC6DE', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#E0E1F5', '#F7E8ED', '#F2D9E6', '#E0ECF5', '#DDF4DE', '#F0F1D5', '#EEDECD', '#B8E6B3', '#ABE3D8', '#DFD1F0', '#6161616'];	//body背景色


var style = document.createElement('style');

var styleStr = '';
boxBg.forEach(function (item, index) {
    styleStr += `.box:nth-child(${index + 1}) > div {
        background: ${item} url('./images/${index + 1}.png') no-repeat center;
    }`
});
style.innerHTML = styleStr;

document.head.appendChild(style);

var boxList = document.querySelectorAll('.box');
var rotateArr = ["rotateX(-180deg)", "rotateY(-180deg)", "rotateX(180deg)", "rotateY(180deg)"]
var wrapper = document.querySelector('.wrapper');
boxList.forEach(function (box, index){
    box.onmouseenter = function (e) {
        var dir = getDirection(e, this);
        this.style.transform = "translateZ(150px) " + rotateArr[dir];
        document.body.style.background = bodyBg[Math.round(Math.random() * (bodyBg.length - 1))]
    }
    box.onmouseleave = function (e) {
        this.style.transform = "";
    }
})


function getDirection(ev, box) {
    var left = box.getBoundingClientRect().left;
    var top = box.getBoundingClientRect().top;
    var width = box.getBoundingClientRect().width;
    var height = box.getBoundingClientRect().height;
    var x = ev.clientX - left - width / 2;
    // var y = top + height / 2 - ev.clientY
    var y = ev.clientY - top - height / 2;
    var deg = Math.atan2(y, x) / (Math.PI / 180);

    /**
     * 角度范围：
     * top -135  --- -45    0
     * left: -180 --- -135  ||  135 --- 180   3
     * right: -45 --- 45  1
     * bottom: 45 --- 135   2
     */
    // if (deg > -135 && deg < -45) {

    // }
    return (Math.round((deg + 180) / 90) + 3) % 4;   
}

document.onmousemove = function (e) {
    var x = e.clientX / window.innerWidth - 0.5; // 0 - 1  ===> -0.5 - 0.5
    var y = e.clientY / window.innerHeight - 0.5 ; // 0 - 1
    var roY = x * 20;
    var roX = -y * 20;
    // if (x < 0.5) {
    //     roY = '20deg';
    // } else if (x > 0.5) {
    //     roY = '-20deg';
    // }

    // if (y < 0.5) {
    //     roX = '20deg';
    // } else if (y > 0.5) {
    //     roX = '-20deg';
    // }
    wrapper.style.transform = "rotateX(" + roX + "deg) rotateY(" + roY + "deg)";
}