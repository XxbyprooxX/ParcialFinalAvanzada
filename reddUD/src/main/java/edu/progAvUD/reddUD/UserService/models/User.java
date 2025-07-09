package edu.progAvUD.reddUD.UserService.models;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.ArrayList;
import lombok.Data;

/**
 *
 * @author Cristianlol789
 */
@Data
@Entity

public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String correo;

    @Column(unique = true)
    private String nombreUsuario;

    private String contraseña;
    private String genero;

    @ElementCollection
    private ArrayList<String> interes;

    public User(Long id, String correo, String nombreUsuario, String contraseña, String genero, ArrayList<String> interes) {
        this.id = id;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
        this.genero = genero;
        this.interes = interes;
    }

    public User() {
    }

}
