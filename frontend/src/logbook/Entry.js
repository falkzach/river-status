import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class Entry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            date: props.date,
            river: props.river,
            section: props.section,
            flow: props.flow,
            craft: props.craft,
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <Table.Row className={`entry-${this.state.id}`}>
                <Table.Cell>{this.state.date}</Table.Cell>
                <Table.Cell>{this.state.river}</Table.Cell>
                <Table.Cell>{this.state.section}</Table.Cell>
                <Table.Cell>{this.state.flow}</Table.Cell>
                <Table.Cell>{this.state.craft}</Table.Cell>
            </Table.Row>
        );
    }
};

export default Entry;
