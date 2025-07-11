/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Post.services;

import edu.progAvUD.reddUD.Post.models.Post;
import java.util.List;
import org.springframework.http.ResponseEntity;

/**
 *
 * @author Cristianlol789
 */
public interface IPostService {
    
    Post crearPost(Post post);

    ResponseEntity<List<Post>> buscarPorComunidad(Long comunidadId);

    ResponseEntity<List<Post>> buscarPorAutor(Long autorId);

    ResponseEntity<Void> eliminarPost(Long postId);

    ResponseEntity<Post> actualizarPostPorId(Long postId, Post nuevosDatos);
}
