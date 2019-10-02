package ch.diogopocas.chatapp.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long user_id;

	@JsonDeserialize
	@JsonSerialize
	@Column(nullable = false)
	private String benutzername;

	@JsonDeserialize
	@JsonSerialize
	@Column(nullable = false)
	private String password;
	
	@OneToMany(mappedBy = "user_id")
	private List<UserChat> userChats;
	
	@OneToMany(mappedBy = "user_id")
	private List<Nachricht> nachrichts;
	
	public Long getUser_id() {
		return user_id;
	}

	public void setUser_id(Long user_id) {
		this.user_id = user_id;
	}

	public String getBenutzername() {
		return benutzername;
	}

	public void setBenutzername(String benutzername) {
		this.benutzername = benutzername;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
