let resumeContent = '';

function generateResume() {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const phone = document.getElementById('phone').value;
    const summary = document.getElementById('summary').value;
    const experience = document.getElementById('experience').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;

    resumeContent = `
         <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="./src/resume.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <title>${fullName} Resume</title>
</head>
<body>
    <div class="container">
        <div id="sidebar">
            <div id="name">${fullName}</div>
            <a href="${linkedin}" target="_blank" id="linked" class="icon"><i class="fab fa-linkedin"></i></a>
            <a href="${github}" target="_blank" id="git" class="icon"><i class="fab fa-github"></i></a>
            <div id="Email" class="icon"><i class="far fa-envelope"> ${email}</i></div>
            <div id="PhoneNum" class="icon"><i class="fas fa-phone"> ${phone}</i></div>
            <div class="section" id="Skills">
              <div class="heading" style="font-weight: bolder; font-style: italic;">Skills</div>
                <ul id="skillsList">
                    ${skills.split('\n').map(skill => `<li>${skill.trim()}</li>`).join('')}
                </ul>
            </div>
        </div>
        <div id="main">
            <div class="section" id="profile">
                <div class="section-heading">Professional Profile</div>
                <div class="section-content">
                    <p>${experience}</p>
                </div>
            </div>
            <div class="section" id="exp">
                <div class="section-heading">Experience</div>
                <div class="section-content">
                    <p>${summary}</p>
                </div>
            </div>
            <div class="section" id="Education">
                <div class="section-heading">Education</div>
                <div class="section-content">
                    <ul>
                      ${education.split('\n').map(edu => `<li>${edu.trim()}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div style="display: flex; justify-content: center;">
        <button class="btn btn-primary" onclick="printResume()">Download</button>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.2/html2pdf.bundle.min.js"></script>

    <script src="./src/index.js"></script>
  
</body>
</html>
    `;

    const newWindow = window.open('');
    newWindow.document.write(resumeContent);
}

function printResume() {
    const element = document.querySelector('.container');
    const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Ensure the content is fully loaded before creating the PDF
    setTimeout(() => {
        html2pdf().from(element).set(opt).save();
    }, 1000);
}
