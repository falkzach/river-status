import React, {} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Container, Header } from 'semantic-ui-react';

class OAuth extends React.Component {
  
  state = {
    user: {},
    disabled: ''
  }

  componentDidMount() {
    const { socket, provider } = this.props

    socket.on(provider, user => {  
      this.popup.close()
      this.setState({user})
    })
  }

  // custom methods to follow
  // render method to follow
}

export default OAuth;
