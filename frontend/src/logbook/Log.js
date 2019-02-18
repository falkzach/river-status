import React, { Component } from 'react';
import { Button, Header, Icon, Table } from 'semantic-ui-react';

import Entry from './Entry'
import AddEntry from './AddEntry'

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
        const response = await fetch(`${this.props.backend_api}/api/log`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    getEntries= async() => {
        const response = await fetch(`${this.props.backend_api}/api/log/entries`);
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
                <Header as='h1' className='horizontal divider'>River Log</Header>
                <p>{this.state.headline}</p>
                <Header as='h2' className='horizontal divider'>Log Entries</Header>
                <Button.Group>
                    <Button size='small' color={!this.state.showAddEntryForm ?'blue':'grey'} onClick={this._onAddEntryClick}>
                        <Icon name='add' /> Add New Entry
                    </Button>
                    {
                        this.state.showAddEntryForm ?
                        <Button size='small' color='yellow' onClick={this._onCancelEntryClick}>
                            <Icon name='cancel' /> Cancel
                        </Button>
                        :
                        null
                    }
                </Button.Group>
                <div>
                    {
                        this.state.showAddEntryForm ?
                        <div>
                            <AddEntry handleAddEntry={this.handleAddEntry} backend_api={this.props.backend_api} /> 
                        </div>
                        :null
                    }
                </div>

                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>River</Table.HeaderCell>
                            <Table.HeaderCell>Section</Table.HeaderCell>
                            <Table.HeaderCell>Flow</Table.HeaderCell>
                            <Table.HeaderCell>Craft</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.state.entries.map(entry => <Entry key={`entry-${entry.id}`} {...entry} />)}
                    </Table.Body>
                </Table>
            </div>
        );
    }

};

export default Log;
