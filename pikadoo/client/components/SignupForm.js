import React from 'react';

class SignupForm extends React.Component {
    render() {
        return (
            <form action="">
                <div className="form-group row">
                    <input type="username" className="form-control" id="username" placeholder="Email" />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" id="pwd" placeholder="Username" />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" id="pwd" placeholder="Password" />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" id="pwdC" placeholder="Confirm password" />
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-default col-md-6 offset-md-6">Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignupForm;