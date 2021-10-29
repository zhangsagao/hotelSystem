package com.service.information;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/information_guest")
public class information_guest extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] strings = new String[1];

        strings[0] = request.getParameter("id");

        String sql1 = "select * from guest where id=?";

        if(db.isExist(sql1,strings)){
            response.getWriter().write(db.selectString(sql1,strings));
        }
        else {
            response.getWriter().write("false");
        }
    }
}
