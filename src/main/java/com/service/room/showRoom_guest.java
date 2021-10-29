package com.service.room;

import com.db.db;
import com.utils.character;
import com.utils.getDate;
import com.utils.show;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/showRoom_guest")
public class showRoom_guest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String id = request.getParameter("id");
        String[] strings = new String[3];

        strings[0] = request.getParameter("id");
        strings[1] = request.getParameter("startTime");
        strings[2] = request.getParameter("endTime");

        long startTime = getDate.less(request.getParameter("startTime"));
        long endTime = getDate.less(request.getParameter("endTime"));

        System.out.print("showRoom请求 guest ");
        show.print(strings);

        String sql1 = "select room.name,startTime,endTime from room join hotel join record " +
                "where hotel.id=? and hotel.id=room.id and hotel.id=record.id and room.name=record.name " +
                "and (record.`condition`='预付款支付未完成' or record.`condition`='全款支付未完成' or record.`condition`='进行中')";
        String[] ssql1 = new String[1];
        ssql1[0] = id;
        JSONArray jsonArray1 = db.selectJSON(sql1,ssql1);//寻找所有因订单可能出问题的房间名
        System.out.println("array1.length="+jsonArray1.length());

        String sql2 = "select * from room where id=? and `condition`='free'";
        String[] ssql2 = new String[1];
        ssql2[0] = id;
        JSONArray jsonArray2 = db.selectJSON(sql2,ssql2);//得到所有理应正常运作的房间
        System.out.println("array2.length="+jsonArray2.length());

        List<String> list = new ArrayList<>();//储存结果

        for(int i=0;i<jsonArray2.length();i++){
            JSONObject jsonObject = jsonArray2.getJSONObject(i);
            list.add(jsonObject.getString("name"));
        }
        for(int i=0;i<jsonArray1.length();i++){
            JSONObject jsonObject = jsonArray1.getJSONObject(i);
            long thisStartTime = getDate.more(jsonObject.getString("startTime"));
            long thisEndTime = getDate.more(jsonObject.getString("endTime"));
            if(endTime<thisStartTime||startTime>thisEndTime){//可以避免产生冲突的情况

            }
            else {
                list.remove(jsonObject.getString("name"));
            }
        }

        String goodRoom = "(";
        for (int i=0;i<list.size();i++) {
            goodRoom+=list.get(i);
            if(i!=list.size()-1){
                goodRoom+=",";
            }
        }
        goodRoom+=")";
        System.out.println(goodRoom);
        String sql3 = "select id,type,price,discount,count(*) as count from room where id=? and name in"+goodRoom+"group by id,type,price,discount";
        String[] ssql3 = new String[1];
        ssql3[0] = id;

        response.getWriter().write(db.selectString(sql3,ssql3));
    }
}
