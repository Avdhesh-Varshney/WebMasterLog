const videoContainer = document.querySelector(".video-container");

let api_key = "AIzaSyB7jEwn4eidY9AeWNjvPo3pzikOpx8PEj0";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";

// Function to format the published date
const formatPublishedDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const timeDifference = Math.abs(now - date);
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    
    if (daysDifference === 0) {
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        return hoursDifference <= 1 ? "1 hour ago" : `${hoursDifference} hours ago`;
    } else if (daysDifference === 1) {
        return "1 day ago";
    } else if (daysDifference < 7) {
        return `${daysDifference} days ago`;
    } else {
        const weeksDifference = Math.floor(daysDifference / 7);
        return weeksDifference <= 1 ? "1 week ago" : `${weeksDifference} weeks ago`;
    }
};

fetch(video_http + new URLSearchParams({ 
    key: api_key,
    part: 'snippet,statistics',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
})).then(res => res.json())
    .then(data => {
        data.items.forEach(item => {
            getChannelIcon(item);
        });
    })
    .catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    })).then(res => res.json())
         .then(data => {
            video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
            makeVideoCard(video_data);
         });
};

const makeVideoCard = (data) => {
    const viewCount = data.statistics?.viewCount || "N/A";
    const publishedAt = data.snippet?.publishedAt || "N/A";
    videoContainer.innerHTML += `
        <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
            <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
            <div class="content">
                <img src="${data.channelThumbnail}" class="channel-icon" alt="">
                <div class="info">
                    <h4 class="title">${data.snippet.title}</h4>
                    <p class="channel-name">${data.snippet.channelTitle}</p>
                    <p class="views">${viewCount} views • ${formatPublishedDate(publishedAt)}</p>
                </div>
            </div>
        </div>
    `;
};

// Search logic
const searchInput = document.querySelector(".search-bar");
const searchBtn = document.querySelector(".search-btn");

let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener("click", () => {
    if (searchInput.value.length) {
        location.href = searchLink + searchInput.value;
    }
});
