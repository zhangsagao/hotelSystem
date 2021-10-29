package com.service.room;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/showRoom_hotel")
public class showRoom_hotel extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String sql1 = "select * from hotel where id=?";
        String sql2 = "select * from room where id=?";

        String[] strings = new String[1];

        strings[0] = request.getParameter("id");

        System.out.println(strings[0]+"进入showRoom_hotel");
        if(db.isExist(sql1,strings)){
            response.getWriter().write(db.selectString(sql2,strings));
        }
        else {
            response.getWriter().write("false");
        }

    }
}
