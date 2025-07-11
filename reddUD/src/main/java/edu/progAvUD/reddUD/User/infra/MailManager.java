/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.User.infra;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

/**
 *
 * @author Andres Felipe
 */
@Component
public class MailManager {

    @Autowired
    private JavaMailSender javaMailSender;

    @Value("${spring.mail.username}")
    private String sender;

    public void sendMessage(String email, String username, String title) throws Exception {

        MimeMessage message = javaMailSender.createMimeMessage();
        String content = MessageHTML.template;

        try {
            message.setSubject(title);
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(email);

            content = setCodeInTemplate(content, 0, String.valueOf(username));

            helper.setText(content, true);
            helper.setFrom(sender);
            javaMailSender.send(message);

        } catch (MessagingException e) {
            throw new Exception(e);
        }
    }

    private String setCodeInTemplate(String templateCode, int index, String data) {
        return templateCode.replace("{" + index + "}", data);
    }

}
