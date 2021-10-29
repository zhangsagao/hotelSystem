$(function () {

    showProvince();

    $("#cf").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/register_hotel",
            data:{
                id:$("#id").val(),
                password:$("#password").val(),
                name:$("#name").val(),
                phone:$("#phone").val(),
                province:$("#province option:selected").text(),
                city:$("#city option:selected").text(),
                distinct:$("#distinct option:selected").text(),
                location:$("#location").val(),
                introduction:$("#introduction").val()
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