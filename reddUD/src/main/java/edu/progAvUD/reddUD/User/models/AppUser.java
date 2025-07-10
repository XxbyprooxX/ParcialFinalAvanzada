package edu.progAvUD.reddUD.User.models;

import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author Cristianlol789
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String correo;

    @Column(nullable = false, unique = true)
    private String nombreUsuario;

    private String ubicacion;

    @Column(nullable = false)
    private String contrasena;

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
    
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "user_roles",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles;


    public AppUser(String correo, String nombreUsuario, String contraseña, String genero, List<String> intereses, LocalDate fechaRegistro, Set<Role> roles) {
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contraseña;
        this.genero = genero;
        this.intereses = intereses;
        this.fechaRegistro = fechaRegistro;
        this.roles = roles;
    }

    
    public AppUser(Long id, String correo, String nombreUsuario, String contraseña, String genero, List<String> intereses, byte[] avatar, byte[] banner) {
        this.id = id;
        this.correo = correo;
        this.nombreUsuario = nombreUsuario;
        this.contrasena = contraseña;
        this.genero = genero;
        this.intereses = intereses;
        this.avatar = avatar;
        this.banner = banner;
        this.fechaRegistro = LocalDate.now();
        this.karma = 0;
    }


}
