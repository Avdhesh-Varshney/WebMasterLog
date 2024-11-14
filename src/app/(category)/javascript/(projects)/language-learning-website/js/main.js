document.addEventListener('DOMContentLoaded', function() {
    const progressText = document.getElementById('progress-text');
    const quizForm = document.getElementById('quiz-form');
    const quizResult = document.getElementById('quiz-result');

    function initializeProgress() {
        if (localStorage.getItem('lessonsCompleted') === null) {
            localStorage.setItem('lessonsCompleted', JSON.stringify([]));
        }
        if (localStorage.getItem('quizzesCompleted') === null) {
            localStorage.setItem('quizzesCompleted', 0);
        }
    }

    function updateProgress() {
        const lessonsCompleted = JSON.parse(localStorage.getItem('lessonsCompleted')) || [];
        const quizzesCompleted = localStorage.getItem('quizzesCompleted') || 0;
        if (progressText) {
            progressText.innerText = `You have completed ${lessonsCompleted.length} lessons and ${quizzesCompleted} quizzes.`;
        }
    }

    function submitQuiz(event) {
        event.preventDefault();
        const formData = new FormData(quizForm);

        const answers = {
            question1: 'Hola',
            question2: 'Adiós',
            question3: 'Por favor'
        };

        let score = 0;
        for (const [question, correctAnswer] of Object.entries(answers)) {
            if (formData.get(question) === correctAnswer) {
                score += 1;
            }
        }

        const totalQuestions = Object.keys(answers).length;
        const resultText = `You answered ${score} out of ${totalQuestions} questions correctly.`;

        quizResult.innerText = resultText;

        // Update progress only if quiz is completed
        if (score === totalQuestions) {
            let quizzesCompleted = parseInt(localStorage.getItem('quizzesCompleted') || 0, 10);
            quizzesCompleted += 1;
            localStorage.setItem('quizzesCompleted', quizzesCompleted);
        }
        updateProgress();
    }

    initializeProgress();

    if (quizForm) {
        quizForm.addEventListener('submit', submitQuiz);
    }

    updateProgress();
});
