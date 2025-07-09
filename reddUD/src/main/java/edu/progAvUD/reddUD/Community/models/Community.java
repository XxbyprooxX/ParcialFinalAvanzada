package edu.progAvUD.reddUD.Community.models;

import edu.progAvUD.reddUD.User.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import java.util.List;
import lombok.Data;

/**
 *
 * @author Cristianlol789
 */

@Data
@Entity
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String nombre;

    @Column(nullable = false, unique = true)
    private String identificador; 

    @Column(nullable = false, length = 500)
    private String descripcion;

    @Lob
    @Column(name = "banner", columnDefinition = "LONGBLOB")
    private byte[] banner;

    @Lob
    @Column(name = "avatar", columnDefinition = "LONGBLOB")
    private byte[] avatar;

    @ManyToMany
    private List<User> miembros;

    @ManyToMany
    private List<User> moderadores;

    public Community(Long id, String nombre, String identificador, String descripcion, byte[] banner, byte[] avatar, List<User> miembros, List<User> moderadores) {
        this.id = id;
        this.nombre = nombre;
        this.identificador = identificador;
        this.descripcion = descripcion;
        this.banner = banner;
        this.avatar = avatar;
        this.miembros = miembros;
        this.moderadores = moderadores;
    }

    public Community() {
    }
     
}