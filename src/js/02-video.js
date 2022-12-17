import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const STORAGE_KEY = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const savedTime = JSON.parse(localStorage.getItem(STORAGE_KEY));

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(currentTime) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTime));
}

function resumeVideo() {
  if (savedTime === null) {
    return;
  }
  player.setCurrentTime(savedTime.seconds);
}

resumeVideo();
