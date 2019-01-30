import React, { Component } from 'react';

import {Button, Icon, Input} from 'semantic-ui-react'

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this._onAddEntryClick = this._onAddEntryClick.bind(this);
    }

    _onAddEntryClick() {
        this.setState({
            showAddEntryForm: true,
        });
        
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
            <div className='content'>
                <h1>River Log</h1>
                <p>{this.state.headline}</p>

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

                <div>
                    <Button size='small' color='green' onClick={this._onAddEntryClick}>
                        <Icon name='add' />
                        Add New Entry
                    </Button>
                </div>
                <div>
                    {
                        this.state.showAddEntryForm ?
                        <AddEntry /> :
                        null
                    }
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

class AddEntry extends React.Component {
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

    postEntry() {

    }

    render() {
        return (
            <div>
                <div className='ui input'>
                    <Input type='date' placeholder='Date' />
                    <Input type='text' placeholder='River' />
                    <Input type='text' placeholder='Section' />
                    <Input type='number' placeholder='Flow' step='1.0' />
                    <Input type='text' placeholder='Craft' />
                </div>
                <div>
                    <Button size='small' color='blue' >
                        <Icon name='add' />
                        Submit
                    </Button>
                    <Button size='small' color='yellow' >
                        <Icon name='cancel' />
                        Submit
                    </Button>
                </div>
            </div>
        );
    }
}

export default Log;
