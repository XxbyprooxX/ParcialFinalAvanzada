package edu.progAvUD.reddUD.Community.controllers;

import edu.progAvUD.reddUD.Community.models.Community;
import edu.progAvUD.reddUD.Community.services.CommunityServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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
public class CommunityController {
    
    @Autowired
    private CommunityServiceImpl communityServiceImpl;

    @RequestMapping(value = "/joined/user/{userId}", method = RequestMethod.GET)
    public ResponseEntity<List<Community>> getJoinedCommunities(@PathVariable Long userId) {
        List<Community> joined = communityServiceImpl.getJoinedCommunitiesByUserId(userId);
        return ResponseEntity.ok(joined);
    }
    
    @RequestMapping(value = "/community", method = RequestMethod.POST)
    public ResponseEntity<Community> createCommunity(@RequestBody Community community){
        Community created = communityServiceImpl.createCommunity(community);
        return ResponseEntity.ok(created);
    }
    
    @RequestMapping(value = "/community/{creatorId}", method = RequestMethod.POST)
    public ResponseEntity<Community> createCommunityByCreatorID(@RequestBody Community community, @PathVariable Long creatorId) {
        Community created = communityServiceImpl.createCommunityWithCreator(community, creatorId);
        return ResponseEntity.ok(created);
    }
}
