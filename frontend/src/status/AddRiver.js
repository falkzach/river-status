import React, { Component } from 'react';
import {Button, Card, Icon, Input, Label, Popup} from 'semantic-ui-react';

class AddRiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
                name: '',
                state: '',
                site_no: '',
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
        fetch(`${this.state.BACKEND_API}/api/rivers/add`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.formValues),
          }).then(res => {
                if (res.status === 200) {
                    this.props.handleAddRiver();
                }
          });
        
    }

    render() {
        return (
            <Card>
                <form className='form' id='add-river-form' onSubmit={this.handleSubmit}>
                    <Label>Name:</Label>
                    <Input type='text' id='river-name' name='name' placeholder='River' required value={this.state.formValues.river} onChange={this.handleChange} />
                    <Label>State:</Label>
                    <Input type='text' id='river-state' name='state' placeholder='MT' required value={this.state.formValues.section} onChange={this.handleChange} />
                    <a href='https://waterdata.usgs.gov/nwis/uv' target='_blank' rel='noopener noreferrer'>
                        <Popup trigger={<Label>USGS Gauge Site:</Label>} header='Instructions' content='Acquire a site number from: https://waterdata.usgs.gov/nwis/uv'/>
                    </a>
                    <Input type='number' id='river-site' name='site_no' placeholder='12340000'  required value={this.state.formValues.flow} onChange={this.handleChange} />
                    <Button type='submit' form='add-river-form' value='Submit' size='small' color='green' >
                        <Icon name='add' />Add
                    </Button>
                </form>
            </Card>
        );
    }
}

export default AddRiver;