package com.service.room;

import com.db.db;
import com.utils.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/newRoom")
public class newRoom extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

        character.setCharacter(request,response);

        String[] str = new String[2];
        str[0]=request.getParameter("id");
        str[1]=request.getParameter("name");

        String[] strings = new String[6];

        strings[0]=request.getParameter("id");
        strings[1]=request.getParameter("name");
        strings[2]=request.getParameter("type");
        strings[3]=request.getParameter("price");
        strings[4]=request.getParameter("discount");
        strings[5]="free";//free-可正常使用 abnormal-异常状态 use-使用状态

        show.print(strings);

        String sql1 = "select * from room where id=? and name=?";
        String sql2 = "insert into room VALUES(?,?,?,?,?,?)";

        if(db.isExist(sql1,str)){
            response.getWriter().write("已使用过该房间名，请更换或去除该房间名房间");
        }
        else if(db.update(sql2,strings)){
            response.getWriter().write("true");
        }
        else {
            response.getWriter().write("未创建成功");
        }
    }
}