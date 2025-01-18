  const audio = document.getElementById('background-music');
  const startMusicButton = document.getElementById('start-music');
  
  startMusicButton.addEventListener('click', () => {
    audio.play().catch(error => {
      console.log('Audio playback failed:', error);
    });
    startMusicButton.disabled = true; 
    startMusicButton.textContent = 'Music Playing...';
  });