import React from 'react';

class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            password : '',
            passwordConfirm : ''
        }

        this.submitFormHandler = this.submitFormHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);

    }

    onChangeHandler(event) {
        event.preventDefault();
        this.setState({[event.target.name] : event.target.value});
        console.log(this.state);
    }

    submitFormHandler(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <form onSubmit={this.submitFormHandler}>
                <div className="form-group">
                    <label className="control-label">Username</label>
                    <input 
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                    <label className="control-label">Password</label>
                    <input 
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                    <label className="control-label">Confirm Password</label>
                    <input 
                        type="password"
                        name="passwordConfirm"
                        value={this.state.passwordConfirm}
                        onChange={this.onChangeHandler}
                        className="form-control"
                        />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        )
    }
}

export default SignupForm;