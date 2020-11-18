import React, { Component } from 'react';
import Jumbotron from '../components/Jumbotron';
import Overview from '../components/Overview';
import { Helmet } from 'react-helmet';

class Home extends Component {
  state = {};
  render() {
    return (
      <>
        <Helmet>
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        </Helmet>
        <Jumbotron />
        <Overview type={this.props.match.params.type} />
      </>
    );
  }
}

export default Home;
