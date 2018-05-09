import React from 'react';
import axios from 'axios';

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            passwordC: '',
            errors: []
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value} );
    }

    onSubmit(e) {
        e.preventDefault();

        var errors = [];
        axios.post('/signup', { user: this.state }).then(res => {
            errors = res.data;
            this.setState({ errors });
        });
        console.log(errors);
        
        
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group row">
                    <input type="text" className="form-control" name="email" value={this.state.email} placeholder="Email" onChange={this.onChange} />
                </div>
                <div className="form-group row">
                    <input type="text" className="form-control" name="username" value={this.state.username} placeholder="Username" onChange={this.onChange} />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" name="password" value={this.state.password} placeholder="Password" onChange={this.onChange} />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" name="passwordC" value={this.state.passwordC} placeholder="Confirm Password" onChange={this.onChange} />
                </div>
                <div className="form-group row">
                    <ul>
                    {this.state.errors.map((error) => {
                            <li>{error.msg}</li>
                    })}
                    </ul>
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-default col-md-6 offset-md-6">Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
