import React, { PropTypes, Component } from 'react';
import { Button } from 'antd-mobile';
import style from './Header.css';

export default class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      enabled: false
    };
  }

  componentDidMount() {
    chrome.storage.local.get(['pip_enabled'], (obj) => {
      this.setState({'enabled': !!obj.pip_enabled}, () => {
        this.updateAnimStyle();
      });
    });
  }

  updateAnimStyle = () => {
    const enabled = this.state.enabled;
    if (enabled) {
      document.querySelector('.dode-anim').classList.remove('disabled');
    } else {
      document.querySelector('.dode-anim').classList.add('disabled');
    }
  };

  notifyUpdate = () => {
    const enabled = this.state.enabled;
    console.log('HERE');
    chrome.runtime.sendMessage({pip_enabled: enabled});
  };

  handleActivatePip = () => {
    chrome.storage.local.get(['pip_enabled'], (obj) => {
      chrome.storage.local.set({
        'pip_enabled': !obj.pip_enabled
      }, () => {
        this.setState({'enabled': !obj.pip_enabled}, () => {
          this.updateAnimStyle();
          this.notifyUpdate();
        });
      });
    });
  };

  render() {
    return (
      <header className={style.header}>
        <Button type={this.state.enabled ? 'warning' : 'primary'} className={style.button} onClick={this.handleActivatePip}>{this.state.enabled ? 'DISABLE' : 'ENABLE'}</Button>
      </header>
    );
  }
}
