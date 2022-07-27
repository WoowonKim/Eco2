package com.web.eco2.util;

import lombok.Getter;
import lombok.Setter;

/**
 * 서버 요청에대한 기본 응답값(바디) 정의.
 */
@Getter
@Setter
public class BaseResponseBody {
	String msg = null;
	Integer status = null;
	
	public BaseResponseBody() {}
	
	public BaseResponseBody(Integer statusCode){
		this.status = statusCode;
	}
	
	public BaseResponseBody(Integer statusCode, String message){
		this.status = statusCode;
		this.msg = message;
	}
	
	public static BaseResponseBody of(Integer statusCode, String message) {
		BaseResponseBody body = new BaseResponseBody();
		body.msg = message;
		body.status = statusCode;
		return body;
	}
}
