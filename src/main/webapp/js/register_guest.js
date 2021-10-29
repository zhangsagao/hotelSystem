$(function () {

    $("#cf").bind("click",function () {
        //初始化数据
        var id = $("#id").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var uid = $("#uid").val();
        var phone = $("#phone").val();
        //验证前端数据
        if(isNull(id)){alert('请完整填写账号');return ;}
        if(isNull(password)){alert('请完整填写密码');return ;}
        if(isNull(name)){alert('请完整填写姓名');return ;}
        if(isNull(phone)){alert('请完整填写手机号');return ;}
        if(phone.length<11){alert('手机号长度异常');return ;}
        if(!isPhone(phone)){alert('手机号格式异常');return ;}
        if(isNull(uid)){alert('请完整填写身份证号');return ;}
        var ID = String(uid);
        if(!checkIDCard(ID)){alert('身份证号错误,请检查');return ;}
        //发送后台
        $.ajax({
            type:"get",
            url:getUrl()+"/register_guest",
            data:{
                id:id,
                password:password,
                name:name,
                uid:uid,
                phone:phone,
            },
            success:function (data){
                console.log(data);
                registerSuccess(data);
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        })

    })
});

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