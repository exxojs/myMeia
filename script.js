const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img'),
    volumeSlider = document.getElementById('volume-slider'); // Add volume slider reference

const music = new Audio();

const songs = [
    {
        path: '1.mp3',
        displayName: 'Eroplanong Papel',
        cover: 'epDA.jpg',
        artist: 'December Avenue',
    },
    {
        path: '2.mp3',
        displayName: 'Shouldn´t be',
        cover: 'sb.jpg',
        artist: 'Luke Chiang',
    },
    {
        path: '3.mp3',
        displayName: 'Favorite Vice',
        cover: 'fv.jpg',
        artist: 'Arthur Nery',
    },
    {
        path: '4.mp3',
        displayName: 'Life Puzzle',
        cover: 'lf.jpg',
        artist: 'Arthur Nery',
    },
    {
        path: '5.mp3',
        displayName: 'Nothing',
        cover: 'n.jpg',
        artist: 'Bruno Major',
    }
];

let musicIndex = 0;
let isPlaying = false;

// Function to update the volume based on the slider's value
function updateVolume() {
    music.volume = volumeSlider.value / 100; // Convert slider value to a decimal between 0 and 1
}

// Add an event listener to the volume slider to update the volume on change
volumeSlider.addEventListener('input', updateVolume);

// Existing functions
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// Event listeners
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Initialize music
loadMusic(songs[musicIndex]);
updateVolume(); // Set initial volume based on slider value