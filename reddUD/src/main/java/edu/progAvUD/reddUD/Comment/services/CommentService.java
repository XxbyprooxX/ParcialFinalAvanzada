/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.Comment.services;

import edu.progAvUD.reddUD.Comment.models.Comment;
import edu.progAvUD.reddUD.Comment.repositories.CommentRepository;
import edu.progAvUD.reddUD.Post.models.Post;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

/**
 *
 * @author Cristianlol789
 */
@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentRepository commentRepository;

    @CrossOrigin

    @Override
    public ResponseEntity<Comment> crearComment(@RequestBody Comment comment) {
        Comment nuevoComment = commentRepository.save(comment);
        return new ResponseEntity<>(nuevoComment, HttpStatus.CREATED);
    }

    @CrossOrigin
    @Override
    public ResponseEntity<List<Comment>> buscarPorPost(Long PostId) {
        List<Comment> comments = commentRepository.findByPostId(PostId);
        if (comments == null || comments.isEmpty()) {
            return ResponseEntity.noContent().build(); // o .notFound().build();
        }
        return ResponseEntity.ok(comments);
    }

    @CrossOrigin
    @Override
    public ResponseEntity<Void> eliminarComment(Long commentId) {
        Optional<Comment> postOptional = commentRepository.findById(commentId);
        if (postOptional.isPresent()) {
            commentRepository.deleteById(commentId);
            return ResponseEntity.noContent().build(); // 204 No Content, eliminado correctamente
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found, no existe el post
        }
    }

    @CrossOrigin
    @Override
    public ResponseEntity<Comment> actualizarComentarioPorId(Long commentId, Comment nuevosDatos) {
        Optional<Comment> commentGuardadoOpt = commentRepository.findById(commentId);

        if (commentGuardadoOpt.isPresent()) {
            Comment commentGuardado = commentGuardadoOpt.get();

            // Actualizar campos permitidos
            if (nuevosDatos.getContenido() != null) {
                commentGuardado.setContenido(nuevosDatos.getContenido());
            }

            // Nota: No se actualizan campos como creadoEn, autor o post desde aquí por seguridad/control
            // Guardar y devolver actualizado
            Comment actualizado = commentRepository.save(commentGuardado);
            return ResponseEntity.ok(actualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
