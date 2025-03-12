const videoSection = document.getElementById('videoSection');
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
        console.log(`Loaded video number: ${allVideos.length}`);
        }
    } catch (err) {
        console.error(err);
        videoSection.innerHTML = `<h3>Error: ${err.message}</h3>`;
    }
}

fetchVideos();