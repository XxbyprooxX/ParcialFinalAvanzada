package edu.progAvUD.reddUD;

import edu.progAvUD.reddUD.User.models.ERole;
import edu.progAvUD.reddUD.User.models.Role;
import edu.progAvUD.reddUD.User.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ReddUdApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReddUdApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins("http://localhost:8383").allowedMethods("*").allowedHeaders("*");
            }
        };
    }
    
    @Bean
    public CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
            for (ERole erole : ERole.values()) {
                if (roleRepository.findByName(erole).isEmpty()) {
                    roleRepository.save(new Role(erole));
                }
            }
        };
    }

}
