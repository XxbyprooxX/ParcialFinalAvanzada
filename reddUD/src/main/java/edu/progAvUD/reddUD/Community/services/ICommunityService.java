package edu.progAvUD.reddUD.Community.services;

import edu.progAvUD.reddUD.Community.models.Community;
import java.util.List;

/**
 *
 * @author Cristianlol789
 */
public interface ICommunityService {
    List<Community> getJoinedCommunitiesByUserId(Long userId);
}
