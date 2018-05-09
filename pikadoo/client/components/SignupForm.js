import React from 'react';
import axios from 'axios';
import Redirect from 'react-router';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            passwordC: '',
            errors: [],
            redirect: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        this.setState({ errors: [] }, () => {
            axios.post('/signup', { user: this.state }).then(res => {
                if(res.data.errorsExist){
                    this.setState({ errors: res.data.errors });
                    return;
                }
                //redirect
                this.setState({redirect : true});
            });
        });
    }

    render() {
        if(this.state.redirect) {
            return (<Redirect to="/login"/>);
        }

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
                <ul>
                    {this.state.errors.map((error) =>
                        <li>{error.msg}</li>
                    )}
                </ul>
                <div className="form-group row">
                    <button type="submit" className="btn btn-default col-md-6 offset-md-6">Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
