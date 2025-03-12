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
    const video = allVideos[randomIndex];

    videoSection.innerHTML = `<h3>${video.snippet.title}</h3>
            <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}" 
                frameborder="0" allowfullscreen>
            </iframe>`;
}

randomButton.addEventListener('click', getRandomVideo);

fetchVideos();