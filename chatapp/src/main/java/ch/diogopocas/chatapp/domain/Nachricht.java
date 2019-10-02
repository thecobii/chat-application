package ch.diogopocas.chatapp.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class Nachricht {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long nachricht_id;

	@JsonDeserialize
	@JsonSerialize
	@Column(nullable = false)
	private String text;
	
	@JsonDeserialize
	@JsonSerialize
	@ManyToOne(optional = false)
	private Chat chat_id;
	
	@JsonDeserialize
	@JsonSerialize
	@ManyToOne(optional = false)
	private User user_id;

	public Long getNachricht_id() {
		return nachricht_id;
	}

	public void setNachricht_id(Long nachricht_id) {
		this.nachricht_id = nachricht_id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
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
