package com.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

public class character {
    public static void setCharacter(HttpServletRequest request, HttpServletResponse response) throws IOException {
        request.setCharacterEncoding("UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=UTF-8");
    }
    public static String getNormalCharacter(HttpServletRequest request ,String name){
        byte[] buffer = request.getParameter(name).getBytes(StandardCharsets.ISO_8859_1);
        return new String(buffer, StandardCharsets.UTF_8);
    }

}
