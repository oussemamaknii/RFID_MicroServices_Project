package com.example.demo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.auth.BasicAuthRequestInterceptor;

@Configuration
public class FeingConfig {
	@Bean
	public BasicAuthRequestInterceptor mBasicAuthrequestInterceptor() {
		return new BasicAuthRequestInterceptor("user", "user");
	}
}
