import React from 'react';
import './App.css';
import Userlist from './Userlist';
import Chatlist from './Chatlist';
import Login from './Login';

class App extends React.Component {	

	constructor(){
		super();
		this.state = {pages: [], count: 0, access: 0}
	  }

	
	  componentDidMount = () => {
		let tempPages = []
		tempPages[0] = <Login />
		tempPages[1] = <Userlist />
		tempPages[2] = <Chatlist />

		this.setState({pages: tempPages})

		let tempAccess = parseInt(sessionStorage.getItem('access'))
		let lastPage =  parseInt(sessionStorage.getItem('page'))

		if (tempAccess){
			this.setState({access: tempAccess})
		}

		if (!tempAccess){
			this.setState({access: 0})
			sessionStorage.setItem("access",0);
		}

		if (lastPage){
			this.setState({count: lastPage})
		}

		if (!lastPage){
			this.setState({count: 0})
			sessionStorage.setItem("page",0);
		}

		if (this.state.access < 1){
			this.setState({count: 0})
			sessionStorage.setItem("page",0);
		}


	  }

	  handleCount = (tempCount) => {
		let tempAccess = parseInt(sessionStorage.getItem('access'))

		  console.log("handleCount: tempcount is " + tempCount + "  access is: " + tempAccess)
		  if (tempCount === 0){
			this.setState({count: 0})
			sessionStorage.setItem("page",0);
			return
		  }

		  if (tempCount > 0){
			if (tempAccess < 1){
				this.setState({count: 0})
				sessionStorage.setItem("page",0);
			} else{
				this.setState({count: tempCount})
				sessionStorage.setItem("page",tempCount);
			}
		  }
	  }
	  



	render(){
		return(
		
			<React.Fragment>
				<div className="App">
					<table className="table"><tbody>
					<tr>
						<td>
							<input onClick={() => this.handleCount(0)} className="btn btn-light btn-lg" type="button" value="Login" ></input>
						</td>
			
						<td>
							<input onClick={() => this.handleCount(1)} className="btn btn-light btn-lg" type="button" value="Users" ></input>
						</td>
						<td>
							<input onClick={() => this.handleCount(2)} className="btn btn-light btn-lg" type="button" value="Chats" ></input>
						</td>
					</tr>
					</tbody></table>
					{this.state.pages[this.state.count]}

     			 </div>
			</React.Fragment>
		);
	}
}

export default App;
