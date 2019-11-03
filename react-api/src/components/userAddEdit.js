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
            if (!this.state[i] && i !== 'file') {
                send = false;
            }
        }
        if (send) {
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
                            <p>update form</p>
                            <form className="form-group" action={'http://127.0.0.1:8000/api/test/' + this.props.user.id + '/'}
                                  onSubmit={this.formSubmit.bind(this, 1)}>
                                <label>Name *</label><br/>
                                <input placeholder={this.props.user.name} className='form-control' type='text'
                                       onChange={this.setValue} name='name'/><br/>
                                {this.props.errors.name ? (<p className='error'>{this.props.errors.name}</p>) : null}
                                <label>Surname *</label><br/>
                                <input placeholder={this.props.user.surname} className="form-control" type='text' onChange={this.setValue} name='surname'/><br/>
                                {this.props.errors.surname ? (<p className='error'>{this.props.errors.surname}</p>) : null}
                                <img className='image' src={this.props.user.img.includes('media/') ?
                                    'http://127.0.0.1:8000' + this.props.user.img
                                    : 'http://127.0.0.1:8000/media/' + this.props.user.img}/><br/>
                                <input type='file' onChange={this.setValue} name='file'/><br/>
                                <button className='btn btn-primary' type='submit'>Save</button>
                            </form>
                        </React.Fragment>
                    )
                    : (
                        <React.Fragment>
                            <p>add form</p>
                            <form className="form-group" action='http://127.0.0.1:8000/api/test/' onSubmit={this.formSubmit.bind(this, 0)}>
                                <label>Name *</label><br/>
                                <input className={this.state.name ? 'form-control' : 'form-control border'} type='text'
                                       onChange={this.setValue}
                                       name='name'/><br/>
                                {this.props.errors.name ? (<p className='error'>{this.props.errors.name}</p>) : null}
                                <label>Surname *</label><br/>
                                <input className={this.state.surname ? 'form-control' : 'form-control border'} type='text'
                                       onChange={this.setValue}
                                       name='surname'/><br/>
                                {this.props.errors.surname ? (<p className='error'>{this.props.errors.surname}</p>) : null}
                                <input className="image" type='file' name="file"
                                       onChange={this.handleOnFileChange}
                                /><br/>
                                <button className='btn btn-primary' type='submit'>Save</button>
                            </form>
                        </React.Fragment>
                    )
                }
            </React.Fragment>
        )
    }
}

export default UserForm;