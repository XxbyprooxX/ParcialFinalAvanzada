
package edu.progAvUD.reddUD.Post.repositories;

import edu.progAvUD.reddUD.Post.models.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long>{
    
    List<Post> findByComunidadId(Long comunidadId);
    List<Post> findByAutorId(Long autorId);

    
}
