package com.service.register;

import com.db.db;
import com.utils.*;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/register_hotel")
public class register_hotel extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws IOException {

        character.setCharacter(request,response);

        String[] id = new String[1];
        id[0]= request.getParameter("id");//账号

        String[] strings = new String[9];
        strings[0]= request.getParameter("name");//宾馆名字
        strings[1]= request.getParameter("id");//账号
        strings[2]= request.getParameter("password");//密码
        strings[3]= request.getParameter("phone");//手机号
        strings[4]= request.getParameter("introduction");//介绍
        strings[5]= request.getParameter("province");//省
        strings[6]= request.getParameter("city");//市
        strings[7]= request.getParameter("district");//区/县
        strings[8]= request.getParameter("location");//详细地址


        show.print(strings);

        String sql1 = "select * from hotel where id=?";
        String sql2 = "insert into hotel VALUES(?,?,?,?,?,?,?,?,?)";

        if(db.isExist(sql1,id)){
            response.getWriter().write("抱歉,该账号已被使用，请更换其它账号名");
        }
        else if(db.update(sql2,strings)){
            response.getWriter().write("true");
        }
        else{
            response.getWriter().write("因未知原因注册失败");
        }
    }
}
