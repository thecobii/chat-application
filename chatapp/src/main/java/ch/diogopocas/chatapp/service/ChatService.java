package ch.diogopocas.chatapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import ch.diogopocas.chatapp.domain.Chat;
import ch.diogopocas.chatapp.domain.User;
import ch.diogopocas.chatapp.repository.ChatRepository;

@Service
public class ChatService implements CommandLineRunner {
	private ChatRepository chatRepository;
	
	public ChatService(ChatRepository chatRepository) {
		this.chatRepository = chatRepository;
	}

	@Override
	public void run(String... args) throws Exception {
	}

	public void deleteAllUsers() {
		chatRepository.deleteAll();
	}

	public Chat createChat(Chat chat) {
		return chatRepository.saveAndFlush(chat);
	}

	public List<Chat> findAll() {
		return chatRepository.findAll();
	}
	
	public Optional<Chat> findChat(Long chat_id) {
		return chatRepository.findById(chat_id);
	}

	public void deleteChat(Long id) {
		chatRepository.deleteById(id);
	}

	public Chat updateChat(Long id, Chat chat) {
		if (chatExistsById(id)) {
			chat.setChat_id(id);
			return chatRepository.saveAndFlush(chat);
		} else {
			throw new RuntimeException("Chat with id " + id + " not found");
		}
	}
	public int checkChat(String bezeichnung) { 
		for (Chat c : chatRepository.findAll()) {
			if (c.getBezeichnung().equals(bezeichnung) ) {
				return 1;
			}
		}
		return -1;
	}
	private boolean chatExistsById(Long id) {
		return chatRepository.existsById(id);
	}

}
