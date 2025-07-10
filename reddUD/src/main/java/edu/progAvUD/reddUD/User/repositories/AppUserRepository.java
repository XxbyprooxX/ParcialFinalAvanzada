package edu.progAvUD.reddUD.User.repositories;

import edu.progAvUD.reddUD.User.models.AppUser;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, Long>{
    
    Optional<AppUser> findByNombreUsuario(String nombreUsuario);
    
    Optional<AppUser> findByCorreo(String correo);
    
}
