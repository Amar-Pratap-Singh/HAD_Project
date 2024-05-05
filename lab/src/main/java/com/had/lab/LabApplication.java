package com.had.lab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

// import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
// @EnableWebMvc // Enable CORS support
public class LabApplication {

	public static void main(String[] args) {
		SpringApplication.run(LabApplication.class, args);
	}

}
