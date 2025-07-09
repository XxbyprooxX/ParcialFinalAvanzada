/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.AuthenticationAuthorization.services;

import edu.progAvUD.reddUD.AuthenticationAuthorization.models.Login;
import edu.progAvUD.reddUD.AuthenticationAuthorization.repositories.LoginRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author Andres Felipe
 */
@Service
public class LoginServiceImpl implements ILoginService {
    
    @Autowired
    private LoginRepository loginRepository;

    @Override
    public Login obtenerLoginPorUsuario(String usuario) {
        return loginRepository.findByNombreUsuario(usuario);
    }

    

    
    
}
