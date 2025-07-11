package edu.progAvUD.reddUD.Post.models;

import edu.progAvUD.reddUD.Comment.models.Comment;
import edu.progAvUD.reddUD.Community.models.Community;
import edu.progAvUD.reddUD.User.models.AppUser;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;
import lombok.Data;

/**
 *
 * @author Cristianlol789
 */

@Data
@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(length = 2000)
    private String contenido;

    private LocalDateTime creadoEn;

    @ManyToOne
    private AppUser autor;

    @ManyToOne
    private Community comunidad;

    private int votosPositivos;
    private int votosNegativos;

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
    private List<Comment> comentarios;


    public Post() {
    }
    
}