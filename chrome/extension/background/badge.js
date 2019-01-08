chrome.storage.local.get('playing', (obj) => {
  let playing = obj.playing;
  if (playing) {
    playing = JSON.parse(playing);
    // chrome.browserAction.setBadgeText({ text: len.toString() });
  } else {
    // Initial
    // chrome.browserAction.setBadgeText({ text: '1' });
  }
});
