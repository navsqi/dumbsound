import React, { Component } from 'react';
import Header from '../components/Header';

class P404 extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="container">
          <div className="row error-container">
            <h1 className="m-auto">404</h1>
          </div>
          <div className="row">
            <p className="m-auto display-4">Page not found</p>
          </div>
        </div>
      </>
    );
  }
}

export default P404;
