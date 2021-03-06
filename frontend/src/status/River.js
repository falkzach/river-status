import React, { Component } from 'react';
import {Button, Card, Confirm, Icon, Label} from 'semantic-ui-react';

class River extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            usgs_site_no: props.usgs_site_no,
            flow: props.flow,
            height: props.height,
            query_datetime: props.query_datetime,
            open_delete: false
        }
    }

    open_delete = () => this.setState({open_delete: true });
    close_delete = () => this.setState({open_delete: false });

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

    deleteRiver = async() => {
        const response = await fetch(`${this.props.backend_api}${this.props.href}`, {
            method: 'DELETE'
        });
        const body = await response.json();
        if (response.status !== 200) throw Error(body.message);
        if (response.status === 200) {
            this.close_delete();
            this.props.handleDeleteRiver();
        }
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
                        <Button size='mini' color='red' onClick={this.open_delete}>
                            <Icon name='delete' />Remove
                        </Button>
                        <Confirm 
                            header={`Delete River: ${this.state.name}`}
                            confirmButton='Delete'
                            cancelButton ='Cancel'
                            open={this.state.open_delete}
                            onCancel={this.close_delete}
                            onConfirm={this.deleteRiver}
                        />
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

export default River;
