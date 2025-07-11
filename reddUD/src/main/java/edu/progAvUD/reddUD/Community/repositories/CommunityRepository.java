package edu.progAvUD.reddUD.Community.repositories;

import edu.progAvUD.reddUD.Community.models.Community;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author Cristianlol789
 */

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long>{
    List<Community> findByMiembros_Id(Long userId);
}
