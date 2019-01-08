import React, { Component, PropTypes } from 'react';
import style from './MainSection.css';
import Plyr from 'react-plyr';

export default class MainSection extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {

    return (
      <section className={style.main}>
        <div className="dode-anim">
          <div className="plane main">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      </section>
    );
  }
}
