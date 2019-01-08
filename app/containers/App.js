import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/Header';
import MainSection from '../components/MainSection';
import * as VideoActions from '../actions/videos';
import style from './App.css';

@connect(
  state => ({
    videos: state.videos
  }),
  dispatch => ({
    actions: bindActionCreators(VideoActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    videos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { videos, actions } = this.props;

    return (
      <div>
        <Header />
        <MainSection videos={videos} actions={actions} />
      </div>
    );
  }
}
