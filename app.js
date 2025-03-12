const videoSection = document.getElementById('videoSection');
const loadingMessage = document.getElementById('loadingMessage');
const randomButton = document.getElementById('randomButton');

const apiKey = 'AIzaSyA70eaZK2Ds326pSPYYG4TsxXy0CIyeZuo';
const playlistId = 'UUlODDXeUIz1-FaKyN8dsNrA';
const maxResults = 50;
let nextPageToken = null;
let i = 1;

let allVideos = [];
let shownVideos = new Set();
async function fetchVideos(pageToken = '') {
    const url = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}&pageToken=${pageToken}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        let videos = data.items

        if (videos) {
            allVideos.push(...videos);
        }

        let isNextPageExists = data.nextPageToken
        if (isNextPageExists) {
            fetchVideos(data.nextPageToken);
        } else {
            loadingMessage.style.display = 'none';
            randomButton.disabled = false;
            console.log(`Loaded video number: ${allVideos.length}`);
        }
    } catch (err) {
        console.error(err);
        videoSection.innerHTML = `<h3>Error: ${err.message}</h3>`;
    }
}

function getRandomVideo() {
    if (shownVideos.size === allVideos.length) {
        randomButton.disabled = true;
        videoSection.innerHTML = "<h3>All videos were shown!</h3>";
        return;
    }

    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * allVideos.length);
    } while (shownVideos.has(randomIndex));

    shownVideos.add(randomIndex);
    const videoId = allVideos[randomIndex].snippet.resourceId.videoId;

    videoSection.innerHTML = `
            <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&playsinline=1" 
                frameborder="0" allow="autoplay" allowfullscreen>
            </iframe>`;
}

randomButton.addEventListener('click', getRandomVideo);

fetchVideos();