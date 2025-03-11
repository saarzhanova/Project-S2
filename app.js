const videoSection = document.getElementById('videoSection')

fetch('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1000&playlistId=UUlODDXeUIz1-FaKyN8dsNrA&key=AIzaSyA70eaZK2Ds326pSPYYG4TsxXy0CIyeZuo')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        let videos = data.items;
        console.log(videos);
        let i = 1

        videos.forEach(video => {
            videoSection.innerHTML += "<h3>" + i + ". " + video.snippet.title + "</h3>"
            i += 1

        });
    }).catch(err => {
        console.log(err);
        videoSection.innerHTML = "<h3>Error: $(err)</h3>"
    });
