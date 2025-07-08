/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.login.services;

import edu.progAvUD.reddUD.login.models.Login;

/**
 *
 * @author Andres Felipe
 */
public interface ILoginService {
    
    public Login obtenerLoginPorUsuario(String usuario);
}
