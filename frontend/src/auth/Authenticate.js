import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Button, Container, Divider, Header, Icon, Grid, Segment} from 'semantic-ui-react'

import io from 'socket.io-client'

import OAuth from './OAuth';

const providers = ['google', 'facebook', 'twitter', 'github']

class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        // this.socket = io(props.backend_api)
    }

    componentDidMount() {

    }

    render() {
        return (
            <Container className='content'>
                <Container text>
                    <Header as='h1' className='ui horizontal divider header'>Authenticate</Header>
                    <p>Please login with one of the bellow providers. For your security we do not manage passwords or user credentials, only river data and your logbook entries.</p>
                    <Container textAlign='center'>
                        <Header as='h2' className='ui horizontal divider header'>OAuth 2.0 Providers</Header>
                        <Button.Group vertical >
                        {providers.map((provider, index) => {
                            return <Button key={index} size='large'>
                                <Icon name={provider} /> {provider.charAt(0).toUpperCase()+provider.slice(1)}
                            </Button>
                        })}
                        </Button.Group>
                    </Container>
                </Container>
            </Container>
        );
    }

}

export default Authenticate;
