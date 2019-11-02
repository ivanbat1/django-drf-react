import React, {Component} from 'react';

class UserDetail extends Component {

    render() {
        return (
            <React.Fragment>
                {this.props.user ? (
                    <div>
                        <p>{this.props.user.name}</p>
                        <p>{this.props.user.surname}</p>
                        <p>{this.props.user.date_create}</p>
                        <img className="image" src={this.props.user.img.includes('media/') ?
                            'http://127.0.0.1:8000' + this.props.user.img
                            : 'http://127.0.0.1:8000/media/' + this.props.user.img}/>
                    </div>

                ) : null}
            </React.Fragment>
        )
    }
}

export default UserDetail;