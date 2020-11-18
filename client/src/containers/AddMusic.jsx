import React, { Component } from 'react';

import { Container } from 'react-bootstrap';
import { Button, Col, InputGroup, FormControl, Form, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getArtists } from '../redux/actions/artist.action';
import { createMusic } from '../redux/actions/music.action';
import Loader from 'react-loader-spinner';

class AddMusic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      music: {},
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
      this.setState({ music: { ...this.state.music, [input.name]: input.files[0] } });
    } else {
      this.setState({ music: { ...this.state.music, [input.name]: value } });
    }
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', this.state.music.title);
    data.append('year', this.state.music.year);
    data.append('thumbnail', this.state.music.thumbnail);
    data.append('artistId', this.state.music.artistId);
    data.append('attachment', this.state.music.attachment);
    this.props.createMusic(data);

    if (this.props.musics) document.getElementById('formAddMusic').reset();
  };

  componentDidMount() {
    this.props.getArtists();
  }

  render() {
    const { musics, loading, error } = this.props;
    return (
      <>
        <Container className="main-wrapper">
          <h1 className="mb-4">Add Music</h1>
          <Row>
            <Form id="formAddMusic" onSubmit={this.handleOnSubmit} className="w-100">
              <Row>
                <Col md="8">
                  <InputGroup className="mb-3">
                    <FormControl
                      name="title"
                      onChange={this.handleOnChange}
                      type="text"
                      placeholder="Title"
                    />
                  </InputGroup>
                </Col>
                <Col md="4">
                  <InputGroup className="mb-3">
                    <Form.File id="fileThumbnail" className="formcheck-api-custom">
                      <Form.File.Input name="thumbnail" onChange={this.handleOnChange} isValid />
                      <Form.File.Label
                        onChange={this.handleOnChange}
                        className="btn btn-red btn-full attach-thumbnail"
                        data-browse="Button text"
                        htmlFor="fileThumbnail"
                      >
                        Attach Thumbnail
                      </Form.File.Label>
                    </Form.File>
                    <p className="ml-3">
                      {this.state.music.thumbnail ? this.state.music.thumbnail.name : false}
                    </p>
                  </InputGroup>
                </Col>
              </Row>
              <InputGroup className="mb-3">
                <FormControl
                  name="year"
                  onChange={this.handleOnChange}
                  type="text"
                  placeholder="Year"
                />
              </InputGroup>
              <InputGroup className="mb-3">
                <Form.Control onChange={this.handleOnChange} name="artistId" as="select">
                  <option>- Select Artist -</option>
                  {this.props.artists.length > 0
                    ? this.props.artists.map((category) => {
                        return (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        );
                      })
                    : false}
                </Form.Control>
              </InputGroup>
              <InputGroup className="mb-3">
                <FormControl
                  name="attachment"
                  onChange={this.handleOnChange}
                  type="text"
                  placeholder="Link Music"
                />
              </InputGroup>

              <Button type="submit" className="btn btn-red btn-full mt-3">
                {this.props.loadingFilm ? (
                  <Loader type="Oval" color="white" height="20" width="20" stye="" />
                ) : (
                  'Save'
                )}
              </Button>
              <p className="text-center text-success mt-3">
                {!error && !loading && musics && Object.keys(musics).length > 0
                  ? 'Film has been saved successfully'
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
    musics: state.musicReducer.musics,
    loading: state.musicReducer.loading,
    error: state.musicReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // createMusic: (value) => dispatch(createMusic(value)),
    getArtists: (value) => dispatch(getArtists(value)),
    createMusic: (value) => dispatch(createMusic(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMusic);
