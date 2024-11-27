package fr.redship.projectwebapidb;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class})
//SpringBootApplication(exclude = {ReactiveSecurityAutoConfiguration.class, ReactiveManagementWebSecurityAutoConfiguration.class }
//@SpringBootApplication

public class ProjectWebApiDbApplication implements CommandLineRunner
{

    public static void main(String[] args) {
        SpringApplication.run(ProjectWebApiDbApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception
    {
        System.out.println("Hello World");
    }
}
