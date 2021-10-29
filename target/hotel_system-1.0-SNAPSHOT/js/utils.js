function getUrlQueryString(names, urls) {
    urls = urls || window.location.href;
    urls && urls.indexOf("?") > -1 ? urls = urls
        .substring(urls.indexOf("?") + 1) : "";
    var reg = new RegExp("(^|&)" + names + "=([^&]*)(&|$)", "i");
    var r = urls ? urls.match(reg) : window.location.search.substr(1)
        .match(reg);
    if (r != null && r[2] != "")
        return unescape(r[2]);
    return null;
};
function addScript(){
    document.write("<script language=javascript src="+"js/jquery-3.6.0.js"+"></script>");
};
function getLocalhost() {
    return 8400;
};
function registerSuccess(data) {
    if(data==="true") {
        alert("注册成功");
        window.close();
    }
    else {
        alert(data);
    }
}
