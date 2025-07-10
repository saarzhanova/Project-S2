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
            getRandomVideo();
            console.log(`Loaded video number: ${allVideos.length}`);
        }
    } catch (err) {
        console.error(err);
        videoSection.innerHTML = `<h3>Error: ${err.message}</h3>`;
    }
}

function getRandomVideo() {
    if (shownVideos.size === allVideos.length) {
        // randomButton.disabled = true;
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
            <iframe width="728" height="410"
                src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3&playsinline=1" 
                frameborder="0" allow="autoplay" allowfullscreen>
            </iframe>`;
}

// randomButton.addEventListener('click', getRandomVideo);

///////////////////SURVEY//////////////////////

const surveyJson = {
    showQuestionNumbers: "off",
    pages: [
        {
            name: "page1",
            elements: [
                { type: "slider", name: "width", title: "Perceived width of the street", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "crowdedness", title: "Perceived crowdedness", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "beauty", title: "Beauty", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "arousal", title: "Arousal", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "valence", title: "Valence", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "presence", title: "Sense of presence", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "willingness", title: "Willingness to walk there", min: 1, max: 7, labelCount: 7} ,
                { type: "slider", name: "restoration", title: "Perceived restoration", min: 1, max: 7, labelCount: 7}
            ]
        }
    ]
};

const API_URL = 'http://127.0.0.1:5000/save';


function completeSurvey(sender) {
    const results = sender.data;

    fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(results)
    })
        .then(() => {
            showToast();
            openNewSurvey();
        });
}

function openNewSurvey() {
    survey.clear();
    survey.render();
    getRandomVideo();
}

function showToast() {
    const toastEl = document.getElementById('toast');
    toastEl.classList.remove('hiding');

    const toast = new bootstrap.Toast(toastEl, { autohide: false });
    toast.show();

    setTimeout(() => {
        toastEl.classList.add('hiding');
    }, 3000);
}


const survey = new Survey.Model(surveyJson);
survey.applyTheme(SurveyTheme.PlainLight);
survey.showCompletedPage = false;
document.addEventListener("DOMContentLoaded", function() {
    survey.render(document.getElementById("surveyContainer"));
});

survey.onComplete.add(completeSurvey);


fetchVideos();