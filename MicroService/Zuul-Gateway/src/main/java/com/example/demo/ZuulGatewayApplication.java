package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;

//import Filtres.ErrorFilter;
//import Filtres.PostFilter;
//import Filtres.PreFilter;
//import Filtres.RouteFilter;


@EnableZuulProxy
@EnableDiscoveryClient
@SpringBootApplication
@EnableFeignClients("com.clientui")
public class ZuulGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ZuulGatewayApplication.class, args);
	}
}
