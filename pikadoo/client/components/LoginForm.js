import React from 'react';

class LoginForm extends React.Component {
    render() {
        return (
            <form action="#" method="POST">
                <div className="form-group row">
                    <input type="text" className="form-control" id="emailOrUser" placeholder="Email or Username" />
                </div>
                <div className="form-group row">
                    <input type="text" className="form-control" id="pwd" placeholder="Password" />
                </div>
                <div className="form-group row">
                    <button type="submit" className="btn btn-default col-md-6 offset-md-6">Sign In</button>
                </div>
            </form>
        );
    }
}

export default LoginForm;
