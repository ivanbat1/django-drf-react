import React, {Component} from 'react';

var FontAwesome = require('react-fontawesome');

class UsersList extends Component {

    userClicked = user => {
        this.props.userClicked(user)
    };

    editUser = user => {
        this.props.userEdit(user)
    };

    removeUser = user => {
        fetch('http://127.0.0.1:8000/api/test/' + user.id + '/',
            {
                method: 'DELETE'
            }).then(resp => this.props.removeUser(user))
            .catch(error => console.log(error))
    };


    render() {
        return (
            <div>
                <table className='table-my'>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>methods</th>
                        </tr>
                    </thead>
                    {this.props.users.map(user => {
                        return (
                            <tfoot key={user.id}>
                                 <tr>
                                    <td>
                                        <p onClick={this.userClicked.bind(this, user)}>
                                            {user.name}
                                        </p>
                                    </td>
                                    <td>
                                        <FontAwesome name='edit' onClick={this.editUser.bind(this, user)}/>
                                        <FontAwesome name='trash' onClick={this.removeUser.bind(this, user)}/>
                                    </td>
                                </tr>
                            </tfoot>
                        )
                    })}
                </table>
            </div>
        )
    }
}

export default UsersList