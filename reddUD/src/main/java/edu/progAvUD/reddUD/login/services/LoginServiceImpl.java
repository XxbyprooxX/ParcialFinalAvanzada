/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.login.services;

import edu.progAvUD.reddUD.login.models.Login;
import edu.progAvUD.reddUD.login.repositories.LoginRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Andres Felipe
 */
@Service
public class LoginServiceImpl implements ILoginService {
    
    @Autowired
    LoginRepository clienteLoginRepository;

    @Override
    public Login obtenerLoginPorUsuario(String usuario) {
        return null;
    }

    

    
    
}
