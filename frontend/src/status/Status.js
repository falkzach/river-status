import React, { Component } from 'react';

class RiverStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _links: {}
        }
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

    render() {
        var rivers = {};
        Object.keys(this.state._links).slice(1).forEach(link => {
            rivers[link] = <River key={link} href={this.state._links[link].href}/>
        });

        return (
            <div className='content'>
                <h1>River Status</h1>
                <p>{this.props.headline}</p>
                {Object.keys(rivers).map(river=> rivers[river])}
            </div>
        );
    }
};

class River extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            usgs_site_no: '',
            flow: '',
            height: '',
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
            <div className="river">
                <h2>{this.state.name}</h2>
                <p>Flow: {this.state.flow}</p>
                <p>Height: {this.state.height}</p>
            </div>
        );
    }
};

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

export default Status;
