package com.service.room;

import com.db.db;
import com.utils.character;
import com.utils.show;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/showHotel")
public class showHotel extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);//规范为UTF-8格式
        //初始化数据
        String province = request.getParameter("province");//省份
        String city = request.getParameter("city");//市
        String district = request.getParameter("district");//区县
        String startTime = request.getParameter("startTime");//居住起始时间
        String endTime = request.getParameter("endTime");//居住结束时间

        System.out.print("showHotel请求");

        String sql1 = "select * from hotel where province=? and city=? and district=? ";//提供可提供相关房间的宾馆信息
        String[] ssql1 = new String[3];
        ssql1[0] = province;
        ssql1[1] = city;
        ssql1[2] = district;
        //执行操作
        if(db.isExist(sql1,ssql1)){
            response.getWriter().write(db.selectString(sql1,ssql1));
        }
        else {
            response.getWriter().write("");
        }

    }
}
