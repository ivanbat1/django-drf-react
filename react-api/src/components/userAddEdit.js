import React, {Component} from 'react';

class UserForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            surname: null,
            file: null,
        };
    }

    setValue = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log(event.target.name, event.target.value);
    };

    handleOnFileChange = (e) => {
        let file = e.target.files[0];
        this.setState({
            [e.target.name]: file
        })
    };

    formSubmit = (val, event) => {
        event.preventDefault();
        var send = true;
        for (let i in this.state) {
            if (!this.state[i]) {
                send = false;
            }
        }
        if (send) {
            console.log('img append', this.state.img);
            fetch(event.target.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.state)
            }).then(resp => resp.json())
                .then(res => val ? this.props.updateList(res.message) : this.props.addtoList(res.message))
                .catch(error => console.log(error))
        } else {
            console.log(this.state, 'not send')
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.props.user && this.props.addOrCreate !== true ?
                    (
                        <React.Fragment>
                            <form action={'http://127.0.0.1:8000/api/test/' + this.props.user.id + '/'}
                                  onSubmit={this.formSubmit.bind(this, 1)}>
                                <label>Name *</label><br/>
                                <input type='text'
                                       onChange={this.setValue} name='name'/><br/>
                                <label>Surname *</label><br/>
                                <input type='text' onChange={this.setValue} name='surname'/><br/>
                                <img src={this.props.user.img.includes('media/') ?
                                    'http://127.0.0.1:8000' + this.props.user.img
                                    : 'http://127.0.0.1:8000/media/' + this.props.user.img}/><br/>
                                <input className="image" type='file' onChange={this.setValue} name='file'/><br/>
                                <button type='submit'>save</button>
                            </form>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <form action='http://127.0.0.1:8000/api/test/' onSubmit={this.formSubmit.bind(this, 0)}>
                                <label>Name *</label><br/>
                                <input className={this.state.name ? null : 'border'} type='text'
                                       onChange={this.setValue}
                                       name='name'/><br/>
                                <label>Surname *</label><br/>
                                <input className={this.state.surname ? null : 'border'} type='text'
                                       onChange={this.setValue}
                                       name='surname'/><br/>
                                <input className="image" type='file' name="file"
                                       onChange={this.handleOnFileChange}
                                /><br/>
                                <button type='submit'>save</button>
                            </form>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        )
    }
}

export default UserForm;