import React from 'react';
import { button } from 'react';
import './App.css';

class Userlist extends React.Component {

	constructor(){
		super();
		this.state = {users: [], newBenutzername: "", newPassword: "", editBenutzername: "", editPassword: ""}
	}
	
	componentDidMount() {
		this.getUsers();
	}
	
	handleDelete = (user_id) => {
        fetch('http://localhost:8080/users/delete/'+user_id, {
			method: 'DELETE'})
		this.getUsers();
		window.location.reload();
	}

	getUsers = () => {
        fetch('http://localhost:8080/users')
            .then(response => response.json())
            .then(data => {
                this.setState({users: data})
            })
	}

	handleAdd = (benutzername, password) => {
		console.log(sessionStorage.getItem('access'))

        fetch('http://localhost:8080/users/', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({benutzername: benutzername, password: password})
		})
		this.getUsers();
		window.location.reload();
	}

	
	handleEdit = (id) => {
        fetch('http://localhost:8080/users/' + id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({benutzername: this.state.editBenutzername, password: this.state.editPassword})
		})
		this.getUsers();
		window.location.reload();
	}


	setNewName = (benutzername) => {
		this.setState({newBenutzername: benutzername})
	}
	setNewPassword = (password) => {
		this.setState({newPassword: password})
	}

	setEditName = (benutzername) => {
		this.setState({editBenutzername: benutzername})
	}
	setEditPassword = (password) => {
		this.setState({editPassword: password})
	}
	
	render(){
/*
	const listItems1 = this.state.users.map((d) => 
	<ul class="list-group">
		<li><button variant="primary" onClick={() => this.handleDelete(d.user_id)}>Delete</button></li>
		
		<li class="list-group-item" key={d.user_id}>{d.benutzername}</li>
	</ul>
	
	);
*/
	const listItems = this.state.users.map((d) => 

		<tr>
			<td key={d.user_id}>{d.user_id}</td>
			<td key={d.user_id}>{d.benutzername}</td>
			<td key={d.user_id}>{d.password}</td>
			<td><button variant="primary" onClick={() => this.handleDelete(d.user_id)}>Delete</button></td>
			<td><input type="text" onChange={event => this.setEditName(event.target.value)} /></td>
			<td><input type="text" onChange={event => this.setEditPassword(event.target.value)} /></td>
			<td><button variant="primary" onClick={() => this.handleEdit(d.user_id)}>Save</button></td>
		</tr>
	
	);
	
		return(
			<div>
				<table>
					<tr>
						<th>ID</th>
						<th>Benutzername</th>
						<th>Password</th>
						<th></th>
						<th>New Benutzername</th>
						<th>New Password</th>
					</tr>
				{listItems }
				</table>
				<p>User hinzufügen:</p>
				<p>Benutzername<input type="text" onChange={event => this.setNewName(event.target.value)} /></p>
				<p>Password<input type="text"onChange={event => this.setNewPassword(event.target.value)} /></p>
				<button variant="primary" onClick={() => this.handleAdd(this.state.newBenutzername,this.state.newPassword)}>Add</button>
				
			</div>
		);
	}
}

export default Userlist;
