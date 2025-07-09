/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.AuthenticationAuthorization.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

/**
 *
 * @author Andres Felipe
 */
@Data
@Entity
@Table(name="credenciales")

public class Login {
    @Id
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;
    private String nombreUsuario;
    private String contraseña;

    public Login(String nombreUsuario, String contraseña) {
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
    }

    public Login() {
    }
    
    
}
