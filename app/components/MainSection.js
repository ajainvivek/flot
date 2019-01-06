import React, { Component, PropTypes } from 'react';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import Plyr from 'react-plyr';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

  static propTypes = {};

  constructor(props, context) {
    super(props, context);
    this.state = {};
    console.log('HERE');
  }

  render() {

    return (
      <section className={style.main}>
        
      </section>
    );
  }
}
