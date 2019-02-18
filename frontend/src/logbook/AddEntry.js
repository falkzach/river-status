import React, { Component } from 'react';
import { Button, Card, Icon, Input, Label } from 'semantic-ui-react';

class AddEntry extends Component {
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

export default AddEntry;
