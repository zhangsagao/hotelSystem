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

@WebServlet("/finishOrder")
public class finishOrder extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String id = request.getParameter("id");
        String uid = request.getParameter("uid");

        String[] str = new String[2];
        str[0] = id;
        str[1] = uid;

        String[] strings = new String[3];
        strings[1] = id;
        strings[2] = uid;

        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");
        strings[0] = ft.format(dNow);

        String sql1 = "select * from record where id=? and uid=? and `condition`='进行中'";
        String sql = "update record set orderEndTime=?,`condition`='已结束' where id=? and uid=? and `condition`='进行中'";
        String sql2 = "update room set `condition`='free' where id=? and name=?";

        //获取房间号
        JSONArray jsonArray = db.selectJSON(sql1,str);
        JSONObject jsonObject = jsonArray.getJSONObject(0);
        String roomName = jsonObject.getString("name");
        String[] strings2 = new String[2];
        strings2[0] = id;
        strings2[1] = roomName;
        db.update(sql2,strings2);

        if(db.isExist(sql1,str)){
            if(db.update(sql,strings)){
                response.getWriter().write("已结束订单");
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

