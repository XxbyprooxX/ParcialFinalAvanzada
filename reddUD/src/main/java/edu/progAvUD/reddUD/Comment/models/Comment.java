package edu.progAvUD.reddUD.Comment.models;

import edu.progAvUD.reddUD.Post.models.Post;
import edu.progAvUD.reddUD.User.models.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import java.time.LocalDateTime;
import lombok.Data;

/**
 *
 * @author Cristianlol789
 */

@Data
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 1000, nullable = false)
    private String contenido;

    private LocalDateTime creadoEn;

    @ManyToOne
    private User autor;

    @ManyToOne
    private Post post;

    public Comment(Long id, String contenido, User autor, Post post) {
        this.id = id;
        this.contenido = contenido;
        this.creadoEn = LocalDateTime.now();
        this.autor = autor;
        this.post = post;
    }

    public Comment() {
    }
    
}