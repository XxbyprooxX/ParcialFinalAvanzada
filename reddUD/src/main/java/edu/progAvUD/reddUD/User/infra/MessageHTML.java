/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package edu.progAvUD.reddUD.User.infra;

/**
 *
 * @author Andres Felipe
 */
public class MessageHTML {
    
    public static final String template ="<html lang=\"es\">\n" +
"<head>\n" +
"  <meta charset=\"UTF-8\">\n" +
"  <title>Bienvenido a Reddud</title>\n" +
"  <style>\n" +
"    body {\n" +
"      font-family: 'Arial', sans-serif;\n" +
"      background-color: #f6f8fa;\n" +
"      margin: 0;\n" +
"      padding: 0;\n" +
"    }\n" +
"\n" +
"    .email-container {\n" +
"      max-width: 600px;\n" +
"      margin: 40px auto;\n" +
"      background-color: #ffffff;\n" +
"      border-radius: 8px;\n" +
"      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);\n" +
"      overflow: hidden;\n" +
"    }\n" +
"\n" +
"    .header {\n" +
"      background-color: #e74c3c;\n" +
"      padding: 20px;\n" +
"      text-align: center;\n" +
"      color: #ffffff;\n" +
"    }\n" +
"\n" +
"    .header h1 {\n" +
"      margin: 0;\n" +
"      font-size: 26px;\n" +
"    }\n" +
"\n" +
"    .content {\n" +
"      padding: 30px;\n" +
"    }\n" +
"\n" +
"    .content h2 {\n" +
"      color: #333333;\n" +
"    }\n" +
"\n" +
"    .content p {\n" +
"      font-size: 16px;\n" +
"      color: #555555;\n" +
"      line-height: 1.6;\n" +
"    }\n" +
"\n" +
"    .cta-button {\n" +
"      display: inline-block;\n" +
"      margin-top: 20px;\n" +
"      padding: 12px 20px;\n" +
"      background-color: #e74c3c;\n" +
"      color: white;\n" +
"      text-decoration: none;\n" +
"      border-radius: 5px;\n" +
"      font-weight: bold;\n" +
"    }\n" +
"\n" +
"    .footer {\n" +
"      text-align: center;\n" +
"      padding: 15px;\n" +
"      font-size: 13px;\n" +
"      color: #999999;\n" +
"    }\n" +
"  </style>\n" +
"</head>\n" +
"<body>\n" +
"\n" +
"  <div class=\"email-container\">\n" +
"    <div class=\"header\">\n" +
"      <h1>¡Bienvenido a Reddud!</h1>\n" +
"    </div>\n" +
"\n" +
"    <div class=\"content\">\n" +
"      <h2>Hola {0},</h2>\n" +
"      <p>\n" +
"        ¡Gracias por unirte a nuestra comunidad en <strong>Reddud</strong>! Nos alegra mucho tenerte aquí.\n" +
"        Esta es una red social pensada para que compartas tus ideas, conectes con personas afines\n" +
"        y explores comunidades sobre temas que te apasionan.\n" +
"      </p>\n" +
"\n" +
"      <p>\n" +
"        Para comenzar, visita tu <a href=\"http://localhost:8383/HTMLreddUD/PanelInicioPagina/InicioPaginaHTML.html\" class=\"cta-button\">feed personalizado</a> y únete a comunidades que te interesen.\n" +
"      </p>\n" +
"    </div>\n" +
"\n" +
"    <div class=\"footer\">\n" +
"      © 2025 Reddud. Todos los derechos reservados.\n" +
"    </div>\n" +
"  </div>\n" +
"\n" +
"</body>\n" +
"</html>";
    
}
