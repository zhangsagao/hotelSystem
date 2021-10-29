$(function (){
    $('#denglu').bind("click",function (){
        var url = "http://localhost:"+getLocalhost()+"/h/login";
        $.ajax({
            type:"get",
            url:url,
            data:{
                name:$("#id").val(),
                password:$("#password").val(),
                identity:$("#guest").prop("checked")
            },
            success:function (data){
                console.log(data);
                if(data==="true"){
                    if($("#guest").prop("checked")===true){
                        window.open("main.jsp?id="+$("#id").val(),"_self");
                    }
                    else{
                        window.open("mainw.jsp?id="+$("#id").val(),"_self");
                    }
                }
                else {
                    alert('您输入的账号或密码有误，请检查！');
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $('#zhuce').bind("click",function (){
        if($("#guest").prop("checked")){
            window.open('register_guest.jsp','_blank');
        }
        else{
            window.open('register_hotel.jsp','_blank');
        }
    })

})