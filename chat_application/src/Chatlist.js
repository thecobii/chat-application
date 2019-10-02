import React from 'react';
import { button } from 'react';
import './App.css';

class Chatlist extends React.Component {

	constructor(){
		super();
		this.state = {chats: [], newChatname: "",editChatname: ""}
	}
	
	componentDidMount() {
		this.getChats();
	}
	
	handleDelete = (chat_id) => {
        fetch('http://localhost:8080/chat/delete/'+chat_id, {
			method: 'DELETE'})
		return
		this.getChats();
		window.location.reload();
	}

	getChats = () => {
        fetch('http://localhost:8080/chats')
            .then(response => response.json())
            .then(data => {
                this.setState({chats: data})
            })
	}

	handleAdd = (bezeichnung) => {
		console.log(sessionStorage.getItem('access'))

        fetch('http://localhost:8080/chats/', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({bezeichnung: bezeichnung})
		})
		this.getChats();
		window.location.reload();
	}

	
	handleEdit = (id) => {
        fetch('http://localhost:8080/chats/' + id, {
			method: 'PUT',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({bezeichnung: this.state.editChatname})
		})
		this.getChats();
		window.location.reload();
	}


	setNewName = (bezeichnung) => {
		this.setState({newChatname: bezeichnung})
	}

	setEditName = (bezeichnung) => {
		this.setState({editChatname: bezeichnung})
	}

	
	render(){

	const listItems = this.state.chats.map((d) => 

		<tr>
			<td key={d.chat_id}>{d.chat_id}</td>
			<td key={d.chat_id}>{d.bezeichnung}</td>
			<td><button variant="primary" onClick={() => this.handleDelete(d.chat_id)}>Delete</button></td>
			<td><input type="text" onChange={event => this.setEditName(event.target.value)} /></td>
			<td><button variant="primary" onClick={() => this.handleEdit(d.chat_id)}>Save</button></td>
		</tr>
	
	);
	
		return(
			<div>
				<table>
					<tr>
						<th>ID</th>
						<th>bezeichnung</th>
						<th></th>
						<th>New bezeichnung</th>
					</tr>
				{listItems }
				</table>
				<p>Chat hinzufügen:</p>
				<p>Benutzername<input type="text" onChange={event => this.setNewName(event.target.value)} /></p>
				<button variant="primary" onClick={() => this.handleAdd(this.state.newChatname)}>Add</button>
				
			</div>
		);
	}
}

export default Chatlist;
