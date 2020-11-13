export const tTiggle = (url) => {
    var u = navigator.userAgent;
    var isWeixin = u.toLowerCase().indexOf('micromessenger') !== -1; // 微信内
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //android终端
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    // 微信内
    if(isWeixin) {
        alert('请在浏览器上打开')
    } else {
        //ios的scheme协议
        window.location.href = `taobao://${url}`
        setTimeout(function(){
            //android端
            let hidden = window.document.hidden || window.document.mozHidden || window.document.msHidden ||window.document.webkitHidden 
            if(typeof hidden =="undefined" || hidden ==false){
                if (isAndroid) {
                    window.location.href ="https://a.app.qq.com/o/simple.jsp?pkgname=com.taobao.taobao";
                }
                //ios端
                if (isIOS) {
                    window.location.href = "http://itunes.apple.com/app/id387682726";
                }
            }
        }, 6000);
    }
}
