package ch.diogopocas.chatapp.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class UserChat {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long userChat_id;

	@JsonDeserialize
	@JsonSerialize
	@ManyToOne(optional = false)
	private Chat chat_id;
	
	@JsonDeserialize
	@JsonSerialize
	@ManyToOne(optional = false)
	private User user_id;

	public Long getUserChat_id() {
		return userChat_id;
	}

	public void setUserChat_id(Long userChat_id) {
		this.userChat_id = userChat_id;
	}

	public Chat getChat_id() {
		return chat_id;
	}

	public void setChat_id(Chat chat_id) {
		this.chat_id = chat_id;
	}

	public User getUser_id() {
		return user_id;
	}

	public void setUser_id(User user_id) {
		this.user_id = user_id;
	}

	

	

}
