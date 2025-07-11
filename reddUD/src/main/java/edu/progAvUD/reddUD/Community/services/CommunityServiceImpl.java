package edu.progAvUD.reddUD.Community.services;

import edu.progAvUD.reddUD.Community.models.Community;
import edu.progAvUD.reddUD.Community.repositories.CommunityRepository;
import edu.progAvUD.reddUD.User.models.AppUser;
import edu.progAvUD.reddUD.User.repositories.AppUserRepository;
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

    @Autowired
    private AppUserRepository appUserRepository;
    
    @Override
    @CrossOrigin
    public List<Community> getJoinedCommunitiesByUserId(Long userId) {
        return repositorio.findByMiembros_Id(userId);
    }
    
    @CrossOrigin
    public Community createCommunity(Community community) {
        return repositorio.save(community);
    }

    @CrossOrigin
    public Community createCommunityWithCreator(Community community, Long creatorId) {
        AppUser creator = appUserRepository.findById(creatorId).orElse(null);
        if (creator == null) {
            throw new IllegalArgumentException("Creator user not found");
        }
        community.getModeradores().add(creator);
        community.getMiembros().add(creator);
        return repositorio.save(community);
    }
}
