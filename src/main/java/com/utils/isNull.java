package com.utils;

public class isNull {
    public static boolean one(String string){
        return string.isEmpty() || "undefined".equals(string);
    }
    public static boolean all(String[] strings){
        for (String string : strings) {
            if (one(string)) {
                return true;
            }
        }
        return false;
    }
}
