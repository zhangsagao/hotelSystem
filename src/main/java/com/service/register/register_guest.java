package com.service.register;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/register_guest")
public class register_guest extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] id = new String[1];
        id[0]= request.getParameter("id");//账号

        String[] uid = new String[1];
        uid[0]= request.getParameter("uid");//身份证号

        String[] strings = new String[5];
        strings[0]= request.getParameter("name");//真实姓名
        strings[1]= request.getParameter("uid");//身份证号
        strings[2]= request.getParameter("id");//账号
        strings[3]= request.getParameter("password");//密码
        strings[4]= request.getParameter("phone");//手机号

//        sout.print(strings);

        String sql1 = "select * from guest where id=?";
        String sql2 = "select * from guest where uid=?";
        String sql3 = "insert into guest VALUES(?,?,?,?,?)";

        if(db.isExist(sql1,id)){
            System.out.println(sql1);
            response.getWriter().write("抱歉,该账号已被使用，请更换其它账号名");
        }
        else if(db.isExist(sql2,uid)){
            System.out.println(sql2);
            response.getWriter().write("抱歉,该身份证号已被使用，请检查您是否使用过本平台注册");
        }
        else if(db.update(sql3,strings)){
            System.out.println(sql3);
            response.getWriter().write("true");
        }
        else{
            response.getWriter().write("因未知原因注册失败");
        }

    }
}
