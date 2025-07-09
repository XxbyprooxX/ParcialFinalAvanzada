package edu.progAvUD.reddUD.User.models;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
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

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false, unique = true)
    private String nombreUsuario;

    @Column(nullable = false)
    private String contraseña;

    @Column(nullable = false)
    private String genero;

    @ElementCollection
    @Column(name = "interes")
    private List<String> intereses;

    @Lob
    @Column(name = "avatar", columnDefinition = "LONGBLOB")
    private byte[] avatar;

    @Lob
    @Column(name = "banner", columnDefinition = "LONGBLOB")
    private byte[] banner;

    private LocalDate fechaRegistro;

    private int karma;

    @ElementCollection
    private ArrayList<String> interes;

    public User(Long id, String correo, String nombreUsuario, String contraseña, String genero, List<String> intereses, byte[] avatar, byte[] banner, ArrayList<String> interes) {
        this.id = id;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contraseña = contraseña;
        this.genero = genero;
        this.intereses = intereses;
        this.avatar = avatar;
        this.banner = banner;
        this.fechaRegistro = LocalDate.now();
        this.karma = 0;
        this.interes = interes;
    }

    public User() {
    }

}