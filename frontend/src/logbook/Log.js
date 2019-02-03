import React, { Component } from 'react';

import {Button, Icon, Input} from 'semantic-ui-react'

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddEntryForm: false,
        };
        this._onAddEntryClick = this._onAddEntryClick.bind(this);
        this._onPostEntryClick = this._onPostEntryClick.bind(this);
        this._onCancelEntryClick = this._onCancelEntryClick.bind(this);
    }

    _onAddEntryClick() {
        this.setState({
            showAddEntryForm: true,
        });
    }

    _onPostEntryClick() {
        this.setState({
            showAddEntryForm: false,
        });
    }

    _onCancelEntryClick() {
        this.setState({
            showAddEntryForm: false,
        });
    }

    componentDidMount() {
        this.getLogbook()
            .then(res => this.setState(res))
            .catch(err => console.log(err))

        this.getEntries()
            .then(res => this.setState(res))
            .catch(err => console.log(err))
    }

    getLogbook = async() => {
        const response = await fetch('/api/log');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    getEntries= async() => {
        const response = await fetch('/api/log/entries');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        var entires = {};

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
                    {
                        !this.state.showAddEntryForm ?
                        <Button size='small' color='blue' onClick={this._onAddEntryClick}>
                            <Icon name='add' />
                            Add New Entry
                        </Button>
                        :
                        <Button size='small' color='yellow' onClick={this._onCancelEntryClick}>
                            <Icon name='cancel' />
                            Cancel
                        </Button>
                    }
                </div>
                <div>
                    {
                        this.state.showAddEntryForm ?
                        <div>
                            <AddEntry /> 
                        </div>
                        :null
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
            formValues: {}
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        fetch(process.env.API_URL + '/api/log/entries/add', {
            method: 'POST',
            body: data,
          });
    }

    render() {
        return (
            <form className='form' id='add-entry-form' onSubmit={this.handleSubmit}>
                <label>Date:</label>
                <Input type='date' id='entry-date' placeholder='Date' required value={this.state.formValues.date} onChange={this.handleChange} />
                <label>River:</label>
                <Input type='text' id='entry-river' placeholder='River' required value={this.state.formValues.river} onChange={this.handleChange} />
                <label>Section:</label>
                <Input type='text' id='entry-section' placeholder='Section' required value={this.state.formValues.section} onChange={this.handleChange} />
                <label>Flow:</label>
                <Input type='number' id='entry-flow' placeholder='Flow' step='1.0' required value={this.state.formValues.flow} onChange={this.handleChange} />
                <label>Craft:</label>
                <Input type='text' id='entry-craft' placeholder='Craft' required value={this.state.craft} />
                <Button type='submit' form='add-entry-form' value='Submit' size='small' color='green' >
                    <Icon name='add' />
                    Add
                </Button>
            </form>
        );
    }
}

export default Log;
