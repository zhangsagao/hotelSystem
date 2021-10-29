<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>宾馆界面</title>
    <meta charset="UTF-8">
    <script src="js/jquery-3.6.0.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css">
    <script src="js/utils.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="layui-v2.6.8/layui/css/layui.css">
    <script src="layui-v2.6.8/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/mainw.js" type="text/javascript" charset="UTF-8"></script>
</head>
<body>
<div class="layui-container">
    <div class="layui-row">
        <div class="layui-col-md-3">
            <label id="hotel">宾馆信息</label>
        </div>
        <div class="layui-col-md-3">
            <label id="room">房间管理</label>
        </div>
        <div class="layui-col-md-3">
            <label id="order">订单查看</label>
        </div>
        <div class="layui-col-md-3">
            <label id="information">宾馆详情</label>
        </div>
    </div>
    <div id="show">
    </div>
</div>
</body>
</html>
