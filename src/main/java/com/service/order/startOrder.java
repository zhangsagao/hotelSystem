package com.service.order;

import com.db.db;
import com.utils.character;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/startOrder")
public class startOrder extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String id = request.getParameter("id");
        String uid = request.getParameter("uid");
        String[] str = new String[2];
        str[0] = id;
        str[1] = uid;

        String[] strings = new String[5];
        strings[1] = "进行中";
        strings[3] = id;
        strings[4] = uid;

        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");

        strings[0] = ft.format(dNow);

        String sql1 = "select * from record where id=? and uid=? and (`condition`='预付款支付未完成' or `condition`='全款支付未完成')";
        String sql = "update record set orderStartTime=?,`condition`=?,money=? where id=? and uid=? and (`condition`='预付款支付未完成' or `condition`='全款支付未完成')";
        String sql2 = "update room set `condition`='use' where id=? and name=?";

        System.out.println("startOrder请求进入");
        if(db.isExist(sql1,str)){
            JSONArray jsonArray = db.selectJSON(sql1,str);
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            String price = jsonObject.getString("price");
            String money = jsonObject.getString("money");
            String roomName = jsonObject.getString("name");
            String[] strings2 = new String[2];
            strings2[0] = id;
            strings2[1] = roomName;
            db.update(sql2,strings2);
            strings[2] = price;
            System.out.println("startOrder请求第一层判断");
            if(db.update(sql,strings)){
                System.out.println("startOrder请求第二层判断");
                if(price.equals(money)){
                    response.getWriter().write("已全款支付");
                }
                else {
                    int count = Integer.parseInt(price)-Integer.parseInt(money);
                    response.getWriter().write("预支付付款,确保已支付"+count+"元");
                }
            }
            else {
                response.getWriter().write("false");
            }
        }
        else {
            response.getWriter().write("false");
        }
    }
}
