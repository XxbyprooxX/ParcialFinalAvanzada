package edu.progAvUD.reddUD.User.controllers;

import edu.progAvUD.reddUD.User.models.AppUser;
import edu.progAvUD.reddUD.User.services.UserServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
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
@RequestMapping("/api")
public class UserController {
    
    @Autowired
    private UserServiceImpl userServiceImpl;
    
    @Autowired
    private PasswordEncoder PasswordEncoder;
    
    @Autowired
    private org.springframework.security.authentication.AuthenticationManager authenticationManager;
    
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<AppUser> getAllUser(){
        return userServiceImpl.getAllUser();
    }
    
    
    @RequestMapping(value = "/user/{nombreUsuario}", method = RequestMethod.GET)
    public ResponseEntity<AppUser> mostrarUsuarioByNombreUsuario(@PathVariable String nombreUsuario){
        return userServiceImpl.findByNombreUsuario(nombreUsuario);
    }
    
    @RequestMapping(value = "/user/signup", method = RequestMethod.POST)
    public ResponseEntity<?> crearUsuario(@RequestBody AppUser user){
        System.out.println(user);
        user.setContrasena(PasswordEncoder.encode(user.getContrasena()));
        return userServiceImpl.createUser(user);
    }
    
    @RequestMapping(value ="/user/{nombreUsuario}", method = RequestMethod.DELETE)
    public ResponseEntity<AppUser> EliminarUsuarioPorUsuario(@PathVariable String nombreUsuario){
        return userServiceImpl.deleteUserByNombreUsuario(nombreUsuario);
    }
    
    @RequestMapping(value = "/user/{nombreUsuario}", method = RequestMethod.PATCH)
    public ResponseEntity<AppUser> cambiarDatoUserByNombreUsuario(@PathVariable String nombreUsuario,@RequestBody AppUser user){
        return userServiceImpl.changeDataUserByNombreUsuario(nombreUsuario, user);
    }
    
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> login(@RequestBody AppUser user) {
        System.out.println(user);
        try {
            org.springframework.security.authentication.UsernamePasswordAuthenticationToken authToken =
                new org.springframework.security.authentication.UsernamePasswordAuthenticationToken(user.getNombreUsuario(), user.getContrasena());
            authenticationManager.authenticate(authToken);
            return ResponseEntity.ok("Login successful");
        } catch (org.springframework.security.core.AuthenticationException e) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }
}
