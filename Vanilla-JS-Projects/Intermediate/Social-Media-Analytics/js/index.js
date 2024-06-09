var ctx = document.getElementById('screen-time-chart').getContext('2d');
var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Instagram', 'WhatsApp', 'Twitter', 'YouTube'],
        datasets: [{
            label: 'Screen Time (minutes)',
            data: [0, 0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

function addData() {
    var instaTime = document.getElementById('insta-time').value;
    var whatsappTime = document.getElementById('whatsapp-time').value;
    var twitterTime = document.getElementById('twitter-time').value;
    var youtubeTime = document.getElementById('youtube-time').value;

    if (instaTime && whatsappTime && twitterTime && youtubeTime) {
        chart.data.datasets[0].data = [instaTime, whatsappTime, twitterTime, youtubeTime];
        chart.update();
        
        document.getElementById('screen-time-form').reset();
    } else {
        alert('Please fill in all fields.');
    }
}