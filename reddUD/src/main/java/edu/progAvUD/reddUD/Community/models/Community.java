package edu.progAvUD.reddUD.Community.models;

import edu.progAvUD.reddUD.User.models.AppUser;
import jakarta.persistence.*;
import lombok.Data;
import java.util.HashSet;
import java.util.Set;

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

//    @Lob
//    @Column(name = "banner", columnDefinition = "LONGBLOB")
//    private byte[] banner;
//
//    @Lob
//    @Column(name = "avatar", columnDefinition = "LONGBLOB")
//    private byte[] avatar;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "user_community",
        joinColumns = @JoinColumn(name = "community_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<AppUser> miembros = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "moderator_community",
        joinColumns = @JoinColumn(name = "community_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    
    private Set<AppUser> moderadores = new HashSet<>();

    public Community() {
    }


}