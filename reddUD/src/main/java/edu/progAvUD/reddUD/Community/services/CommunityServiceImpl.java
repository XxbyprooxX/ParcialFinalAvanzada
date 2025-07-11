package edu.progAvUD.reddUD.Community.services;

import edu.progAvUD.reddUD.Community.models.Community;
import edu.progAvUD.reddUD.Community.repositories.CommunityRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author Cristianlol789
 */

@Service
public class CommunityServiceImpl implements ICommunityService {

    @Autowired
    private CommunityRepository repositorio;
    
    @Override
    public List<Community> getJoinedCommunitiesByUserId(Long userId) {
        return repositorio.findByMiembros_Id(userId);
    }
}
