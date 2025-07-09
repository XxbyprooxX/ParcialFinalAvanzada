/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Post.repositories;

import edu.progAvUD.reddUD.Post.models.Post;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Cristianlol789
 */
public interface PostRepository extends JpaRepository<Post, Long>{
    
}
