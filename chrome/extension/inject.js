import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import './inject.css';

class InjectApp extends Component {
  constructor(props) {
    super(props);
    this.state = { isEnabled: false, resizeCallbacks: [], iconContainers: [], loaded: false };
  }

  componentDidMount() {
    if ('pictureInPictureEnabled' in document) {
      const videos = document.querySelectorAll('video');
      if (videos.length) {
        this.setState({
          loaded: true
        }, () => {
          this.bootstrap();
        });
      }
    } else {
      console.error(`Browser doesn't support PIP mode!`);
    }

    let resizeId = null;
    let self = this;

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      this.toggleIconState(request.pip_enabled);
    });

    chrome.storage.local.get(['pip_enabled'], (obj) => {
      const enabled = !!obj.pip_enabled;
      this.toggleIconState(enabled);
    });

    // On resize reset the icon position 
    window.addEventListener('resize', () => {
      clearTimeout(resizeId);
      resizeId = setTimeout(() => {
        self.state.resizeCallbacks.forEach((callback) => {
          callback();
        });
      }, 500);
    });

    // check for video element, if it is injected dynamically
    document.addEventListener('DOMNodeInserted', () => {
      const videos = document.querySelectorAll('video');
      if (!this.state.loaded && videos.length) {
        this.setState({
          loaded: true
        }, () => {
          this.bootstrap();
          chrome.storage.local.get(['pip_enabled'], (obj) => {
            const enabled = !!obj.pip_enabled;
            this.toggleIconState(enabled);
          });
        });
      }
    });
  }

  toggleIconState = (visibility) => {
    setTimeout(() => {
      this.state.iconContainers.forEach((icon) => {
        if (visibility) {
          icon.style.visibility = 'visible';
        } else {
          icon.style.visibility = 'hidden';
        }
      });
    }, 0);
  }

  bootstrap = () => {
    const videos = document.querySelectorAll('video');
    let callbacks = [];
    let iconContainers = [];
    videos.forEach((video) => {
      const bndRect = video.getBoundingClientRect();
      if (bndRect.height >= 100 && bndRect.width >= 100) {
        const flotContainer = document.createElement('button');
        const flotIcon = document.createElement('i');
        const containerStyle = `
          display: none; 
          position: absolute; 
          color: #6441a4de; 
          z-index: 999999999;
          padding: 0;
          top: ${bndRect.top + 10}px; 
          left: ${bndRect.right - 50}px;
          cursor: pointer;
          background: #fff;
          border-radius: 8px;`
        flotIcon.className = 'icono-support';
        flotContainer.style.cssText = containerStyle;
        flotContainer.addEventListener('click', () => {
          this.setState({ isEnabled: !this.state.isEnabled }, () => {
            if(this.state.isEnabled) {
              flotContainer.style.color = 'rgba(232, 48, 48, 0.87)';
            } else {
              flotContainer.style.color = '#6441a4de';
            }
          });
          this.togglePip(video);
        });
        flotContainer.addEventListener('mouseover', () => {
          flotContainer.style.display = 'block';
        });
        video.addEventListener('mouseover', () => {
          flotContainer.style.display = 'block';
        });
        video.addEventListener('mouseout', (event) => {
            if (event.x > bndRect.x + bndRect.width || event.x < bndRect.x || event.y < bndRect.y || event.y > bndRect.y + bndRect.height) {
              flotContainer.style.display = 'none';
            }
        });
        callbacks.push(() => {
          const bndRect = video.getBoundingClientRect();
          flotContainer.style.top = `${bndRect.top + 10}px`;
          flotContainer.style.left = `${bndRect.right - 50}px`;
        })
        iconContainers.push(flotContainer);
        this.togglePipStatus(video, flotContainer);
        flotContainer.appendChild(flotIcon);
        document.body.appendChild(flotContainer);
      }
    });
    this.setState({resizeCallbacks: callbacks, iconContainers});
  };

  onPipWindowResize = () => {
    // TODO
  };

  bindPipEventListener = (video) => {
    let pipWindow;

    video.addEventListener('enterpictureinpicture', function(event) {
      pipWindow = event.pictureInPictureWindow;
      pipWindow.addEventListener('resize', onPipWindowResize);
    });

    video.addEventListener('leavepictureinpicture', function(event) {
      pipWindow.removeEventListener('resize', onPipWindowResize);
    });
  };

  togglePip = async (video) => {
    try {
      if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture();
      } else {
        await document.exitPictureInPicture();
      }
    } catch(error) {
      console.error(`Argh! ${error}`);
    }
  };

  togglePipStatus = (video, btn) => {
    video.addEventListener('loadedmetadata', () => {
      btn.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
    });
    video.addEventListener('emptied', () => {
      btn.disabled = (video.readyState === 0) || !document.pictureInPictureEnabled || video.disablePictureInPicture;
    });
  };

  render() {
    return (
      <div>
        <Dock
          position="right"
          dimMode="transparent"
          defaultSize={0.4}
          isVisible={this.state.isVisible}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
            }}
            frameBorder={0}
            allowTransparency="true"
            src={chrome.extension.getURL(`inject.html?protocol=${location.protocol}`)}
          />
        </Dock>
      </div>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'inject-react-example';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});
