import React, { Component } from 'react';

import {Button, Container, Divider, Header, Icon, Grid, Segment} from 'semantic-ui-react'

class Authenticate extends Component {
    state = {
    };

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
                            <Button size='large'>
                                <Icon name='google' />
                                Google
                            </Button>
                            <Button size='large'>
                                <Icon name='facebook' />
                                Facebook
                            </Button>
                            <Button size='large'>
                                <Icon name='twitter' />
                                Twitter
                            </Button>
                            <Button size='large'>
                                <Icon name='github' />
                                Github
                            </Button>
                        </Button.Group>
                    </Container>
                </Container>
            </Container>
        );
    }

}

export default Authenticate;
