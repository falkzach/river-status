import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, Header, Icon, Input, Label, Popup} from 'semantic-ui-react';

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
        const response = await fetch(`${this.props.backend_api}/api/hello`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (
        <RiverStatus headline={this.state.response} backend_api={this.props.backend_api} />
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
        const response = await fetch(`${this.props.backend_api}/api/rivers`);
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
                <Header as='h1' className='horizontal divider'>River Status</Header>
                <p>{this.props.headline}</p>

                <Header as='h2' className='horizontal divider'>Your Favorite Rivers</Header>
                <Link to="/authenticate">Log-In</Link> to see your favorite rivers!

                <Header as='h2' className='horizontal divider'>All Rivers</Header>
                <div className='ui buttons'>
                        
                        <Button size='small' color={!this.state.showAddRiverForm ?'blue':'grey'} onClick={this._onAddRiverClick}>
                            <Icon name='add' />Add River
                        </Button>
                        {
                            this.state.showAddRiverForm ?
                            <Button size='small' color='yellow' onClick={this._onCancelRiverClick}>
                                <Icon name='cancel' />Cancel
                            </Button>
                            :
                            null
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

                <Card.Group>
                {this.state.rivers.map(river => <River key={`river-${river.id}`} backend_api={this.props.backend_api} href={`/api/rivers/${river.id}`}/>)}
                </Card.Group>
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

class River extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            usgs_site_no: props.usgs_site_no,
            flow: props.flow,
            height: props.height,
            query_datetime: props.query_datetime,
        }
    }   

    componentDidMount() {
        this.getRiver()
            .then(res => this.setState(res))
            .catch(err => console.log(err));
    }

    getRiver = async() => {
        const response = await fetch(`${this.props.backend_api}${this.props.href}`);
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        return body;
    }

    render() {
        return (
            <Card id={'river-' + this.state.name}>
                <Card.Content>
                    <Card.Header><Icon className="tag" />{this.state.name}</Card.Header>
                    <Card.Meta>
                        <Label color='grey'>{this.state.state}</Label>
                        {/* <div className='ui label grey'>Updated: {this.state.query_datetime}</div> */}
                        <Button size='mini'>
                            <Icon name='heart outline' />Favorite
                        </Button>
                        <Button size='mini'>
                            <Icon name='book' />Log a Day
                        </Button>
                    </Card.Meta>
                    <Card.Description>
                        <Label color='blue'>Flow: {this.state.flow}</Label>
                        <Label color='blue'>Height: {this.state.height}</Label>
                    </Card.Description>
                </Card.Content>
            </Card>
        );
    }
};

export default Status;
