import React, { Component } from 'react';

import RiverStatus from './RiverStatus';

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

export default Status;
