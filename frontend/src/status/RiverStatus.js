import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Card, Header, Icon} from 'semantic-ui-react';

import River from './River'
import AddRiver from './AddRiver';

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
        this.handleDeleteRiver = this.handleDeleteRiver.bind(this);
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

    handleDeleteRiver()  {
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
                            <AddRiver handleAddRiver={this.handleAddRiver} backend_api={this.props.backend_api} /> 
                        </div>
                        :null
                    }
                </div>

                <Card.Group>
                {this.state.rivers.map(river => 
                <River key={`river-${river.id}`} backend_api={this.props.backend_api} href={`/api/rivers/${river.id}`} handleDeleteRiver={this.handleDeleteRiver}/>)}
                </Card.Group>
            </div>
        );
    }
};

export default RiverStatus;
