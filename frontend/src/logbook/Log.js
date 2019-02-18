import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, Header, Icon, Input, Label, Table} from 'semantic-ui-react';

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
        fetch(`${this.props.backend_api}/api/log/entries/add`, {
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
            <Card>
                <form className='form' id='add-entry-form' onSubmit={this.handleSubmit}>
                    <Label>Date:</Label>
                    <Input type='date' id='entry-date' name='date' placeholder='Date' required value={this.state.formValues.date} onChange={this.handleChange} />
                    <Label>River:</Label>
                    <Input type='text' id='entry-river' name='river' placeholder='River' required value={this.state.formValues.river} onChange={this.handleChange} />
                    <Label>Section:</Label>
                    <Input type='text' id='entry-section' name='section' placeholder='Section' required value={this.state.formValues.section} onChange={this.handleChange} />
                    <Label>Flow:</Label>
                    <Input type='number' id='entry-flow' name='flow' placeholder='Flow' step='1.0' required value={this.state.formValues.flow} onChange={this.handleChange} />
                    <Label>Craft:</Label>
                    <Input type='text' id='entry-craft' name='craft' placeholder='Craft' required value={this.state.craft} onChange={this.handleChange} />
                    <Button type='submit' form='add-entry-form' value='Submit' size='small' color='green' >
                        <Icon name='add' /> Add
                    </Button>
                </form>
            </Card>
        );
    }
}

class Entry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            date: props.date,
            river: props.river,
            section: props.section,
            flow: props.flow,
            craft: props.craft,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Table.Row className={`entry-${this.state.id}`}>
                <Table.Cell>{this.state.date}</Table.Cell>
                <Table.Cell>{this.state.river}</Table.Cell>
                <Table.Cell>{this.state.section}</Table.Cell>
                <Table.Cell>{this.state.flow}</Table.Cell>
                <Table.Cell>{this.state.craft}</Table.Cell>
            </Table.Row>
        );
    }
};

export default Log;
