package com.service.room;

import com.db.db;
import com.utils.character;
import com.utils.show;
import netscape.javascript.JSObject;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/deleteRoom")

public class deleteRoom extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

        character.setCharacter(request,response);

        String[] strings = new String[2];

        strings[0] = request.getParameter("id");
        strings[1] = request.getParameter("name");

        show.print(strings);

        String sql1 = "select * from room where id=? and name=?";
        String sql2 = "delete from room where id=? and name=?";

        if(db.isExist(sql1,strings)){
            JSONArray jsonArray = db.selectJSON(sql1,strings);
            JSONObject jsonObject = jsonArray.getJSONObject(0);
            if(jsonObject.getString("condition").equals("free")||jsonObject.getString("condition").equals("clean")){
                if(db.update(sql2,strings)){
                    response.getWriter().write("true");
                }
                else {
                    response.getWriter().write("删除房间失败");
                }
            }
            else {
                response.getWriter().write("请将房间状态修改至空闲或维修");
            }
        }
        else {
            response.getWriter().write("当前房间已不存在");
        }

    }
}