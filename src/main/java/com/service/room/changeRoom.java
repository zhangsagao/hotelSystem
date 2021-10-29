package com.service.room;

import com.db.db;
import com.utils.character;
import com.utils.getDate;
import org.json.JSONArray;
import org.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/changeRoom")
public class changeRoom extends HttpServlet {
    @Override
    protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        character.setCharacter(request,response);

        String id = request.getParameter("id");//宾馆id
        String oldName = request.getParameter("oldName");//旧房间名
        String newName = request.getParameter("newName");//新房间名

        String sql1 = "select * from record where id=? and name=? and `condition`='进行中'";
        String[] sql1String = new String[2];
        sql1String[0] = id;
        sql1String[1] = oldName;
        //查找该用户是否在此房间,并得到订单结束时间
        String sql2 = "select * from record where id=? and name=? and `condition`='进行中'";
        String[] sql2String = new String[2];
        sql2String[0] = id;
        sql2String[1] = newName;
        //如果存在订单进行中，显然不可用
        String sql3 = "select * from record where id=? and name=? and (`condition`='全款支付未完成' or `condition`='预付款支付未完成')";
        String[] sql3String = new String[2];
        sql3String[0] = id;
        sql3String[1] = newName;
        //如果当前空闲，查看将来时间是否冲突
        String sql4 = "update record set name=? where id=? and name=? and `condition`='进行中'";
        String[] sql4String = new String[3];
        sql4String[0] = newName;
        sql4String[1] = id;
        sql4String[2] = oldName;
        //最后进行订单修改，修改房间名
        if(db.isExist(sql1,sql1String)){
            if(db.isExist(sql2,sql2String)){
                response.getWriter().write("更换的房间正在使用中");
            }
            else {
                JSONArray oldJsonArray = db.selectJSON(sql1,sql1String);
                JSONObject oldJsonObject = oldJsonArray.getJSONObject(0);
                long oldStartTime = getDate.more(oldJsonObject.getString("startTime"));
                long oldEndTime = getDate.more(oldJsonObject.getString("endTime"));

                JSONArray newJsonArray = db.selectJSON(sql3,sql3String);
                Boolean flag = true;
                int newJsonArrayLength = newJsonArray.length();
                for(int i=0;i<newJsonArrayLength;i++){
                    if(getDate.more(newJsonArray.getJSONObject(i).getString("startTime"))<oldEndTime){
                        response.getWriter().write("时间冲突，请更换新房间");
                        flag = false;
                    }
                }
                if(flag){
                    if(db.update(sql4,sql4String)){
                        //成功更换房间
                        String oldRoom = "update room set `condition`='free' where name=?";
                        String newRoom = "update room set `condition`='use' where name=?";
                        String[] oldRoomInsert = new String[1];
                        oldRoomInsert[0] = oldName;
                        String[] newRoomInsert = new String[1];
                        newRoomInsert[0] = newName;
                        db.update(oldRoom,oldRoomInsert);
                        db.update(newRoom,newRoomInsert);
                        response.getWriter().write("true");
                    }
                    else {
                        response.getWriter().write("更新异常");
                    }
                }//flag为true则意味着可以执行修改操作并返回true
            }

        }
        else {
            response.getWriter().write("当前用户不在此房间");
        }

    }
}
