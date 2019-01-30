import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

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
                    <li><NavLink activeClassName='is-active' to="/">River Status</NavLink></li>
                    <li><NavLink to="Log">River Log</NavLink></li>
                </ul>
            </nav>
        );
    };
}

export default Nav;
