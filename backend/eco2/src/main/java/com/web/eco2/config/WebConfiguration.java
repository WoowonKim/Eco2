package com.web.eco2.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class WebConfiguration {
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        return new ResponseEntity<Object>(map,status);
    }
    public static ResponseEntity<Object> generateResponse(String message, HttpStatus status, String dataName, Object responseObj) {
        Map<String, Object> map = new HashMap<>();
        map.put("msg", message);
        map.put("status", status.value());
        map.put(dataName, responseObj);
        return new ResponseEntity<Object>(map,status);
    }
}
