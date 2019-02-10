import React, { Component } from 'react';

import {Button, Icon, Input} from 'semantic-ui-react'

class Log extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddEntryForm: false,
            entries: [],
        };

        this._onAddEntryClick = this._onAddEntryClick.bind(this);
        this._onCancelEntryClick = this._onCancelEntryClick.bind(this);
        this.handleAddEntry = this.handleAddEntry.bind(this);
    }

    _onAddEntryClick() {
        this.setState({
            showAddEntryForm: true,
        });
    }

    _onCancelEntryClick() {
        this.setState({
            showAddEntryForm: false,
        });
    }

    componentDidMount = async() => {
        await this.getLogbook()
            .then(res => this.setState(res))
            .catch(err => console.log(err))

        await this.getEntries()
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

    handleAddEntry() {
        this.setState({
            showAddEntryForm: false,
        });
        this.getEntries()
        .then(res => this.setState(res))
        .catch(err => console.log(err))
    }


    render() {
        return (
            <div className='content'>
                <h1>River Log</h1>
                <p>{this.state.headline}</p>
                <h2>Log Entries</h2>
                <div className='ui buttons'>
                    <Button size='small' color={!this.state.showAddEntryForm ?'blue':'grey'} onClick={this._onAddEntryClick}>
                        <Icon name='add' />
                        Add New Entry
                    </Button>
                    {
                        this.state.showAddEntryForm ?
                        <Button size='small' color='yellow' onClick={this._onCancelEntryClick}>
                            <Icon name='cancel' />
                            Cancel
                        </Button>
                        :
                        null
                    }
                    
                </div>
                <div>
                    {
                        this.state.showAddEntryForm ?
                        <div>
                            <AddEntry handleAddEntry={this.handleAddEntry} /> 
                        </div>
                        :null
                    }
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
                    {this.state.entries.map(entry => <Entry key={`entry-${entry.id}`} entry={entry} />)}
                    </tbody>
                </table>
            </div>
        );
    }

};

class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                date: '',
                river: '',
                section: '',
                flow: '',
                craft: '',
            }
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
        fetch('/api/log/entries/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.formValues),
          }).then(res => {
                if (res.status === 200) {
                    this.props.handleAddEntry();
                }
          });
    }

    render() {
        return (
            <form className='form' id='add-entry-form' onSubmit={this.handleSubmit}>
                <label>Date:</label>
                <Input type='date' id='entry-date' name='date' placeholder='Date' required value={this.state.formValues.date} onChange={this.handleChange} />
                <label>River:</label>
                <Input type='text' id='entry-river' name='river' placeholder='River' required value={this.state.formValues.river} onChange={this.handleChange} />
                <label>Section:</label>
                <Input type='text' id='entry-section' name='section' placeholder='Section' required value={this.state.formValues.section} onChange={this.handleChange} />
                <label>Flow:</label>
                <Input type='number' id='entry-flow' name='flow' placeholder='Flow' step='1.0' required value={this.state.formValues.flow} onChange={this.handleChange} />
                <label>Craft:</label>
                <Input type='text' id='entry-craft' name='craft' placeholder='Craft' required value={this.state.craft} onChange={this.handleChange} />
                <Button type='submit' form='add-entry-form' value='Submit' size='small' color='green' >
                    <Icon name='add' />
                    Add
                </Button>
            </form>
        );
    }
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.entry.id,
            date: props.entry.date,
            river: props.entry.river,
            section: props.entry.section,
            flow: props.entry.flow,
            craft: props.entry.craft,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <tr className={`entry-${this.state.id}`}>
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
