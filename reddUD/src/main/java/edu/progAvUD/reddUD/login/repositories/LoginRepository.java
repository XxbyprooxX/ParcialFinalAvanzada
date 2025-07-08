/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.login.repositories;

import edu.progAvUD.reddUD.login.models.Login;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Andres Felipe
 */
@Repository
public interface LoginRepository extends JpaRepository<Login, Long> {
      
    
    
}
