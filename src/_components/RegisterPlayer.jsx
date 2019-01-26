import React from 'react';
import { connect } from 'react-redux';
import uniqid from 'uniqid';

import { playerActions } from '../_actions';

class RegisterPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showPlayer = this.showPlayer.bind(this);
        this.newTestUser = this.newTestUser.bind(this);
        this.checkInputs = this.checkInputs.bind(this);
        this.isSubmitOk = this.isSubmitOk.bind(this);

        this.state = {
            name: '',
            email: '',
            nameError: null,
            emailError: null
        };
    }

    checkInputs(input, value) {
        // validate input
        let { nameError, emailError } = this.state;

        // Validate inputs
        if (input == 'name') nameError = value ? false : "Name is required";
        if (input == 'email') emailError = value ? false : "Email is required";


        let inputState = { nameError, emailError };
        inputState[input] = value;
        this.setState(inputState);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.checkInputs(name, value);
    }

    handleSubmit(e) {
        e.preventDefault();
        const player = {
            name: this.state.name,
            email: this.state.email
        }

        if (this.isSubmitOk()) {
            const { dispatch } = this.props;
            dispatch(playerActions.registerOne(player));
        }
    }

    showPlayer() {
        const { isRegistered, name, email, } = this.props;
        if (isRegistered) {
            return (
                <div className="form-group">
                    <div>New Playfab player registered</div>
                    <div>Name: {name}</div>
                    <div>Email: {email}</div>
                </div>
            )
        }
    }

    newTestUser() {
        let testUser = `testuser_${uniqid()}`
        let player = {
            name: testUser,
            email: `${testUser}_@testdomain.com`
        }
        this.setState({
            ...player,
            nameError: false,
            emailError: false
        });
    }

    isSubmitOk () {
        const { isPending } = this.props;
        const { name, email, nameError, emailError } = this.state;
        return (!isPending && !nameError && !emailError && name && email)
    }

    render() {

        const { name, email, nameError, emailError } = this.state;
        const { isPending } = this.props;

        let buttonState = this.isSubmitOk() ? '' : 'disabled';
        let nameState = nameError ? 'has-error' : '';
        let emailState = emailError ? 'has-error' : '';

        let onSubmit = isPending ? (e) => { e.preventDefault() } : this.handleSubmit;

        // Set generated name/email for testing

        return (
            <div className="col-md-9">
                <h2>Register Player</h2>
                <button className='btn btn-primary' onClick={this.newTestUser}>Generate test user</button>
                <form name="form" onSubmit={onSubmit}>
                    <div className={`form-group ${nameState}`}>
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" name="name" value={name} onChange={this.handleChange} />
                        {nameError && <div className="help-block">{nameError}</div>}
                    </div>
                    <div className={`form-group ${emailState}`}>
                        <label htmlFor="email">Email</label>
                        <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
                        {emailError && <div className="help-block">{emailError}</div>}
                    </div>
                    <div className="form-group">
                        <button className={`btn btn-primary ${buttonState}`}>Register</button>
                        {isPending &&
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                    </div>
                    {this.showPlayer()}
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return state.playerRegistration;
}

const connectedRegisterPlayer = connect(mapStateToProps)(RegisterPlayer);
export { connectedRegisterPlayer as RegisterPlayer }; 