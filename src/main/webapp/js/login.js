$(function (){
    //注册按键
    $('#denglu').bind("click",function (){
        //初始化数据
        var name = $("#name").val();//账号
        var password = $("#password").val();//密码
        var identity;
		if($("#guest").prop("checked")){
			identity = "guest";
		}
		else if($("#hotel").prop("checked")){
			identity = "hotel";
		}
        //guest表示客人guest，hotel表示宾馆hotel
        //前端判定
        console.log(identity);
        if(isNull(name)){alert('请完整填写信息');return ;}
        if(isNull(password)){alert('请完整填写信息');return ;}
        //后端请求
        $.ajax({
            type:"post",
            url:getUrl()+"/login",
            data:{
                name:name,
                password:password,
                identity:identity,
            },
            success:function (data){
                console.log(data);
                if(data==="true"){
                    if(identity==="guest"){
                        window.open("main.jsp?id="+name,"_self");
                    }
                    else if(identity==="hotel"){
                        window.open("mainw.jsp?id="+name,"_self");
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

    //点击注册按钮
    $('#zhuce').bind("click",function (){
        var identity;
        if($("#guest").prop("checked")){
            identity = "guest";
        }
        else if($("#hotel").prop("checked")){
            identity = "hotel";
        }
        console.log(identity);
        //进行判定
        if(identity==="guest"){
            window.open('registerG.html','_blank');
        }
        else if(identity==="hotel"){
            window.open('registerH.html','_blank');
        }
    })

})