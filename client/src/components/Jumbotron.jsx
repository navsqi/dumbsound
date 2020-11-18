import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Jumbotron extends Component {
  render() {
    return (
      <>
        {
          <div
            className="jumbotron highlight"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(104, 106, 116, 0), rgba(0, 0, 0, 0.99)), url("${process.env.REACT_APP_BASE_URL}images/jumbotron/jumbotron.jpg")`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="container">
              <div className="jumbotron-desc">
                <h1 className="text-center">Music for Everyone</h1>
                <p className="text-center h5">Discovery, stream, and share a constantly expanding mix of music from emerging and major artists around the world</p>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}

export default withRouter(Jumbotron);
