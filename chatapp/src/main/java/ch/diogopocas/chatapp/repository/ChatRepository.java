package ch.diogopocas.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.diogopocas.chatapp.domain.Chat;

public interface ChatRepository extends JpaRepository<Chat, Long> {
}
