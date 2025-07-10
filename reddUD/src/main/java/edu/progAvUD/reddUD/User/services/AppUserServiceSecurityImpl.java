/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.User.services;

import edu.progAvUD.reddUD.User.models.AppUser;
import edu.progAvUD.reddUD.User.repositories.AppUserRepository;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

/**
 *
 * @author Andres Felipe
 */
@Service
@AllArgsConstructor
public class AppUserServiceSecurityImpl implements UserDetailsService {

    @Autowired
    private AppUserRepository repositorio;

    @Override
    public UserDetails loadUserByUsername(String nombreUsuario) throws UsernameNotFoundException {
        Optional<AppUser> user = repositorio.findByNombreUsuario(nombreUsuario);
        if (user.isPresent()) {
            var userObj = user.get();
            return User.builder()
                    .username(userObj.getNombreUsuario())
                    .password(userObj.getContrasena())
                    .build();
        } else {
            throw new UsernameNotFoundException(nombreUsuario);
        }
    }

}
