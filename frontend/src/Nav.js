import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
                    <li><Link to="/">River Status</Link></li>
                    <li><Link to="Log">River Log</Link></li>
                </ul>
            </nav>
        );
    };
}

export default Nav;
