document.addEventListener('keydown', playDrum);
document.querySelectorAll('.drum').forEach(drum => drum.addEventListener('click', playDrum));

function playDrum(event) {
    const key = event.type === 'keydown' ? event.keyCode : event.target.closest('.drum').getAttribute('data-key');
    const drum = document.querySelector(`.drum[data-key="${key}"]`);
    const audio = new Audio(`sounds/${key}.mp3`);
    
    if (!drum) return;

    drum.classList.add('playing');
    audio.play();

    audio.addEventListener('ended', () => {
        drum.classList.remove('playing');
    });
}
