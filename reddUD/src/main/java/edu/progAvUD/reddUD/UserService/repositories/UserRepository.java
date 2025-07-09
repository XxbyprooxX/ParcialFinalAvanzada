package edu.progAvUD.reddUD.UserService.repositories;

import edu.progAvUD.reddUD.UserService.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
    
}
