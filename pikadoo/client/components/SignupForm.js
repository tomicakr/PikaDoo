import React from 'react';

class SignupForm extends React.Component {
    render() {
        return (
            <form action="#" method="POST">
                <div className="form-group row">
                    <input type="text" className="form-control" name="email" placeholder="Email" />
                </div>
                <div className="form-group row">
                    <input type="text" className="form-control" name="username" placeholder="Username" />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" name="password" placeholder="Password" />
                </div>
                <div className="form-group row">
                    <input type="password" className="form-control" name="passwordC" placeholder="Confirm password" />
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-default col-md-6 offset-md-6">Sign Up</button>
                </div>
            </form>
        );
    }
}

export default SignupForm;
