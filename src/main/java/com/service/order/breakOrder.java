package com.service.order;

import com.db.db;
import com.utils.character;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/breakOrder")
public class breakOrder extends HttpServlet {

    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String[] str = new String[2];
        str[0] = request.getParameter("id");
        str[1] = request.getParameter("uid");

        String[] strings = new String[3];
        strings[1] = request.getParameter("id");
        strings[2] = request.getParameter("uid");

        Date dNow = new Date( );
        SimpleDateFormat ft = new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss");

        strings[0] = ft.format(dNow);
        System.out.println(strings[0]);

        String sql1 = "select * from record where id=? and uid=? and (`condition`='预付款支付未完成' or `condition`='全款支付未完成')";
        String sql = "update record set orderEndTime=?,`condition`='客户中止' where id=? and uid=? and (`condition`='预付款支付未完成' or `condition`='全款支付未完成')";

        if(db.isExist(sql1,str)){
            if(db.update(sql,strings)){
                response.getWriter().write(db.selectString(sql1,str));
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
