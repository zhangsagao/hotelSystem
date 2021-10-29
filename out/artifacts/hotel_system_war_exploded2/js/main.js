$(function (){
	
	var hostId = getUrlQueryString('id');
    //Guest界面

    //获取客人信息，自动化
    function getGuestInformation() {
        //请求数据
        $.ajax({
            type:"get",
            url:getUrl()+"/information_guest",
            data:{
                id:hostId,
            },
            dataType:"json",
            success:function (data) {
                if(data===false){
                    alert('异常，该用户已不存在');
                }
                else{
                    $("#guest_name").append($("<p>"+data[0].name+"</p>"));
                    $("#guest_uid").append($("<p>"+data[0].uid+"</p>"));
                    $("#guest_id").append($("<p>"+data[0].id+"</p>"));
                    $("#guest_phone").append($("<p>"+data[0].phone+"</p>"));
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });//客人信息
    }
    //自动化调用信息
    getGuestInformation();

    //Room界面

    showProvince();//可选择省份

    layui.use(function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#startTime',
            min:0,
            max:15,
            done:function (value,date,endDate) {
                $("#startTime").val(value);
            },
        });
    });//查询所用起始时间

    layui.use(function () {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#endTime',
            min:0,
            max:15,
            done:function (value,date,endDate) {
                $("#endTime").val(value);
            },
        });
    });//查询所用终止时间

    function getRoom(hotelId){

        layui.use('table', function(){

            var table = layui.table;

            table.render({
                elem: '#room',
                url:getUrl()+"/showRoom_guest?"+
                    "id="+hotelId+
                    "&startTime="+$("#startTime").val()+
                    "&endTime="+$("#endTime").val(),
                method:"get",
                parseData:function (res){
                    return{
                        "code":0,
                        "msg":"",
                        "count":1000,
                        data:res
                    };
                },//确保传输的数据正常显示
                cols: [[
                    {field:'type',width:"20%",title: '类型', sort: true},
                    {field:'price',width:"20%",title: '单日价格',sort: true},
                    {field:'discount',width:"15%",title: '预订额度', sort: true},
                    {field:'count',width: "15%",title:'余量',sort:true},
                    {fixed: 'right',width:"30%",align:'center', toolbar: '#roomBar'}
                ]]
            });

            table.on('tool(roomButton)', function(obj){
                var data = obj.data;
                console.log(data);
                var startTime = $("#startTime").val();
                var endTime = $("#endTime").val();
                if(obj.event === 'part'){//预订购买
                    $('#produceOrderPartModal').modal('show');
                    $('#produceOrderPartModalId').val(data.id);
                    $('#produceOrderPartModalType').val(data.type);
                    $('#produceOrderPartModalPrice').val(data.price);
                    $('#produceOrderPartModalDiscount').val(data.discount);
                    $('#produceOrderPartModalStartTime').val(startTime);
                    $('#produceOrderPartModalEndTime').val(endTime);
                    var date = DateDiff(endTime,startTime)+1;
                    $('#produceOrderPartModalMoney').val(date*data.price*data.discount);
                    $("#roomModal").modal('hide');
                } else if(obj.event === 'all'){
                    $('#produceOrderAllModal').modal('show');
                    $('#produceOrderAllModalId').val(data.id);
                    $('#produceOrderAllModalType').val(data.type);
                    $('#produceOrderAllModalPrice').val(data.price);
                    $('#produceOrderAllModalDiscount').val(data.discount);
                    $('#produceOrderAllModalStartTime').val(startTime);
                    $('#produceOrderAllModalEndTime').val(endTime);
                    var date = DateDiff(endTime,startTime)+1;
                    $('#produceOrderAllModalMoney').val(date*data.price);
                    $("#roomModal").modal('hide');
                }
            });

        });

    }

    function getHotel() {
        layui.use('table', function(){

            var table = layui.table;

            table.render({
                elem: '#hotel',
                url:getUrl()+"/showHotel?"+
                    "province="+$("#province option:selected").text()+
                    "&city="+$("#city option:selected").text()+
                    "&district="+$("#district option:selected").text()+
                    "&startTime="+$("#startTime").val()+
                    "&endTime="+$("#endTime").val(),
                method:"get",
                parseData:function (res){
                    return{
                        "code":0,
                        "msg":"",
                        "count":3000,
                        data:res
                    };
                },//确保传输的数据正常显示
                cols: [[
                    {field:'name',width:"20%",title: '宾馆名称',sort: true},
                    {field:'phone',width:"20%",title: '联系电话',sort: true},
                    {field:'location',width:"20%",title: '详细位置',sort: true},
                    {field:'introduction',width:"20%",title: '介绍', sort: true},
                    {fixed: 'right',width:"20%",align:'center', toolbar: '#hotelBar'}
                ]]
            });

            table.on('tool(hotelButton)', function(obj){
                var data = obj.data;
                console.log(data);
                if(obj.event === 'look'){//预订购买
                    var date1 = new Date();
                    var str = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
                    var startTime = $("#startTime").val();
                    var endTime = $("#endTime").val();
                    if(DateDiff(startTime,str)<0||DateDiff(endTime,startTime)<0){
                        alert('时间异常');
                    }
                    else {
                        getRoom(data.id);
                        $("#roomModal").modal('show');
                    }
                }
            });

        });
    }

    $("#selectRoom").bind("click",function () {
        var date1 = new Date();
        var str = date1.getFullYear()+"-"+(date1.getMonth()+1)+"-"+date1.getDate();
        var startTime = $("#startTime").val();
        var endTime = $("#endTime").val();
        console.log(DateDiff(startTime,str));
        console.log(DateDiff(endTime,startTime));
        if(DateDiff(startTime,str)<0||DateDiff(endTime,startTime)<0){
            alert('时间异常');
        }
        else {
			if($("#province option:selected").text()==="=请选择省份="||$("#city option:selected").text()==="=请选择城市="||$("#district option:selected").text()==="=请选择县区="){
				alert('查询地址异常');
			}
			else{
				getHotel();
			}   
        }
    })





    //预订产生订单
    $("#produceOrderPartModalSubmit").bind("click",function () {
        $.ajax({
            type:"get",
            url:getUrl()+"/produceOrder",
            data:{
                id:hostId,
                hotelId:$('#produceOrderPartModalId').val(),
                type:$('#produceOrderPartModalType').val(),
                price:$("#produceOrderPartModalPrice").val(),
                totalMoney:$('#produceOrderPartModalMoney').val()/$('#produceOrderPartModalDiscount').val(),
                discount:$('#produceOrderPartModalDiscount').val(),
                money:$("#produceOrderPartModalMoney").val(),
                startTime:$("#startTime").val(),
                endTime:$("#endTime").val(),
            },
            dataType:"json",
            success:function (data) {
                console.log(data);
                if(data===true){
                    alert('支付成功，订单创建完成');
                    $('#produceOrderPartModal').modal('hide');
                }
                else{
                    alert('订单异常，创建失败');
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    $("#produceOrderAllModalSubmit").bind("click",function () {//产生订单全款
        $.ajax({
            type:"get",
            url:getUrl()+"/produceOrder",
            data:{
                id:hostId,
                hotelId:$('#produceOrderAllModalId').val(),
                type:$('#produceOrderAllModalType').val(),
                price:$('#produceOrderAllModalPrice').val(),
                totalMoney:$('#produceOrderAllModalMoney').val(),
                discount:$('#produceOrderAllModalDiscount').val(),
                money:$("#produceOrderAllModalMoney").val(),
                startTime:$("#startTime").val(),
                endTime:$("#endTime").val(),
            },
            dataType:"json",
            success:function (data) {
                console.log(data);
                if(data===true){
                    alert('支付成功，订单创建完成');
                    $('#produceOrderAllModal').modal('hide');
                }
                else{
                    alert('订单异常，创建失败');
                }
            },
            error:function () {
                alert('请求出现异常，请检查相关设置');
            }
        });
    })

    //Order界面

    function getOrder(){

        layui.use('table', function(){

            var table = layui.table;

            table.render({
                elem: '#order',
                url:getUrl()+"/showOrder?identity=guest&id="+hostId,
                method:"get",
                parseData:function (res){
                    return{
                        "code":0,
                        "msg":"",
                        "count":3000,
                        data:res
                    };
                },
                cols: [[
                    {field:'id', width:"8%", title: '宾馆名称'},
                    {field:'name', width:"8%", title: '房间名',sort: true},
                    {field:'orderStartTime', width:"12%", title: '订单创建时间',sort: true},
                    {field:'orderEndTime', width:"12%",title: '订单结束时间', sort: true},
                    {field:'startTime', width:"12%",title: '开始入住时间', sort: true,},
                    {field:'endTime', width:"12%",title: '结束入住时间', sort: true,},
                    {field:'price', width:"8%",title: '全部应交金额', sort: true,},
                    {field:'money', width:"8%",title: '已交金额', sort: true,},
                    {field:'condition', width:"10%",title: '订单情况', sort: true,},
                    {fixed: 'right',width:"10%",align:'center', toolbar: '#orderBar'}
                ]]
            });

            table.on('tool(orderButton)', function(obj){
                var d = obj.data;
                console.log(obj)
                if(obj.event === 'back'){
                    if(d.condition==="全款支付未完成"||d.condition==="预付款支付未完成"){
                        $.ajax({
                            type:"get",
                            url:getUrl()+"/breakOrder",
                            data:{
                                uid:hostId,
                                id:d.id,
                                name:d.name,
                            },
                            success:function (f) {
                                console.log(f);
                                if(f===false){
                                    alert('退款失败');
                                }
                                else{
                                    alert("退款成功,退款金额为:"+d.money);
                                    getOrder();
                                }
                            },
                            error:function () {
                                alert('请求出现异常，请检查相关设置');
                            }
                        });
                    }
                    else {
                        alert('如需退款请联系宾馆');
                    }
                }
                else if(obj.event === 'pay'){
                    if(d.money===d.price){
                        alert('无需支付余款');
                    }
                    else if(d.money<d.price){
                        $.ajax({
                            type:"get",
                            url:getUrl()+"/payOrder",
                            data:{
                                uid:hostId,
                                id:d.id,
                                name:d.name,
                                startTime:d.startTime,
                            },
                            success:function (f) {
                                console.log(f);
                                if(f===false){
                                    alert('支付失败');
                                }
                                else{
                                    getOrder();
                                }
                            },
                            error:function () {
                                alert('请求出现异常，请检查相关设置');
                            }
                        });
                    }
                }
            });

        });

    }

    $("#TabOrder").bind("click",function () {
        getOrder();
    })

});