package com.web.eco2.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * 컨트롤러(controller)가 아닌곳에서, 서버 응답값(바디) 직접 변경 및 전달 하기위한 유틸 정의.
 */
public class ResponseBodyWriteUtil {
	
	public static void sendApiResponse(HttpServletResponse response, BaseResponseBody apiResponse) throws IOException {
        response.setStatus(HttpStatus.OK.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        response.getOutputStream().write(new ObjectMapper().writeValueAsString(apiResponse).getBytes());
    }

    public static void sendError(HttpServletResponse response, String msg, HttpStatus httpStatus) throws IOException {
        response.setStatus(httpStatus.value());
        response.setContentType(APPLICATION_JSON_VALUE);
        response.setCharacterEncoding("UTF-8");
        Map<String, Object> data = new HashMap<>();
        data.put("msg", msg);
        data.put("status", httpStatus.value());
        PrintWriter pw = response.getWriter();
        pw.print(new ObjectMapper().writeValueAsString(data));
        pw.flush();
    }

    public static void sendError(HttpServletResponse response, String msg) throws IOException {
        sendError( response, msg, HttpStatus.UNAUTHORIZED);
    }

    public static void sendError2(HttpServletResponse response, String msg, HttpStatus httpStatus) throws IOException {
        sendError( response, msg, httpStatus);
    }

    public static void sendSocketError(HttpServletResponse response, String msg) {
        try {
            sendError( response, msg, HttpStatus.UNAUTHORIZED);
        }catch (Exception e){
            return;
        }
    }
}
