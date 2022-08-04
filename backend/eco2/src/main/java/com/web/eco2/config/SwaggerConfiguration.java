package com.web.eco2.config;

import static springfox.documentation.builders.PathSelectors.regex;

import java.util.HashSet;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.*;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

//	Swagger-UI 2.x 확인
//	http://localhost:8002/{your-app-root}/swagger-ui.html
//	Swagger-UI 3.x 확인
//	http://localhost:8002/{your-app-root}/swagger-ui/index.html

	private String version = "V1";
	private String title = "ECO2 Spring Boot Rest API " + version;
	@Bean
	public Docket restAPI() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.web.eco2.controller"))
				.paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title(title)
//				.version("1.0.0")
				.description("Eco2의 swagger api 입니다.")
				.build();
	}




}
