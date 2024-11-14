document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
    });
});

function startPlan(plan) {
    const planMapping = {
        'arm': 'exercises/arm-exercises.html',
        'leg': 'exercises/leg-exercises.html',
        'shoulder': 'exercises/shoulder-exercises.html',
        'back': 'exercises/back-exercises.html'
    };

    if (planMapping[plan]) {
        window.location.href = planMapping[plan];
    } else {
        alert('Plan not found');
    }
}

function startExercise(exercise, duration) {
    const exerciseInfo = document.getElementById(`${exercise}-info`);
    exerciseInfo.innerHTML = `Exercise started! Duration: ${duration} seconds`;

    // Start countdown timer
    let timer = duration;
    const countdown = setInterval(() => {
        timer--;
        exerciseInfo.innerHTML = `Time remaining: ${timer} seconds`;

        if (timer <= 0) {
            clearInterval(countdown);
            exerciseInfo.innerHTML = `Exercise completed!`;
            
            // Logic to proceed to the next exercise
            proceedToNextExercise();
        }
    }, 1000);
}

function proceedToNextExercise() {
    // Logic to navigate to the next exercise or complete the plan
    // For demo purposes, redirecting to a new page after completing an exercise
    window.location.href = 'next-exercise.html'; // Replace with your logic
}
