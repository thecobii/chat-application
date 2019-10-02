import React from 'react';
import { button } from 'react';
import './App.css';

class Login extends React.Component {

	constructor(){
		super();
		console.log("constructor from login")
		this.state = {access: 0, newBenutzername: "", newPassword: ""}
	}

	componentDidMount = () => {
		
		let tempAccess = parseInt(sessionStorage.getItem('access'))
		console.log("mount " + tempAccess)
		if (tempAccess){
			this.setState({access: tempAccess})
		}

		if (!tempAccess){
			this.setState({access: 0})
			sessionStorage.setItem("access",0);
		}


	  }

	handleCheckLogin = (benutzername, password) => {
        fetch('http://localhost:8080/login/', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({benutzername: benutzername, password: password})
		})
		.then(response => response.json())
		.then(data => {
			this.setState({access: data})
		})
		

		

	}

	getAccessText = () => {
		sessionStorage.setItem("access",this.state.access)

		if (this.state.access === 1){
			return "Access Granted"			
		}
		if (this.state.access < 0){
			return "Access Denied"			
		}
		return ""
	}
	
	setNewName = (benutzername) => {
		this.setState({newBenutzername: benutzername})
	}
	setNewPassword = (password) => {
		this.setState({newPassword: password})
	}

	render(){
		return(
			<div>
				Login
				<p>Benutzername<input type="text" onChange={event => this.setNewName(event.target.value)} /></p>
				<p>Password<input type="text"onChange={event => this.setNewPassword(event.target.value)} /></p>
				<button variant="primary" onClick={() => this.handleCheckLogin(this.state.newBenutzername,this.state.newPassword)}>Login</button>
				<p>{this.getAccessText()}</p>
			</div>
		);
	}
}

export default Login;
