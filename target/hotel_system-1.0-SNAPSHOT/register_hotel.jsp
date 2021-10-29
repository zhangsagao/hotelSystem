<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>宾馆注册界面</title>
    <meta charset="UTF-8">
    <script src="js/jquery-3.6.0.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
    <script src="js/utils.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/city.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/location.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/register_hotel.js" type="text/javascript" charset="UTF-8"></script>
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
<div class="container middle" id="loginDiv">
    <div align="center"><label for="id">账号:</label><input type="text" id="id"></div>
    <div align="center"><label for="password">密码:</label><input type="text" id="password"></div>
    <div align="center"><label for="name">宾馆名:</label><input type="text" id="name"></div>
    <div align="center"><label for="phone">手机号:</label><input type="text" id="phone"></div>
    <div align="center">
        <!--省选择-->
        <select id="province" onchange="showCity(this)">
            <option>=请选择省份=</option>
        </select>
        <!--市选择-->
        <select id="city" onchange="showDistinct(this)">
            <option>=请选择城市=</option>
        </select>
        <!--县/区选择-->
        <select id="distinct">
            <option>=请选择县区=</option>
        </select>
    </div >
    <div align="center"><label for="location">详细地址:</label><input type="text" maxlength="30" id="location"></div>
    <div align="center"><label for="introduction">简介:</label><input type="text" maxlength="50" id="introduction"></div>
    <button type="button" id="cf" >确认</button>

</div>
</body>
</html>