
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
};//用于搜索get方法传输的值

function getLocalhost() {
    return 8800;
};//设置端口值

function registerSuccess(data) {
    if(data==="true") {
        alert("注册成功");
        window.close();
    }
    else {
        alert(data);
    }
};//用于应对注册成功的反馈

function getDate(data) {
    return data/(1000*3600*24);
};//返回getTime()得到的毫秒所对应的天数

function isNull(str){
    return str == null || str.trim() === "";
};//判断返回的字符是否为空

function getUrl(){
    return "http://localhost:"+getLocalhost()+"/h";
};//返回Url

function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2002-12-18格式
    var  aDate,  oDate1,  oDate2,  iDays;
    aDate  =  sDate1.split("-");
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) ;   //转换为12-18-2002格式
    aDate  =  sDate2.split("-");
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);
    iDays  =  parseInt((oDate1-oDate2)/1000/60/60/24);   //把相差的毫秒数转换为天数
    return  iDays
};//返回两个日期之间相差的天数

function checkIDCard(idcode){
    // 加权因子
    var weight_factor = [7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    // 校验码
    var check_code = ['1', '0', 'X' , '9', '8', '7', '6', '5', '4', '3', '2'];

    var code = idcode + "";
    var last = idcode[17];//最后一个

    var seventeen = code.substring(0,17);

    // ISO 7064:1983.MOD 11-2
    // 判断最后一位校验码是否正确
    var arr = seventeen.split("");
    var len = arr.length;
    var num = 0;
    for(var i = 0; i < len; i++){
        num = num + arr[i] * weight_factor[i];
    }

    // 获取余数
    var resisue = num%11;
    var last_no = check_code[resisue];

    // 格式的正则
    // 正则思路
    /*
     第一位不可能是0
     第二位到第六位可以是0-9
     第七位到第十位是年份，所以七八位为19或者20
     十一位和十二位是月份，这两位是01-12之间的数值
     十三位和十四位是日期，是从01-31之间的数值
     十五，十六，十七都是数字0-9
     十八位可能是数字0-9，也可能是X
     */
    var idcard_patter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/;

    // 判断格式是否正确
    var format = idcard_patter.test(idcode);

    // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
    return last === last_no && format;
}

function isPhone(phone) {
    var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}