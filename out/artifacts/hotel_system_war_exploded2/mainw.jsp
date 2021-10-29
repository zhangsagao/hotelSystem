<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>

<head>
    <title>宾馆界面</title>
    <meta charset="UTF-8">
    <script src="js/jquery-3.6.0.js" type="text/javascript" charset="UTF-8"></script>

    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap-grid.min.css">
    <link rel="stylesheet" type="text/css" href="bootstrap-4.6.0-dist/css/bootstrap-reboot.min.css">
    <script src="bootstrap-4.6.0-dist/js/bootstrap.min.js" type="text/javascript" charset="UTF-8"></script>
<%--encharts引入--%>
    <script src="echarts-5.1.2/echarts.js" type="text/javascript" charset="UTF-8"></script>
<%--    <script src="echarts-5.1.2/echarts.esm.js" type="text/javascript" charset="UTF-8"></script>--%>

    <script src="js/utils.js" type="text/javascript" charset="UTF-8"></script>
    <link rel="stylesheet" type="text/css" href="layui-v2.6.8/layui/css/layui.css">
    <script src="layui-v2.6.8/layui/layui.js" type="text/javascript" charset="UTF-8"></script>
    <script src="js/mainw.js" type="text/javascript" charset="UTF-8"></script>
    <script language="JavaScript" type="text/javascript">

        function clearNoNum(obj){

            obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符

            obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是.

            obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.

            obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");

        }

    </script>
</head>

<body>

<div class="layui-tab">

    <ul class="layui-tab-title" style="background: #1E9FFF">
        <li class="layui-this" id="TabHotel" style="width: 30%">宾馆信息</li>
        <li style="width: 40%" id="TabRoom">房间管理</li>
        <li style="width: 30%" id="TabOrder">订单查看</li>
    </ul>

    <div class="layui-tab-content">

        <div class="layui-tab-item layui-show">
            <div class="layui-fluid" style="height: 100%" >
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>宾馆名称</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="hotel_id">
                    </div>
                </div>
                <br/>
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>宾馆地址</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="hotel_location">
                    </div>
                </div>
                <br/>
                <div class="layui-row">
                    <div class="layui-col-md2 layui-col-md-offset2">
                        <label>宾馆介绍</label>
                    </div>
                    <div class="layui-col-md6 layui-col-md-offset2" id="hotel_introduction">
                    </div>
                </div>
            </div>
        </div>

        <div class="layui-tab-item">
            <div class="layui-fluid">
                <div class="layui-row" style="height:38px;">
                    <div class="layui-col-md3">
                        <button class="layui-btn layui-btn-normal" id="produceRoom" style="width: 100%">增加房间</button>
                    </div>
                    <div class="layui-col-md3">
                        <button class="layui-btn layui-btn-normal" id="inRoom" style="width: 100%">办理入住手续</button>
                    </div>
                    <div class="layui-col-md3">
                        <button class="layui-btn layui-btn-normal" id="leaveRoom" style="width: 100%">办理离开手续</button>
                    </div>
                    <div class="layui-col-md3">
                        <button class="layui-btn layui-btn-normal" id="changeRoomInformation" style="width: 100%">换房</button>
                    </div>
                </div>
                <div class="layui-fluid">
                    <table class="layui-hide" id="room" lay-filter="roomButton"></table>
                    <script type="text/html" id="roomBar">
                        <a class="layui-btn layui-btn-primary layui-btn-xs" lay-event="edit">编辑</a>
                        <a class="layui-btn layui-btn-xs" lay-event="del">删除</a>
                    </script>
                </div>
            </div>
        </div>

        <div class="layui-tab-item">
            <div class="layui-fluid">
                <%--                表格--%>
                <div id="type" style="width: 980px;height:200px;"></div>
                <table class="layui-hide" id="order"></table>
            </div>
        </div>

    </div>
</div>

<%--//Room界面增加房间模态框--%>
<div class="modal fade" id="produceRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="myModalLabel" align="center">增加房间</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="produceRoomModalName">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" >类型</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="produceRoomModalType">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2">价格</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " id="produceRoomModalPrice">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" >预订额度</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup=clearNoNum(this) id="produceRoomModalDiscount">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="produceRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--//Room界面删除房间模态框--%>
<div class="modal fade" id="deleteRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="deleteModalLabel" align="center">删除房间</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="deleteRoomModalName" readonly="readonly">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="deleteRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--//Room界面更改房间信息模态框--%>
<div class="modal fade" id="changeRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                
                <h2 class="modal-title" id="changeRoomLabel" align="center">更改房间信息</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="changeRoomModalOldName" readonly="readonly">
                    </div>
                    <div class="form-group ">
                        <label class="layui-col-md2" hidden="hidden">新房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="changeRoomModalName" hidden="hidden">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" >类型</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="changeRoomModalType">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2">价格</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^\d]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d]/g,'') " id="changeRoomModalPrice">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" >预订额度</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup=clearNoNum(this) id="changeRoomModalDiscount">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" hidden="hidden">房间情况</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="changeRoomCondition" hidden="hidden">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="changeRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<%--//Room界面换房模态框--%>
<div class="modal fade" id="cRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
               
                <h2 class="modal-title" id="cRoomLabel" align="center">更改房间信息</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">原房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="cRoomModalOldName">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2">新房间名</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" id="cRoomModalName">
                    </div>
                    <div class="form-group">
                        <label class="layui-col-md2" >更换人id</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^\w]/g,'')" onpaste="this.value=this.value.replace(/[^\w]/g,'')" id="cOwnerModal">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="cRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="inRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                
                <h2 class="modal-title" id="inModalLabel" align="center">办理入住手续</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">客户id</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^\w]/g,'')" onpaste="this.value=this.value.replace(/[^\w]/g,'')" id="inRoomModalId">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="inRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>

<div class="modal fade" id="leaveRoomModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
               
                <h2 class="modal-title" id="leaveModalLabel" align="center">办理离开手续</h2>
            </div>
            <div class="modal-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="layui-col-md2">客户id</label>
                    </div>
                    <div>
                        <input type="text" class="form-control" onkeyup="this.value=this.value.replace(/[^\w]/g,'')" onpaste="this.value=this.value.replace(/[^\w]/g,'')" id="leaveRoomModalId">
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" id="leaveRoomModalSubmit">提交</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal -->
</div>
</body>
</html>
