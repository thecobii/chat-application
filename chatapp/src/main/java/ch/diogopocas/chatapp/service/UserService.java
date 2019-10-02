package ch.diogopocas.chatapp.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import ch.diogopocas.chatapp.domain.User;
import ch.diogopocas.chatapp.repository.UserRepository;

@Service
public class UserService implements CommandLineRunner {
	private UserRepository userRepository;
	private Boolean isRoot = false;
	
	@PersistenceContext
	private EntityManager session;
	
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	//spezielle Abfrage
	public User getUserByName(String name) {
		Query query = session.createQuery("from User where benutzername=:name");
		query.setParameter("name", name);
		List<User> result = query.getResultList();
		if (result.isEmpty()) {
			return null;
		}
		return result.get(0);
	}
	
	@Override
	public void run(String... args) throws Exception {
	/* Wird gebraucht bei der Initialisierung der DB um zB Daten hinzuzufügen
		deleteAllUsers();

		User rootUser = new User();
		rootUser.setBenutzername("root");
		rootUser.setPassword("");
		
		userRepository.findAll().forEach(u -> {
			if (u.getBenutzername().equals(rootUser.getBenutzername())) {
				isRoot = true;
			}
		});
		
		if (!isRoot) { userRepository.save(rootUser);
*/
	}

	public void deleteAllUsers() {
		userRepository.deleteAll();
	}

	public User createUser(User user) {
		return userRepository.saveAndFlush(user);
	}

	public List<User> findAll() {
		return userRepository.findAll();
	}

	public void deleteUser(Long id) {
		userRepository.deleteById(id);
	}

	public User updateUser(Long id, User user) {
		if (userExistsById(id)) {
			user.setUser_id(id);
			return userRepository.saveAndFlush(user);
		} else {
			throw new RuntimeException("User with id " + id + " not found");
		}
	}
	
	public int checkUser(String benutzername, String password) { 
		for (User u : userRepository.findAll()) {
			if (u.getBenutzername().equals(benutzername) && (u.getPassword().equals(password))) {
				return 1;
			}
		}
		return -1;
	}

	public boolean userExistsById(Long id) {
		return userRepository.existsById(id);
	}

}
