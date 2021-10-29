<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>客人界面</title>
    <meta charset="UTF-8">
	
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	
    <script src="js/jquery-3.6.0.js" type="text/javascript" charset="UTF-8"></script>

    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap-grid.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap-reboot.min.css">
    <script src="bootstrap-4.6.0-dist/js/bootstrap.min.js" type="text/javascript" charset="UTF-8"></script>

    <link rel="stylesheet" type="text/css" href="layui-v2.6.8/layui/css/layui.css">
    <script src="layui-v2.6.8/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/utils.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/city.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/location.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/main.js" type="text/javascript"></script>
    <!--
      本界面为客人主界面
      -->
</head>
<body>
<!--tab标签，以下为tab内容-->
<div class="layui-tab">
    <!--tab头部，以下为tab头部内容-->
    <ul class="layui-tab-title" style="background: #1E9FFF">
        <li class="layui-this" id="TabGuest" style="width: 30%">个人信息</li>
        <li style="width: 40%" id="TabRoom">宾馆入住</li>
        <li style="width: 30%" id="TabOrder">订单查看</li>
    </ul>
    <!--tab内容，以下为tab内容-->
    <div class="layui-tab-content" style="width: 100%">
    <%--第一份内容--%>
        <div class="layui-tab-item layui-show">
            <div class="layui-fluid" style="height: 100%" >
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>个人名称</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="guest_name">
                    </div>
                </div>
                <br/>
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>身份证号</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="guest_uid">
                    </div>
                </div>
                <br/>
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>账号</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="guest_id">
                    </div>
                </div>
                <br/>
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>手机号</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="guest_phone">
                    </div>
                </div>
            </div>
        </div>
        <%--第二份内容--%>
        <div class="layui-tab-item">
            <div class="layui-fluid">
                <div class="layui-row" style="height: 38px">
                    <div class="layui-col-md1" style="height: 38px">
                        <select id="province" onchange="showCity(this)" style="width: 100%;height: 100%">
                            <option>=请选择省份=</option>
                        </select>
                    </div>
                    <div class="layui-col-md1" style="height: 38px">
                        <select id="city" onchange="showDistinct(this)" style="width: 100%;height: 100%">
                            <option>=请选择城市=</option>
                        </select>
                    </div>
                    <div class="layui-col-md1" style="height: 38px">
                        <select id="district" style="width: 100%;height: 100%">
                            <option>=请选择县区=</option>
                        </select>
                    </div>
                    <div class="layui-col-md2 layui-col-md-offset1">
                        <input type="text" class="layui-input" placeholder="入住时间" id="startTime" style="width: 100%;"/>
                    </div>
                    <div class="layui-col-md2 layui-col-md-offset1">
                        <input type="text" class="layui-input" placeholder="离开时间" id="endTime" style="width: 100%;"/>
                    </div>
                    <div class="layui-col-md1 layui-col-md-offset2">
                        <button class="layui-btn-primary layui-btn-warm" id="selectRoom" style="width: 100%;">查询</button>
                    </div>
                </div>
                <div class="layui-fluid">
                    <table class="layui-hide" id="hotel" lay-filter="hotelButton"></table>
                    <script type="text/html" id="hotelBar">
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="look">详情</a>
                    </script>
                </div>
            </div>
        </div>
        <%--第三份内容--%>
        <div class="layui-tab-item">
            <div class="layui-fluid">
                <table class="layui-hide" id="order" lay-filter="orderButton"></table>
                <script type="text/html" id="orderBar">
                    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="back">退款</a>
<%--                    <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="pay">支付余款</a>--%>
                </script>
            </div>
        </div>


    </div>
</div>

<%--产生预订订单的模态框--%>
<div class="modal fade" id="produceOrderPartModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                
                <h2 class="modal-title" id="myModalLabel">预订房间</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>宾馆名称</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" id="produceOrderPartModalId" class="form-control">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>房间类型</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderPartModalType">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>每日花费</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderPartModalPrice">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>预订优惠</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderPartModalDiscount">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md2 layui-col-md-offset2">
                            <label>入住时间</label>
                        </div>
                        <div class="layui-col-md2 layui-col-md-offset4">
                            <label>离开时间</label>
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md6 layui-input-inline">
                            <input type="text" readonly="readonly" class="layui-input" id="produceOrderPartModalStartTime" placeholder="yyyy-MM-dd HH:mm:ss">
                        </div>
                        <div class="layui-col-md6 layui-input-inline">
                            <input type="text" readonly="readonly" class="layui-input" id="produceOrderPartModalEndTime" placeholder="yyyy-MM-dd HH:mm:ss">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>应付金额</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderPartModalMoney">
                        </div>
                    </div>
                    <br/>
                    <div hidden="hidden">
                        <input type="text" hidden="hidden" id="produceOrderPartModalStartTimeHidden">
                        <input type="text" hidden="hidden" id="produceOrderPartModalEndTimeHidden">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="produceOrderPartModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
<%--产生全款订单的模态框--%>
<div class="modal fade" id="produceOrderAllModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
               
                <h2 class="modal-title" id="Label">全款支付</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>宾馆名称</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" id="produceOrderAllModalId" class="form-control">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>房间类型</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderAllModalType">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>每日花费</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderAllModalPrice">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md2 layui-col-md-offset2">
                            <label>入住时间</label>
                        </div>
                        <div class="layui-col-md2 layui-col-md-offset4">
                            <label>离开时间</label>
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md6 layui-input-inline">
                            <input type="text" readonly="readonly" class="layui-input" id="produceOrderAllModalStartTime" placeholder="yyyy-MM-dd HH:mm:ss">
                        </div>
                        <div class="layui-col-md6 layui-input-inline">
                            <input type="text" readonly="readonly" class="layui-input" id="produceOrderAllModalEndTime" placeholder="yyyy-MM-dd HH:mm:ss">
                        </div>
                    </div>
                    <br/>
                    <div class="layui-row">
                        <div class="layui-col-md3">
                            <label>应付金额</label>
                        </div>
                        <div class="layui-col-md9">
                            <input type="text" readonly="readonly" class="form-control" id="produceOrderAllModalMoney">
                        </div>
                    </div>
                    <br/>
                    <div hidden="hidden">
                        <input type="text" hidden="hidden" id="produceOrderAllModalDiscount">
                        <input type="text" hidden="hidden" id="produceOrderAllModalEndTimeHidden">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="produceOrderAllModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--产生房间情况的模态框--%>
<div class="modal fade" id="roomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
        <div class="modal-content" style="width: 800px;">
            <div class="modal-header">
               
                <h2 class="modal-title" id="HotelModalLabel">房间情况</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="layui-fluid">
                        <table class="layui-hide" id="room" lay-filter="roomButton"></table>
                        <script type="text/html" id="roomBar">
                            <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="part">预订</a>
                            <a class="layui-btn layui-btn-xs" lay-event="all">全款</a>
                        </script>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="roomModalSubmit">提交</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
