/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Comment.repositories;

import edu.progAvUD.reddUD.Comment.models.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Cristianlol789
 */
public interface CommentRepository extends JpaRepository<Comment, Long>{
    
}
