package com.portfolio.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001", "https://developer-portfolio-analyzer-frontend.onrender.com"}, allowCredentials = "true")
public class TestController {

    @GetMapping("/test")
    public String testAPI() {
        return "Developer Portfolio Analyzer API Working!";
    }
}