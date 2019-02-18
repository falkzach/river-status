import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return(
            <nav className='main-nav'>
                <ul>
                    <li><NavLink activeClassName='is-active' to="/">River Status <Icon name='tag' /></NavLink></li>
                    <li><NavLink to="Log">River Log <Icon name='book' /></NavLink></li>
                    <li><NavLink to="Authenticate">Log-In <Icon name='user' /></NavLink></li>
                </ul>
            </nav>
        );
    };
}

export default Nav;
