import React, { Component } from 'react';
import CardMusic from './CardMusic';
import MusicPlayer from './MusicPlayer';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMusics } from '../redux/actions/music.action';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playIndex: 0,
    };
  }

  async componentDidMount() {
    await this.props.getMusics();

    let buttonPlay = document.getElementById('play');

    document.addEventListener('keypress', (e) => {
      if (e.key === 'w') {
        buttonPlay.dispatchEvent(new Event('click', { bubbles: true }));
      }
    });
  }

  handleOnClick = (e) => {};

  render() {
    const { musics, loading, error, isLogin, user } = this.props;
    const idMusic = this.props.match.params.idMusic ? Number(this.props.match.params.idMusic) : 0;

    return (
      <React.Fragment>
        <div className="container mb-2">
          <p className="main-title text-center mt-2 mb-5">Have you listened to these songs?</p>
          <div className="row list-music">
            {musics && musics.length > 0 && !loading && !error ? (
              musics.map((music, index) => {
                return (
                  <CardMusic
                    key={music.id}
                    img={music.thumbnail}
                    title={music.title}
                    year={music.year}
                    name={music.artist.name}
                    idMusic={music.id}
                    src={music.attachment}
                    playIndex={user.subscribe ? `/detail/${index}` : false}
                  />
                );
              })
            ) : (
              <p className="text-center">LOADING....</p>
            )}
          </div>
        </div>

        {isLogin && user.subscribe ? <MusicPlayer musics={musics} playIndex={idMusic} /> : false}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.authReducer.isLogin,
    user: state.authReducer.user,
    musics: state.musicReducer.musics,
    loading: state.musicReducer.loading,
    error: state.musicReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMusics: () => dispatch(getMusics()),
  };
};

// Dynamic Page with withRouter
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Overview));
