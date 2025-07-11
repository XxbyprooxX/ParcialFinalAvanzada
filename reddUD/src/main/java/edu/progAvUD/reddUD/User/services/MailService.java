/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.User.services;

import edu.progAvUD.reddUD.User.infra.MailManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

/**
 *
 * @author Andres Felipe
 */
@Service
public class MailService {
    
    @Autowired
    MailManager mailManager;
    
    @CrossOrigin
    public void sendMessageUserRegister(String email, String username, String title) throws Exception{
        mailManager.sendMessage(email, username, title);
    }
    
}
