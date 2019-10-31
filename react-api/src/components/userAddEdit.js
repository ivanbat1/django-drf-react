import React, {Component} from 'react';

class UserForm extends Component {

    formSubmit = (url, val, event) => {
        event.preventDefault();
        var data ={
            "name": this.name.value,
            "surname": this.surname.value,
            "file": this.file.files[0],
        };
        fetch( url, {
            method: 'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).then(resp => resp.json())
            .then(res =>  val ? this.props.addtoList(res.message) : this.props.updateList(res.message))
            .catch( error => console.log(error))
    };


    render() {
        return (
            <React.Fragment>

                {this.props.user && this.props.addOrCreate !== true ? (
                        <React.Fragment>
                            <form onSubmit={this.formSubmit.bind(this, 'http://127.0.0.1:8000/api/test/' + this.props.user.id + '/', 1)}>
                                <input type='text' ref={(ref) => {
                                    this.name = ref
                                }} name='name'/><br/>
                                <input type='text' ref={(ref) => {
                                    this.surname = ref
                                }} name='surname'/><br/>
                                <img src={ this.props.user.img.includes('media/') ?
                                    'http://127.0.0.1:8000' + this.props.user.img
                                    : 'http://127.0.0.1:8000/media/' + this.props.user.img}/><br/>
                                <input type='file' ref={(ref) => {
                                    this.file = ref
                                }}/><br/>
                                <button type='submit'>save</button>
                            </form>
                        </React.Fragment>)
                    : (
                        <React.Fragment>
                            <form onSubmit={this.formSubmit.bind(this, 'http://127.0.0.1:8000/api/test/', 0)}>
                                <input type='text' ref={(ref) => {
                                    this.name = ref
                                }} name='name'/><br/>
                                <input type='text' ref={(ref) => {
                                    this.surname = ref
                                }} name='surname'/><br/>
                                <input type='file' ref={(ref) => {
                                    this.file = ref
                                }}/><br/>
                                <button type='submit'>save</button>
                            </form>
                        </React.Fragment>)
                }


            </React.Fragment>
        )
    }
}

export default UserForm;