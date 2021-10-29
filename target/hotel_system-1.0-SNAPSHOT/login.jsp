<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>登录界面</title>
    <meta charset="UTF-8">
    <script src="js/jquery-3.6.0.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/utils.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/login.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="layui-v2.6.8/layui/css/layui.css">
    <script src="layui-v2.6.8/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="css/myCss.css">
    <style>
        html{
            height: 100%;
            width: 100%;
            overflow: hidden;
            margin: 0;
            padding: 0;
            background: url("picture/login.jpg") no-repeat 0px 0px;
            background-size: 100% 100%;
            -moz-background-size: 100% 100%;
        }
        #loginDiv {
            width: 35%;
            justify-content: center;
            align-items: center;
            height: 250px;
            background-color: rgba(75, 81, 95, 0.3);
            box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
            border-radius: 5px;
        }
    </style>
</head>
<body>
<div class="middle" id="loginDiv">
    <div class="layui-row">
        <p class="layui-font-blue" style="font-size: 30px;text-align: center">欢迎来到本系统</p>
    </div>
    <br/>
    <br/>
    <div align="center">
        账号:<input type="text" id="id">
    </div>
    <br/>
    <div align="center">
        密码:<input type="password" id="password">
    </div>
    <br/>
    <div align="center">
        身份:&nbsp&nbsp<input type="radio" name="identity" checked="checked" id="guest">&nbsp客人&nbsp&nbsp<input type="radio" name="identity">&nbsp宾馆
    </div>
    <br/>
    <div align="center">
        <button type="button" id="denglu" class="layui-btn layui-btn-radius layui-btn-normal">登录</button>
        <button type="button" id="zhuce" class="layui-btn layui-btn-radius layui-btn-warm">注册</button>
    </div>
</div>
</body>
</html>
