package com.esprit.microservice;

import java.util.stream.Stream;

import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BookApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookApplication.class, args);
	}
	@Bean
	ApplicationRunner init(BookRepository repository) {
	    return args -> {
	        repository.save(new Book("1A 2B 3C 4D","1234567891234","Book Name 1"));
	        repository.save(new Book("1A 2B 4D 3C ","1234567891234","Book Name 2"));
	        repository.save(new Book("1A 3C 2B 4D","1234567891234","Book Name 3"));
	        repository.findAll().forEach(System.out::println);
	    };

	}
}
