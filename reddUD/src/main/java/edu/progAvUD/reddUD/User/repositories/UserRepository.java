package edu.progAvUD.reddUD.User.repositories;

import edu.progAvUD.reddUD.User.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
    User findByNombreUsuario(String nombreUsuario);
    User findByCorreo(String correo);
    
}
