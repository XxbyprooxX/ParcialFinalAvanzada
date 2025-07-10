package edu.progAvUD.reddUD.User.controllers;

import edu.progAvUD.reddUD.User.models.User;
import edu.progAvUD.reddUD.User.services.UserServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    
    @RequestMapping(value = "/users", method = RequestMethod.GET)
    public List<User> getAllUser(){
        return userServiceImpl.getAllUser();
    }
    
    
    @RequestMapping(value = "/user/{nombreUsuario}", method = RequestMethod.GET)
    public ResponseEntity<User> mostrarUsuarioByNombreUsuario(@PathVariable String nombreUsuario){
        return userServiceImpl.findByNombreUsuario(nombreUsuario);
    }
    
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public ResponseEntity<User> crearUsuario(User user){
        return userServiceImpl.createUser(user);
    }
    
    @RequestMapping(value ="/user/{nombreUsuario}", method = RequestMethod.DELETE)
    public ResponseEntity<User> EliminarUsuarioPorUsuario(@PathVariable String nombreUsuario){
        return userServiceImpl.deleteUserByNombreUsuario(nombreUsuario);
    }
    
    @RequestMapping(value = "/user/{nombreUsuario}", method = RequestMethod.PATCH)
    public ResponseEntity<User> cambiarDatoUserByNombreUsuario(@PathVariable String nombreUsuario, User user){
        return userServiceImpl.changeDataUserByNombreUsuario(nombreUsuario, user);
    }
    
}
