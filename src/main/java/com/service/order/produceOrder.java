package com.service.order;

import com.db.db;
import com.utils.character;
import com.utils.getDate;
import com.utils.show;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/produceOrder")
public class produceOrder extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

        character.setCharacter(request,response);//格式化
        //初始化数据
        String id = request.getParameter("hotelId");//宾馆id号
        String uid = request.getParameter("id");//客人id号
        String startTime = request.getParameter("startTime");//居住开始时间
        String endTime = request.getParameter("endTime");//居住离开时间
        String totalMoney = request.getParameter("totalMoney");//总共应支付金额
        String money = request.getParameter("money");//实际支付金额
        String type = request.getParameter("type");
        String price = request.getParameter("price");
        String discount = request.getParameter("discount");

        long sTime = getDate.less(startTime);
        long eTime = getDate.less(endTime);

        String sql = "select * from record where id=? and uid=? and (`condition`='预付款支付未完成' or `condition`='全款支付未完成' or `condition`='进行中')";
        String[] ssql = new String[2];
        ssql[0] = id;
        ssql[1] = uid;
        if(db.isExist(sql,ssql)){
            response.getWriter().write("false");
            return;
        }

        String sql1 = "insert into record VALUES(?,?,?,?,?,?,?,?,?,?)";
        String[] ssql1 = new String[10];
        ssql1[0] = id;
        ssql1[2] = uid;
        ssql1[3] = null;
        ssql1[4] = null;
        ssql1[5] = startTime;
        ssql1[6] = endTime;
        ssql1[7] = totalMoney;
        ssql1[8] = money;
        if(ssql1[7].equals(ssql1[8])){
            ssql1[9] = "全款支付未完成";
        }
        else{
            ssql1[9] = "预付款支付未完成";
        }


        String sql2 = "select room.name,startTime,endTime from room join hotel join record " +
                "where hotel.id=? and hotel.id=room.id and hotel.id=record.id and room.name=record.name " +
                "and (record.`condition`='预付款支付未完成' or record.`condition`='全款支付未完成' or record.`condition`='进行中')";
        String[] ssql2 = new String[1];
        ssql2[0] = id;
        JSONArray jsonArray2 = db.selectJSON(sql2,ssql2);//寻找所有因订单可能出问题的房间名

        String sql3 = "select * from room where id=? and type=? and price=? and discount=? and `condition`='free'";
        String[] ssql3 = new String[4];
        ssql3[0] = id;
        ssql3[1] = type;
        ssql3[2] = price;
        ssql3[3] = discount;
        JSONArray jsonArray3 = db.selectJSON(sql3,ssql3);//得到所有理应正常运作的房间

        List<String> list = new ArrayList<>();//储存结果

        for(int i=0;i<jsonArray3.length();i++){
            JSONObject jsonObject = jsonArray3.getJSONObject(i);
            list.add(jsonObject.getString("name"));
        }
        for(int i=0;i<jsonArray2.length();i++){
            JSONObject jsonObject = jsonArray2.getJSONObject(i);
            long thisStartTime = getDate.more(jsonObject.getString("startTime"));
            long thisEndTime = getDate.more(jsonObject.getString("endTime"));
            if(eTime<thisStartTime||sTime>thisEndTime){//可以避免产生冲突的情况

            }
            else {
                list.remove(jsonObject.getString("name"));
            }
        }

        ssql1[1]=list.get(0);

        if(db.update(sql1,ssql1)){
            response.getWriter().write("true");
        }
        else {
            response.getWriter().write("false");
        }

    }
}
