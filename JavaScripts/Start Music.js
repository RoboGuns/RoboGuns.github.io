document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('background-music');
  const startMusicButton = document.getElementById('start-music');

  startMusicButton.addEventListener('click', () => {
    audio.play().catch(error => {
      console.error('Playback failed:', error);
    });
    startMusicButton.disabled = true;
    startMusicButton.textContent = 'Music Playing...';
  });

  audio.addEventListener('error', () => {
    console.error('Audio load error:', audio.error);
  });
});