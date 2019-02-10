import React, { Component } from 'react';

import {Button, Icon, Input, Popup} from 'semantic-ui-react'

class Status extends Component {
    state = {
        response: '',
    };

    componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res.headline }))
            .catch(err => console.log(err));
    }

    callApi = async() => {
        const response = await fetch('/api/hello');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (
        <RiverStatus headline={this.state.response} />
        );
    }
}

class RiverStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _links: {},
            rivers: [],
            showAddRiverForm: false,
        }

        this._onAddRiverClick = this._onAddRiverClick.bind(this);
        this._onCancelRiverClick = this._onCancelRiverClick.bind(this);
        this.handleAddRiver = this.handleAddRiver.bind(this);
    }

    _onAddRiverClick() {
        this.setState({
            showAddRiverForm: true,
        });
    }

    _onCancelRiverClick() {
        this.setState({
            showAddRiverForm: false,
        });
    }

    componentDidMount() {
        this.getRivers()
            .then(res => this.setState(res))
            .catch(err => console.log(err))
    }

    getRivers = async() => {
        const response = await fetch('/api/rivers');
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    handleAddRiver() {
        this.setState({
            showAddRiverForm: false,
        });
        this.getRivers()
        .then(res => this.setState(res))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='content'>
                <h1>River Status</h1>
                <p>{this.props.headline}</p>

                <div className='ui buttons'>
                    {
                        !this.state.showAddRiverForm ?
                        <Button size='small' color='blue' onClick={this._onAddRiverClick}>
                            <Icon name='add' />
                            Add River
                        </Button>
                        :
                        <Button size='small' color='yellow' onClick={this._onCancelRiverClick}>
                            <Icon name='cancel' />
                            Cancel
                        </Button>
                    }
                </div>

                <div>
                    {
                        this.state.showAddRiverForm ?
                        <div>
                            <AddRiver handleAddRiver={this.handleAddRiver}/> 
                        </div>
                        :null
                    }
                </div>

                {/* TODO: add button dialog */}

                <div className='ui cards'>
                    {this.state.rivers.map(river => <River key={`river-${river.id}`} href={`/api/rivers/${river.id}`}/>)}
                </div>
            </div>
        );
    }
};

class AddRiver extends React.Component {
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
        fetch('/api/rivers/add', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.formValues),
          }).then(res => {
                if (res.status == 200) {
                    this.props.handleAddRiver();
                }
          });
        
    }

    render() {
        return (
            <form className='form' id='add-river-form' onSubmit={this.handleSubmit}>
                <label>Name:</label>
                <Input type='text' id='river-name' name='name' placeholder='River' required value={this.state.formValues.river} onChange={this.handleChange} />
                <label>State:</label>
                <Input type='text' id='river-state' name='state' placeholder='MT' required value={this.state.formValues.section} onChange={this.handleChange} />
                <a href='https://waterdata.usgs.gov/nwis/uv' target='_blank' rel='noopener noreferrer'>
                    <Popup trigger={<label>USGS Gauge Site:</label>} header='Instructions' content='Acquire a site number from: https://waterdata.usgs.gov/nwis/uv'/>
                </a>
                <Input type='number' id='river-site' name='site_no' placeholder='12340000'  required value={this.state.formValues.flow} onChange={this.handleChange} />
                <Button type='submit' form='add-river-form' value='Submit' size='small' color='green' >
                    <Icon name='add' />
                    Add
                </Button>
            </form>
        );
    }
}

class River extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            usgs_site_no: '',
            flow: '',
            height: '',
            query_datetime: '',
        }
    }   

    componentDidMount() {
        this.getRiver()
            .then(res => this.setState(res))
            .catch(err => console.log(err));
    }

    getRiver = async() => {
        const response = await fetch(this.props.href);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (
            <div className='ui card' id={'river-' + this.state.name}>
                <div className="content">
                    <div className='header'><i className="tag icon"></i>{this.state.name}</div>
                    <div className='meta'>
                        <div className='ui label grey'>{this.state.state}</div>
                        <div className='ui label grey'>Updated: {this.state.query_datetime}</div>
                    </div>
                    <div clasname='description'>
                        <div className='ui label blue'>Flow: {this.state.flow}</div>
                        <div className='ui label blue'>Height: {this.state.height}</div>
                    </div>
                </div>

            </div>
        );
    }
};

export default Status;
