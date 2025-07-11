/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.Comment.controllers;

import edu.progAvUD.reddUD.Comment.models.Comment;
import edu.progAvUD.reddUD.Comment.services.CommentService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Cristianlol789
 */

@RestController
@RequestMapping("/api/comentarios")
@CrossOrigin // Permite solicitudes desde diferentes orígenes, útil para CORS
public class CommentController {

    @Autowired
    private CommentService commentService;

    
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Comment> crearComentario(@RequestBody Comment comment) {
        return commentService.crearComment(comment);
    }
    
    @RequestMapping(value = "/post/{postId}", method = RequestMethod.GET)
    public ResponseEntity<List<Comment>> obtenerComentariosPorPost(@PathVariable Long postId) {
        return commentService.buscarPorPost(postId);
    }
    
    @RequestMapping(value = "/{commentId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> eliminarComentario(@PathVariable Long commentId) {
        return commentService.eliminarComment(commentId);
    }

    @RequestMapping(value = "/{commentId}", method = RequestMethod.PATCH)
    public ResponseEntity<Comment> actualizarComentario(@PathVariable Long commentId, @RequestBody Comment nuevosDatos) {
        return commentService.actualizarComentarioPorId(commentId, nuevosDatos);
    }
}

