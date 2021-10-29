$(function () {
    $("#cf").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/register_guest",
            data:{
                id:$("#id").val(),
                password:$("#password").val(),
                name:$("#name").val(),
                uid:$("#uid").val(),
                phone:$("#phone").val()
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