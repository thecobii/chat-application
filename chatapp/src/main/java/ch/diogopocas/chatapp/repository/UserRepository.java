package ch.diogopocas.chatapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import ch.diogopocas.chatapp.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
