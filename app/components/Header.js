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
      document.querySelector('.dode-anim').classList.add('disabled');
      document.querySelector('.status-text').innerHTML = 'Active';
    } else {
      document.querySelector('.dode-anim').classList.remove('disabled');
      document.querySelector('.status-text').innerHTML = 'Inactive';
    }
  };

  notifyUpdate = () => {
    const enabled = this.state.enabled;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { pip_enabled: enabled }, function (response) {
          // showResults(response.results);
      });
  });
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
