package com.service.login;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/login")
public class login extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] strings = new String[2];
        strings[0] = request.getParameter("name");
        strings[1] = request.getParameter("password");

        String identity = request.getParameter("identity");

        String sql1 = "select * from guest where id=? and password=?";
        String sql2 = "select * from hotel where id=? and password=?";

        System.out.println(strings[0]+"  "+strings[1]+" "+identity);
        if("guest".equals(identity)){
            System.out.println("登录已进入客人判断");
            if(db.isExist(sql1,strings)){
                response.getWriter().write("true");
                System.out.println("登录已进入客人判断成功");
            }
            else {
                response.getWriter().write("false");
                System.out.println("登录已进入客人判断失败");
            }
        }
        else if("hotel".equals(identity)){
            System.out.println("登录已进入宾馆判断");
            if(db.isExist(sql2,strings)){
                response.getWriter().write("true");
                System.out.println("登录已进入宾馆判断成功");
            }
            else {
                response.getWriter().write("false");
                System.out.println("登录已进入宾馆判断失败");
            }
        }
    }
}
