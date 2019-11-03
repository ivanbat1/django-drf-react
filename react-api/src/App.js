import React, {Component} from 'react';
import UsersList from "./components/userlist";
import UserDetail from "./components/userdetail";
import UserForm from "./components/userAddEdit";
import './App.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            userSelect: null,
            userForm: null,
            addOrCreate: null,
            errors: [],
        };
    }

    componentDidMount() {
        fetch('http://127.0.0.1:8000/api/test/', {
            method: 'GET'
        }).then(res => res.json())
            .then((resj) => this.setState({users: resj.message})
            )
            .catch(error => console.log(error))
    };

    userClicked = user => {
        this.setState({userSelect: user, userForm: null});
        console.log(this.state.userSelect)
    };

    removeUser = userSelect => {
        const users = this.state.users.filter(user => user.id !== userSelect.id);
        this.setState({users: users, userSelect: null})
    };

    editUser = user => {
        this.setState({userForm: true, userSelect: user, addOrCreate: null})
    };

    addUser = () => {
        this.setState({userForm: true, userSelect: null, addOrCreate: true})
    };

    addtoList = userSelect => {
        if (userSelect.error) {
            this.setState({errors: userSelect.error});
        } else {
            this.state.users.push(userSelect);
            this.setState({users: this.state.users, userSelect: userSelect, userForm: false, addOrCreate: false})
        }
    };

    updateList = (user) => {
        if (user.error) {
            this.setState({errors: user.error});
            console.log(this.state.errors)
        } else {
            fetch('http://127.0.0.1:8000/api/test/', {
                method: 'GET'
            }).then(res => res.json())
                .then((resj) => this.setState({users: resj.message, userSelect: user, userForm: false, addOrCreate: false}
                        )
                )
                .catch(error => console.log(error))
        }

    };

    render() {
        return (
            <div className='App'>
                <h1>Users</h1>
                <div className='layout'>
                    <UsersList users={this.state.users} userClicked={this.userClicked}
                               removeUser={this.removeUser}
                               userEdit={this.editUser}/>
                    <div>
                        {this.state.userForm ?
                            (
                                <UserForm errors={this.state.errors} addtoList={this.addtoList}
                                          updateList={this.updateList}
                                          addOrCreate={this.state.addOrCreate}
                                          user={this.state.userSelect}/>
                            )
                            : (
                                <UserDetail user={this.state.userSelect}/>
                            )
                        }
                    </div>
                </div>
                <button onClick={this.addUser}>add</button>
            </div>
        )
    }
}

export default App;