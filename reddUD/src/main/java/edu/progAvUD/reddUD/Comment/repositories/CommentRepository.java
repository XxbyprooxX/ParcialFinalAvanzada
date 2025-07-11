/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Comment.repositories;

import edu.progAvUD.reddUD.Comment.models.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
    
    List<Comment> findByPostId(Long postId);
    
}
