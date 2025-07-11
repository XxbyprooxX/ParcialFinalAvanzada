package edu.progAvUD.reddUD.Community.controllers;

import edu.progAvUD.reddUD.Community.models.Community;
import edu.progAvUD.reddUD.Community.services.CommunityServiceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Cristianlol789
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class CommunityController {
    
    @Autowired
    private CommunityServiceImpl communityServiceImpl;

    @GetMapping("/joined/user/{userId}")
    public ResponseEntity<List<Community>> getJoinedCommunities(@PathVariable Long userId) {
        List<Community> joined = communityServiceImpl.getJoinedCommunitiesByUserId(userId);
        return ResponseEntity.ok(joined);
    }
}
