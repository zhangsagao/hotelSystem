package com.service.room;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/changeRoomInformation")

public class changeRoomInformation extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] newStrings = new String[7];
        String[] str1 = new String[2];
        String[] str2 = new String[2];

        newStrings[0] = request.getParameter("newName");
        newStrings[1] = request.getParameter("newType");
        newStrings[2] = request.getParameter("newPrice");
        newStrings[3] = request.getParameter("newDiscount");
        newStrings[4] = request.getParameter("newCondition");
        newStrings[5] = request.getParameter("id");
        newStrings[6] = request.getParameter("oldName");

        str1[0] = request.getParameter("id");
        str1[1] = request.getParameter("oldName");

        str2[0] = request.getParameter("id");
        str2[1] = request.getParameter("newName");

        String sql1 = "update room set name=?, type=?, price=?, discount=?, `condition`=? where id=? and name=?";
        String sql2 = "select * from room where id=? and name=?";

        if(db.isExist(sql2,str1)){
            if(str1[1].equals(str2[1])){
                if(db.update(sql1,newStrings)){
                    response.getWriter().write("true");
                }
                else {
                    response.getWriter().write("更新房间信息失败");
                }
            }
            else if(db.isExist(sql2,str2)){
                response.getWriter().write("已存在同名房间，请更换房间名");
            }
            else {
                if(db.update(sql1,newStrings)){
                    response.getWriter().write("true");
                }
                else {
                    response.getWriter().write("更新房间信息失败");
                }
            }
        }
        else {
            response.getWriter().write("当前房间已不存在");
        }
    }
}
