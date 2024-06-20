package com.library.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(securedEnabled = true, jsr250Enabled = true) // zastřešuje autorizaci v aplikaci, umožňuje použití @Secured jinde v kodu
public class ApplicationSecurityConfiguration {

    // objekty označené Bean je možné volat jinde v kódu == Dependency Injection
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    } // objekt k zahashování hesla

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests().anyRequest().permitAll().and() // všem povolen přistup všude (je řešen @Security u jednotlivých volání)
                .csrf().disable() // pomohl ChatGPT, jde o vypnutí nějakého zabezpečení?
                .exceptionHandling(c -> c.authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)))
                // pokud nemám právo přístupu, server vrátí 401 UNAUTHORIZED
                .build();
    }

}