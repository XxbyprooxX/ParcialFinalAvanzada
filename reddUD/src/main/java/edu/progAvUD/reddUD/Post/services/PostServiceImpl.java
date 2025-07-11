/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.Post.services;

import edu.progAvUD.reddUD.Post.models.Post;
import edu.progAvUD.reddUD.Post.repositories.PostRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author Cristianlol789
 */
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements IPostService{

    @Autowired
    private PostRepository postRepository;

    @CrossOrigin
    @Override
    public Post crearPost(Post post) {
        post.setCreadoEn(LocalDateTime.now());
        return postRepository.save(post);
    }

    @Override
    @CrossOrigin
    public ResponseEntity<List<Post>> buscarPorComunidad(Long comunidadId) {
        List<Post> post = postRepository.findByComunidadId(comunidadId);
        if (post == null || post.isEmpty()) {
            return ResponseEntity.noContent().build(); // o .notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @Override
    @CrossOrigin
    public ResponseEntity<List<Post>> buscarPorAutor(Long autorId) {
        List<Post> post = postRepository.findByAutorId(autorId);
        if (post == null || post.isEmpty()) {
            return ResponseEntity.noContent().build(); // o .notFound().build();
        }
        return ResponseEntity.ok(post);
    }

    @Override
    @CrossOrigin
    public ResponseEntity<Void> eliminarPost(Long postId) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            postRepository.deleteById(postId);
            return ResponseEntity.noContent().build(); // 204 No Content, eliminado correctamente
        } else {
            return ResponseEntity.notFound().build(); // 404 Not Found, no existe el post
        }
    }
    
    @Override
    @CrossOrigin
    public ResponseEntity<Post> actualizarPostPorId(Long postId, Post nuevosDatos) {
    Optional<Post> postGuardadoOpt = postRepository.findById(postId);

    if (postGuardadoOpt.isPresent()) {
        Post postGuardado = postGuardadoOpt.get();

        // Actualizar campos permitidos
        if (nuevosDatos.getTitulo() != null) {
            postGuardado.setTitulo(nuevosDatos.getTitulo());
        }
        if (nuevosDatos.getContenido() != null) {
            postGuardado.setContenido(nuevosDatos.getContenido());
        }

        // Guardar y devolver actualizado
        Post actualizado = postRepository.save(postGuardado);
        return ResponseEntity.ok(actualizado);
    } else {
        return ResponseEntity.notFound().build();
    }
}



}
