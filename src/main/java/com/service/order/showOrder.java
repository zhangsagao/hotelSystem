package com.service.order;

import com.db.db;
import com.utils.character;
import com.utils.show;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/showOrder")
public class showOrder extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] strings = new String[1];
        strings[0] = request.getParameter("id");

        String identity = request.getParameter("identity");

        String sql1 = "select * from record where id=?";
        String sql2 = "select * from record where uid=?";

        System.out.print("showOrder请求 identity="+identity);
        show.print(strings);

        if(identity.equals("hotel")){
            if(db.isExist(sql1,strings)){
                response.getWriter().write(db.selectString(sql1,strings));
                System.out.println(db.selectString(sql1,strings));
            }
        }
        else if(identity.equals("guest")){
            if(db.isExist(sql2,strings)){
                response.getWriter().write(db.selectString(sql2,strings));
            }
        }
    }
}
