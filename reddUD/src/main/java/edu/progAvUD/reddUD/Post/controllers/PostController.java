/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.Post.controllers;

import edu.progAvUD.reddUD.Post.models.Post;
import edu.progAvUD.reddUD.Post.services.PostServiceImpl;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Post> crearPost(@RequestBody Post post) {
        Post nuevo = postService.crearPost(post);
        return ResponseEntity.status(HttpStatus.CREATED).body(nuevo);
    }

    @RequestMapping(value = "/comunidad/{comunidadId}", method = RequestMethod.GET)
    public ResponseEntity<List<Post>> buscarPostComunidad(@PathVariable Long comunidadId) {
        return postService.buscarPorComunidad(comunidadId);
    }

    @RequestMapping(value = "/autor/{autorId}", method = RequestMethod.GET)
    public ResponseEntity<List<Post>> buscarPostAutor(@PathVariable Long autorId) {
        return postService.buscarPorAutor(autorId);
    }
    
    
    // Eliminar post por ID
    @RequestMapping(value = "/{postId}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> eliminarPost(@PathVariable Long postId) {
        return postService.eliminarPost(postId);
    }

    // Actualizar post por ID
    @RequestMapping(value = "/{postId}", method = RequestMethod.PATCH)
    public ResponseEntity<Post> actualizarPostPorId(
            @PathVariable Long postId,
            @RequestBody Post nuevosDatos) {
        return postService.actualizarPostPorId(postId, nuevosDatos);
    }
    

}
