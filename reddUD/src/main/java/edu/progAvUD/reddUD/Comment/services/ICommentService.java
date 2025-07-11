/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Comment.services;

import edu.progAvUD.reddUD.Comment.models.Comment;
import java.util.List;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Cristianlol789
 */
public interface ICommentService {

    ResponseEntity<Comment> crearComment(Comment comment);

    ResponseEntity<List<Comment>> buscarPorPost(Long postId);

    ResponseEntity<Void> eliminarComment(Long commentId);

    ResponseEntity<Comment> actualizarComentarioPorId(Long commentId, Comment nuevosDatos);
}
