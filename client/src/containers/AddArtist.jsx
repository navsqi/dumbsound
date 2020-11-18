import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { Button, InputGroup, FormControl, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { createArtist } from '../redux/actions/artist.action';
import Loader from 'react-loader-spinner';

class AddArtist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {},
    };
  }

  // Handle Add Button (Form Add Episode)
  handleAddEpisode = () => {
    let newInput = `episode-${this.state.addEpisodes.length}`;
    this.setState((prevState) => ({
      addEpisodes: prevState.addEpisodes.concat([newInput]),
    }));
  };

  handleOnChange = (e) => {
    const input = e.target;
    const value = input.value;

    if (input.type === 'file') {
      this.setState({ artist: { ...this.state.artist, [input.name]: input.files[0] } });
    } else {
      this.setState({ artist: { ...this.state.artist, [input.name]: value } });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);

    this.props.createArtist({
      name: this.state.artist.name,
      old: this.state.artist.old,
      type: this.state.artist.type,
      startCareer: this.state.artist.startCareer,
    });

    document.getElementById('formAddArtist').reset();
  };

  render() {
    const { artists, loading, error } = this.props;
    // console.log(loading, error);
    return (
      <>
        <Container className="main-wrapper">
          <h1 className="mb-4">Add Artist</h1>
          <Row>
            <Form id="formAddArtist" onSubmit={this.handleOnSubmit} className="w-100">
              <InputGroup className="mb-3">
                <FormControl
                  name="name"
                  onChange={this.handleOnChange}
                  type="text"
                  placeholder="Name"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <FormControl
                  name="old"
                  onChange={this.handleOnChange}
                  type="text"
                  placeholder="Old"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control onChange={this.handleOnChange} name="type" as="select">
                  <option>- Select Artist -</option>
                  <option value="Band">Band</option>
                  <option value="Solo">Solo</option>
                </Form.Control>
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  name="startCareer"
                  onChange={this.handleOnChange}
                  type="text"
                  placeholder="Start Career"
                />
              </InputGroup>

              <Button type="submit" className="btn btn-red btn-full mt-3">
                {this.props.loading ? (
                  <Loader type="Oval" color="white" height="20" width="20" stye="" />
                ) : (
                  'Save'
                )}
              </Button>
              <p className="text-center text-success mt-3">
                {!error && !loading && artists && Object.keys(artists).length > 0
                  ? 'Artist has been saved successfully'
                  : false}
              </p>
            </Form>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    artists: state.artistReducer.artists,
    loading: state.artistReducer.loading,
    error: state.artistReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createArtist: (value) => dispatch(createArtist(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArtist);
