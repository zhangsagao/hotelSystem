package com.db;

import com.utils.*;
import org.json.JSONArray;

import java.sql.*;

public class db {
    private static final String URL = "jdbc:mysql://localhost:3306/hotel?serverTimezone=UTC&characterEncoding=UTF-8";
    private static final String USER = "root";
    private static final String PASSWORD = "000000";

    static {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    public static Connection getConnection(){
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (SQLException t) {
            t.printStackTrace();
        }
        return conn;
    }


    public static void closeCS(Connection conn, PreparedStatement stmt) {
        if(stmt!=null){
            try {
                stmt.close();
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }
        if(conn!=null){
            try {
                conn.close();
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }
    }

    public static void closeCSR(Connection conn, PreparedStatement stmt, ResultSet resultSet){
        if(resultSet!=null){
            try {
                resultSet.close();
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }
        closeCS(conn, stmt);
    }

    public static boolean isExist(String sql,String[] strings){

        Connection connection = db.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
        } catch (SQLException t) {
            t.printStackTrace();
        }

        int length = strings.length;
        for(int i=1;i<=length;i++){
            try {
                assert preparedStatement != null;
                preparedStatement.setString(i,strings[i-1]);
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }

        try {
            assert preparedStatement != null;
            resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                return true;
            }
        } catch (SQLException t) {
            t.printStackTrace();
        }
        finally {
            db.closeCSR(connection,preparedStatement,resultSet);
        }
        return false;
    }

    public static boolean update(String sql,String[] strings){
        Connection connection = db.getConnection();
        PreparedStatement preparedStatement = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
        } catch (SQLException t) {
            t.printStackTrace();
        }

        int length = strings.length;
        for(int i=1;i<=length;i++){
            try {
                assert preparedStatement != null;
                preparedStatement.setString(i,strings[i-1]);
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }

        int count = 0;

        try {
            assert preparedStatement != null;
            count = preparedStatement.executeUpdate();
        } catch (SQLException throwables) {
            throwables.printStackTrace();
        }
        finally {
            db.closeCS(connection,preparedStatement);
        }

        return count > 0;
    }

    public static String selectString(String sql, String[] strings){
        Connection connection = db.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
        } catch (SQLException t) {
            t.printStackTrace();
        }

        int length = strings.length;
        for(int i=1;i<=length;i++){
            try {
                assert preparedStatement != null;
                preparedStatement.setString(i,strings[i-1]);
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }

        try {
            assert preparedStatement != null;
            resultSet = preparedStatement.executeQuery();
            return resultSetToJSON.JSONString(resultSet);
        } catch (SQLException t) {
            t.printStackTrace();
        }
        finally {
            db.closeCSR(connection,preparedStatement,resultSet);
        }
        return null;
    }

    public static JSONArray selectJSON(String sql, String[] strings){
        Connection connection = db.getConnection();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            preparedStatement = connection.prepareStatement(sql);
        } catch (SQLException t) {
            t.printStackTrace();
        }

        int length = strings.length;
        for(int i=1;i<=length;i++){
            try {
                assert preparedStatement != null;
                preparedStatement.setString(i,strings[i-1]);
            } catch (SQLException t) {
                t.printStackTrace();
            }
        }

        try {
            assert preparedStatement != null;
            resultSet = preparedStatement.executeQuery();
            return resultSetToJSON.JSON(resultSet);
        } catch (SQLException t) {
            t.printStackTrace();
        }
        finally {
            db.closeCSR(connection,preparedStatement,resultSet);
        }
        return null;
    }
}
