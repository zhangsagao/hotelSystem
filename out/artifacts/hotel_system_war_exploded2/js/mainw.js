$(function () {

    var hostId = getUrlQueryString("id");

    //Hotel界面

    function getHotelInformation(){
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/information_hotel",
            data:{
                id:hostId,
            },
            dataType:"json",
            success:function (data) {
                if(data==="false"){
                    alert('异常，该用户已不存在');
                }
                else{
                    $("#hotel_id").append($("<p>"+data[0].id+"</p>"));
                    $("#hotel_location").append($("<p>"+data[0].province+" "+data[0].city+" "+data[0].district+" "+data[0].location+"</p>"));
                    $("#hotel_introduction").append($("<p>"+data[0].introduction+"</p>"));
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });//宾馆信息
    }

    getHotelInformation();


    //Room界面


    function getRoom(){
        layui.use('table', function(){
            var table = layui.table;
            table.render({
                elem: '#room',
                url:getUrl()+"/showRoom_hotel?id="+hostId,
                method:"get",
                cols: [[
                    {field:'id',width:"12.5%",title: '宾馆名称'},
                    {field:'name',width:"12.5%",title: '房间名',sort: true},
                    {field:'type',width:"12.5%",title: '类型', sort: true},
                    {field:'price',width:"12.5%",title: '价格',sort: true},
                    {field:'discount',width:"12.5%",title: '预订额度', sort: true},
                    {field:'condition',width:"12.5%",title: '情况', sort: true,},
                    {fixed: 'right',width:"25%",align:'center', toolbar: '#roomBar'}
                ]],
                parseData:function (res){
                    return{
                        "code":0,
                        "msg":"",
                        "count":3000,
                        data:res
                    };
                },
                done: function (res, curr, count) {
                    var that = this.elem.next();
                    res.data.forEach(function (item, index) {
                        var tr = that.find(".layui-table-box tbody tr[data-index='" + index + "']");
                        if (item.condition === "abnormal") {
                            tr.css("background-color", "#FF5722");
                            tr.css("color", "white");
                        }
                        else if(item.condition === "use"){
                            tr.css("background-color", "green");
                            tr.css("color", "white");
                        }
                    });
                },
            });

            table.on('tool(roomButton)', function(obj){
                var data = obj.data;
                console.log(obj)
                if(obj.event === 'edit'){
                    $('#changeRoomModal').modal('show');
                    $("#changeRoomModalOldName").val(data.name);
                    $("#changeRoomModalName").val(data.name);
                    $("#changeRoomModalType").val(data.type);
                    $("#changeRoomModalPrice").val(data.price);
                    $("#changeRoomModalDiscount").val(data.discount);
                    $("#changeRoomCondition").val(data.condition);
                }
                else if(obj.event === 'del'){
                    $('#deleteRoomModal').modal('show');
                    $("#deleteRoomModalName").val(data.name);
                }
            });

        });
    }

    $("#TabRoom").bind("click",function (){
        getRoom();
    });

    $("#produceRoom").bind("click",function () {
        $('#produceRoomModal').modal('show');
    })

    $("#produceRoomModalSubmit").bind("click",function () {
        var price = $("#produceRoomModalPrice").val();
        if(price<=0){
            alert('价格异常');
            return ;
        }
        var discount = $("#produceRoomModalDiscount").val();
        if(discount<=0||discount>=1){
            alert('预订折扣异常');
            return ;
        }
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/newRoom",
            data:{
                id:hostId,
                name:$("#produceRoomModalName").val(),
                type:$("#produceRoomModalType").val(),
                price:price,
                discount:discount,
            },
            success:function (data) {
                if(data==="true"){
                    alert('创建成功');
                    getRoom();
                    $("#produceRoomModal").modal('hide');
                }
                else{
                    alert(data);
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#inRoom").bind("click",function () {
        $('#inRoomModal').modal('show');
    })

    $("#inRoomModalSubmit").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/startOrder",
            data:{
                id:hostId,
                uid:$("#inRoomModalId").val(),
            },
            success:function (data) {
                console.log(data);
                if(data=="false"){
                    alert('办理失败');
                }
                else{
                    alert(data);
                    $("#inRoomModal").modal('hide');
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#leaveRoom").bind("click",function () {
        $('#leaveRoomModal').modal('show');
    })

    $("#leaveRoomModalSubmit").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/finishOrder",
            data:{
                id:hostId,
                uid:$("#leaveRoomModalId").val(),
            },
            success:function (data) {
                console.log(data);
                if(data=="false"){
                    alert('办理失败');
                }
                else{
                    alert(data);
                    $("#leaveRoomModal").modal('hide');
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#deleteRoom").bind("click",function () {
        $('#deleteRoomModal').modal('show');
    })

    $("#deleteRoomModalSubmit").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/deleteRoom",
            data:{
                id:hostId,
                name:$("#deleteRoomModalName").val(),
            },
            success:function (data) {
                if(data==="true"){
                    alert('删除成功');
                    getRoom();
                    $("#deleteRoomModal").modal('hide');
                }
                else{
                    alert(data);
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#changeRoom").bind("click",function () {
        $('#changeRoomModal').modal('show');
    })

    $("#changeRoomModalSubmit").bind("click",function () {
        var newPrice = $("#changeRoomModalPrice").val()
        if(newPrice<=0){
            alert('价格异常');
            return ;
        }
        var newDiscount = $("#changeRoomModalDiscount").val();
        if(newDiscount<=0||newDiscount>1){
            alert('预订折扣异常');
            return ;
        }
        var newCondition = $("#changeRoomCondition").val();
        $.ajax({
            type:"get",
            url:getUrl()+"/changeRoomInformation",
            data:{
                id:hostId,
                oldName:$("#changeRoomModalOldName").val(),
                newName:$("#changeRoomModalName").val(),
                newType:$("#changeRoomModalType").val(),
                newPrice:newPrice,
                newDiscount:newDiscount,
                newCondition:newCondition
            },
            success:function (data) {
                if(data==="true"){
                    alert('修改信息成功');
                    getRoom();
                    $("#changeRoomModal").modal('hide');
                }
                else{
                    alert(data);
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#changeRoomInformation").bind("click",function () {
        $('#cRoomModal').modal('show');
    })

    $("#cRoomModalSubmit").bind("click",function () {
        $.ajax({
            type:"get",
            url:"http://localhost:"+getLocalhost()+"/h/changeRoom",
            data:{
                id:hostId,
                oldName:$("#cRoomModalOldName").val(),
                newName:$("#cRoomModalName").val()
            },
            success:function (data) {
                if(data==="true"){
                    alert('更换房间成功');
                    $("#cRoomModal").modal('hide');
                }
                else{
                    alert(data);
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    //Order界面
    var type = [];//用于为图表储存信息
    var price = [];

    function getOrder() {
        layui.use('table', function(){
            var table = layui.table;
            table.render({
                elem: '#order',
                url:"http://localhost:"+getLocalhost()+"/h/showOrder?identity=hotel&id="+hostId,
                method:"get",
                parseData:function (res){
                    return{
                        "code":0,
                        "msg":"",
                        "count":1000,
                        data:res
                    };
                },
                cols: [[
                    {field:'id', width:"8%", title: '宾馆名称'},
                    {field:'name', width:"8%", title: '房间名',sort: true},
                    {field:'uid', width:"8%", title: '客户id', sort: true},
                    {field:'orderStartTime', width:"12%", title: '订单创建时间',sort: true},
                    {field:'orderEndTime', width:"12%",title: '订单结束时间', sort: true},
                    {field:'startTime', width:"12%",title: '开始入住时间', sort: true,},
                    {field:'endTime', width:"12%",title: '结束入住时间', sort: true,},
                    {field:'price', width:"8%",title: '应交金额', sort: true,},
                    {field:'money', width:"8%",title: '已交金额', sort: true,},
                    {field:'condition', width:"12%",title: '订单情况', sort: true,}
                ]],
                initSort: {field:'endTime', type:'asc'},
                done:function (){
                    var temp = layui.table.getData("order");
                    var typeCount = -1;
                    console.log(temp);
                    for(var i=0;i<temp.length;i++){
                        if(type.indexOf(temp[i].endTime)===-1){
                            typeCount++;
                            type[typeCount] = temp[i].endTime;
                            if(temp[i].condition==="已结束"){
                                price[typeCount] = temp[i].price;
                            }
                            else{
                                price[typeCount] = 0;
                            }
                        }
                        else{
                            if(temp[i].condition==="已结束"){
                                price[typeCount] += temp[i].price;
                            }
                        }
                    }
                    console.log(type);
                    console.log(price);
                    getChart();
                    type=null;
                    price=null;
                }
            });
        });
    }

    $("#TabOrder").bind("click",function () {
        getOrder();
    });
// 设置图表
    function getChart(){
        var myChart = echarts.init(document.getElementById("type"));
// 找到相关数据

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '房间类型销售情况'
            },
            tooltip: {},
            legend: {
                data:['销售额']
            },
            xAxis: {
                data: type
            },
            yAxis: {},
            series: [{
                name: '销售额',
                type: 'bar',
                data: price
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }


})

