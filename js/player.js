import { getVideoIdFromPath, loadVideoList } from './utils.js';

const video = document.getElementById('video');
const wrapper = document.getElementById('video-wrapper');
const tapIndicator = document.getElementById('tap-indicator');
const qualitySelect = document.getElementById('quality-select');

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

// Load video list dari JSON
loadVideoList().then(data => {
  videos = data;

  // Populate <source> tags
  videos.forEach(v => {
    const source = document.createElement('source');
    source.src = v.url;
    source.type = 'video/mp4';
    source.setAttribute('data-id', v.id);
    video.appendChild(source);

    // Populate quality selector
    const option = document.createElement('option');
    option.value = v.id;
    option.textContent = `Video ${v.id}`;
    qualitySelect.appendChild(option);
  });

  // Set video berdasarkan ID
  const selectedVideo = videos.find(v => v.id === videoId);
  if (selectedVideo) {
    video.src = selectedVideo.url;
    video.load();
  }
});

// Ganti video berdasarkan select
qualitySelect.addEventListener('change', () => {
  const selectedId = parseInt(qualitySelect.value);
  const selectedVideo = videos.find(v => v.id === selectedId);
  if (selectedVideo) {
    const currentTime = video.currentTime;
    const isPaused = video.paused;
    video.src = selectedVideo.url;
    video.currentTime = currentTime;
    if (!isPaused) video.play();
  }
});