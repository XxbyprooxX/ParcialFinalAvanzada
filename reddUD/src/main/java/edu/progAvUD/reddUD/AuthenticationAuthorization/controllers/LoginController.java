/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.AuthenticationAuthorization.controllers;

import edu.progAvUD.reddUD.AuthenticationAuthorization.services.LoginServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import edu.progAvUD.reddUD.AuthenticationAuthorization.models.Login;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Andres Felipe
 */
@Controller

public class LoginController {
    
    @Autowired
    private LoginServiceImpl loginServiceImpl;
    
    
    @RequestMapping(value = "/api/login", method = RequestMethod.POST)
    @CrossOrigin(origins = "http://localhost:8383")
    public ResponseEntity<?> hacerLogin(@RequestBody Login login){
        System.out.println(login.getNombreUsuario());
        return ResponseEntity.ok(login);
    }
}
