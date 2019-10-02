package ch.diogopocas.chatapp.controller;

import javax.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import ch.diogopocas.chatapp.domain.User;
import ch.diogopocas.chatapp.service.UserService;

/**
 * 
 * @author diogo
 *
 *
 *Erlauben dass React auf das Backend zugreifen kann
 */
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/login")
public class LoginController {
	
    private UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Kontrollieren ob User im Datenbank existiert
     * @param user
     * @return 1 gut, -1 existiert nicht
     */
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public int checkUser(@Valid @RequestBody User user) {
        return userService.checkUser(user.getBenutzername(), user.getPassword());
        
     
    }

}


