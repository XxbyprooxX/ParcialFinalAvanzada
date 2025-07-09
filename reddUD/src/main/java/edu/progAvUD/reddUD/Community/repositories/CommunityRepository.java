/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package edu.progAvUD.reddUD.Community.repositories;

import edu.progAvUD.reddUD.AuthenticationAuthorization.models.Login;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author Cristianlol789
 */
public interface CommunityRepository extends JpaRepository<Login, Long>{
    
}
