import React, { Component } from 'react';
import { async } from 'rxjs/internal/scheduler/async';

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
        const response = await fetch('/api/logbook');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        var entires = {};

        return (
            <div className="river-log container">
                <h1>River Log</h1>
                <p>{this.props.headline}</p>
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
