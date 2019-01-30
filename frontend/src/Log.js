import React, { Component } from 'react';

import './App.css';
import Nav from './Nav.js';

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        this.getLogbook()
            .then(res => this.setState(res))
            .catch(err => console.log(err))
    }

    getLogbook = async() => {
        const response = await fetch('/api/log');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        var entires = {};
        console.log(this.state)

        return (
            <div className="river-log wrapper">
                <header className='main-head'>River Status and Logbook</header>
                <Nav />
                <div className='content'>
                    <h1>River Log</h1>
                    <p>{this.state.headline}</p>
                    <div>
                        <button>Add</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>River</th>
                                <th>Section</th>
                                <th>Flow</th>
                                <th>Craft</th>
                            </tr>
                        </thead>
                        <tbody>
                            {}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

};

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            river: '',
            section: '',
            flow: '',
            craft: '',
        }
    }

    componentDidMount() {

    }

    getEntry = async() => {

    }

    return() {
        return (
            <tr className='entry'>
                <td>{this.state.date}</td>
                <td>{this.state.river}</td>
                <td>{this.state.section}</td>
                <td>{this.state.flow}</td>
                <td>{this.state.craft}</td>
            </tr>
        );
    }
};

export default Log;
