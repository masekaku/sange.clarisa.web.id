import { getVideoIdFromPath, loadVideoList } from './utils.js';

const video = document.getElementById('video');
const wrapper = document.getElementById('video-wrapper');
const tapIndicator = document.getElementById('tap-indicator');

let videos = [];
let videoId = getVideoIdFromPath();

// Portrait / Landscape layout
function updateLayout() {
  if (video.videoHeight > video.videoWidth) {
    video.classList.remove('w-full', 'h-auto');
    video.classList.add('h-full', 'w-auto');
  } else {
    video.classList.remove('h-full', 'w-auto');
    video.classList.add('w-full', 'h-auto');
  }
}

video.addEventListener('loadedmetadata', updateLayout);
window.addEventListener('resize', updateLayout);

// Double-tap play/pause (mobile)
let lastTap = 0;
wrapper.addEventListener('touchend', () => {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    if (video.paused) {
      video.play();
      tapIndicator.textContent = "▶️";
    } else {
      video.pause();
      tapIndicator.textContent = "⏸️";
    }
    tapIndicator.style.opacity = 1;
    setTimeout(() => { tapIndicator.style.opacity = 0; }, 600);
  }
  lastTap = currentTime;
});

// Load video list dari JSON dan set video sesuai ID
loadVideoList().then(data => {
  videos = data;

  const selectedVideo = videos.find(v => v.id === videoId);
  if (selectedVideo) {
    video.src = selectedVideo.url;
    video.load();
  }
});