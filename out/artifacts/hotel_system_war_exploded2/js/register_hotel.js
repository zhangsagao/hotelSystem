$(function () {

    showProvince();//展示最开始的省份

    $("#cf").bind("click",function () {//宾馆注册界面提交按钮的点击事件
        //初始化变量值
        var id = $("#id").val();
        var password = $("#password").val();
        var name = $("#name").val();
        var phone = $("#phone").val();
        var province = $("#province option:selected").text();
        var city = $("#city option:selected").text();
        var district = $("#district option:selected").text();
        var location = $("#location").val();
        var introduction = $("#introduction").val();
        if(isNull(introduction)){introduction="无";}
        //数据前端验证
        // console.log(isNull(id));

        if(isNull(id)){alert('请填写账号');return ;}
        if(isNull(password)){alert('请填写密码');return ;}
        if(isNull(name)){alert('请填写宾馆名称');return ;}
        if(isNull(phone)){alert('请填写手机号');return ;}
        if(phone.length<11){alert('手机号长度异常');return ;}
        if(!isPhone(phone)){alert('手机号格式异常');return ;}
        if(province==="=请选择省份="){alert('请完整省份');return ;}
        if(city==="=请选择城市="){alert('请完整城市');return ;}
        if(district==="=请选择县区="){alert('请完整区县');return ;}
        if(isNull(location)){alert('请完整详细地址');return ;}


        //传递数据
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/register_hotel",
            data:{
                id:id,
                password:password,
                name:name,
                phone:phone,
                province:province,
                city:city,
                district:district,
                location:location,
                introduction:introduction,
            },
            success:function (data){
                // console.log(data);
                registerSuccess(data);
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        })

    })
});

function isPhone(phone) {
    var myreg=/^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (!myreg.test(phone)) {
        return false;
    } else {
        return true;
    }
}