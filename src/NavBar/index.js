import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.welcomeMessage = this.welcomeMessage.bind(this);
    }
    componentDidMount() { }

    welcomeMessage() {
        let { user } = this.props;
        if (user) {
            return (
                <div>
                    <span>
                        Welcome {user.firstName}
                    </span>
                    <a href="/login" >Logout</a>
                </div>
            )
        } else {
            return (
                <div>
                    Please Login
                </div>
            )
        }
    }

    render() {
        const { user } = this.props;
        return (
            <div className='nav-bar'>
                {this.welcomeMessage()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication;
    return {
        user
    };
}

const connectedNavBar = connect(mapStateToProps)(NavBar);
export { connectedNavBar as NavBar };