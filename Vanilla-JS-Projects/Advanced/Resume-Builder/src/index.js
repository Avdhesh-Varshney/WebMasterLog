let workExperienceCount = 1;
let educationCount = 1;
let skillsCount = 1;
let imageSrc = '';
function addMore(e) {
    const fieldsetId = e.target.parentNode.id;
    let fieldset = document.getElementById(fieldsetId);
    let newFieldset = document.createElement('div');
    let newFieldsetId;
    let newHtml = '';

    if (fieldsetId === 'workExperienceFieldset') {
        workExperienceCount++;
        newFieldsetId = `workExperience_${workExperienceCount}`;
        newHtml = `
            <div class="form-group">
                <label for="role_${workExperienceCount}">Your Role</label>
                <input type="text" class="form-control" id="role_${workExperienceCount}" placeholder="Enter your Role" required>
                <label for="company_${workExperienceCount}">Your Company</label>
                <input type="text" class="form-control" id="company_${workExperienceCount}" placeholder="Enter your Company" required>
                <label for="yr_${workExperienceCount}">Duration</label>
                <input type="text" class="form-control" id="yr_${workExperienceCount}" placeholder="Enter your Duration" required>
                <label for="info_${workExperienceCount}">More Info</label>
                <textarea rows="3" class="form-control" id="info_${workExperienceCount}" required></textarea>
            </div>
        `;
    } else if (fieldsetId === 'educationFieldset') {
        educationCount++;
        newFieldsetId = `education_${educationCount}`;
        newHtml = `
            <div class="form-group">
                <label for="year_${educationCount}">Year</label>
                <input type="number" class="form-control" id="year_${educationCount}" placeholder="Enter your Year" required>
                <label for="deg_${educationCount}">Your Degree</label>
                <input type="text" class="form-control" id="deg_${educationCount}" placeholder="Enter your Degree" required>
                <label for="gpa_${educationCount}">GPA</label>
                <input type="number" class="form-control" id="gpa_${educationCount}" placeholder="Enter your GPA" required>
                <label for="uni_${educationCount}">Your College/University</label>
                <input type="text" class="form-control" id="uni_${educationCount}" placeholder="Enter your College/University" required>
            </div>
        `;
    } else if (fieldsetId === 'skillsFieldset') {
        skillsCount++;
        newFieldsetId = `skills_${skillsCount}`;
        newHtml = `
            <div class="form-group">
                <label for="skill_${skillsCount}">Enter your Skill</label>
                <input type="text" class="form-control" id="skill_${skillsCount}" required>
                <label for="level_${skillsCount}">Skill Level</label>
                <input type="range" class="form-control" id="level_${skillsCount}" min="1" max="100" required>
            </div>
        `;
    }

    newFieldset.id = newFieldsetId;
    newFieldset.innerHTML = newHtml;
    fieldset.insertBefore(newFieldset, fieldset.lastElementChild);
}
function handleImageUpload(event) {
    const reader = new FileReader();
    reader.onload = function() {
        imageSrc = reader.result; // Store the image src
        console.log(imageSrc); // You can log it to see the result
    }
    reader.readAsDataURL(event.target.files[0]);
}

let resumeContent = '';

function generateResume(e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('role').value;
    const profil  =  document.getElementById('profile').value; 
    const workExperiences = [];
    const educations = [];
    const skills = [];

    const educationNodes = document.querySelectorAll("#educationFieldset .form-group");
    educationNodes.forEach((edu, i) => {
        const education = {
            year: document.querySelector(`#year_${i + 1}`).value,
            degree: document.querySelector(`#deg_${i + 1}`).value,
            gpa: document.querySelector(`#gpa_${i + 1}`).value,
            uni: document.querySelector(`#uni_${i + 1}`).value
        }

        educations.push(education);
    });
   
    const worknode = document.querySelectorAll("#workExperienceFieldset .form-group");
    worknode.forEach((wor,i) => {
        const work = {
            role : document.querySelector(`#role_${i+1}`).value,
            company : document.querySelector(`#company_${i+1}`).value,
            years : document.querySelector(`#yr_${i+1}`).value,
            mor : document.querySelector(`#info_${i+1}`).value
        }
        workExperiences.push(work);
    });

    const skillnode = document.querySelectorAll("#skillsFieldset .form-group");
    skillnode.forEach((sk,i) => {
        const skil = {
            skillname : document.querySelector(`#skill_${i+1}`).value,
            skilll : document.querySelector(`#level_${i+1}`).value
        }
        skills.push(skil);
    });

   

    resumeContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="resume.css" rel="stylesheet">
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;700&display=swap" rel="stylesheet">
    <title>${fullName}'s Resume</title>
</head>
<body>
<div class="containe">
    <div id="main">
        <div class="container" id="sidebar">
            <div style="display: flex; justify-content: center;">
            <img src="${imageSrc}" class="rounded" height="200px" width="150px" onchange="handleImageUpload(event)">
        </div>
        <div id="contactform">
            <div id="head">
                <div class="row">
                 <div class="col-sm-10">  <h5 >Contact</h5></div> 
                   <div class="col-sm-2"><i class="fas fa-user-circle" id="ico"></i></div> 
                    
                </div>
                <hr id="C">
                
            </div>
            <div id="info">
                <div id="phone" class="flex-item"><i class="fas fa-phone"> ${phone}</i></div>
                <div id="email" class="flex-item"><i class="fas fa-envelope"></i> ${email}</div>
                <a href="${linkedin}" target="_blank" id="linked" class="flex-item"><i class="fab fa-linkedin"> LinkedIn</i></a>
                <a href="${github}" target="_blank" id="git" class="flex-item"><i class="fab fa-github"> GitHub</i></a>
            </div>
        </div>
        <div id="educationform">
            <div id="head">
                <div class="row">
                    <div class="col-sm-10"><h5>Education</h5></div>
                    <div class="col-sm-2"><i class="fas fa-graduation-cap"></i></div>
                </div>
                <hr id="C">
            </div>
            <div id="eduinfo">`;
    educations.forEach(edu => {
        const education = `<div id="a">
                <div><h4>${edu.year}</h4></div>
                <p id="deg">${edu.degree}</p>
                <p id="clg">${edu.uni}</p>
                <p id="gpa">${edu.gpa}</p>
            </div>`;
        resumeContent += education;
    });
    
    resumeContent +=   `</div>
        </div>
        <div id="skillsform">
            <div id="head">
                <div class="row">
                    <div class="col-sm-10"><h5>Skills</h5></div>
                    <div class="col-sm-2"><i class="fas fa-tools"></i></div>
                </div>
                <hr id="C">
            </div>
            <div id="skillinfo">
                <ul>`;
      skills.forEach(sk => {
        const skill = `
        <li>
           <span>${sk.skillname}</span>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${sk.skilll.toString()}%;"></div> <!-- Adjust width based on the percentage -->
            </div>
        </li>
        `;
        resumeContent += skill ; 
      });
      resumeContent += `
                </ul>
            </div>
        </div></div>
        <div id="bar">
            <div id="namebar">
            <hr id="A">
            <div id="name">${fullName}</div>
            <div id="R">
            <hr  id="B">
            <div id="role">${role}</div>
            <hr id="B">
        </div>
            <hr id="A">

        </div>
        <div id="profile">
        <div id="head">
            <div class="row">
             <div class="col-sm-10">  <h5 >PROFRSSIONAL PROFILE</h5></div> 
               <div class="col-sm-2"><i class="fas fa-user-circle" id="ico"></i></div> 
                
            </div>
            <hr id="C">
            
        </div>
        <p id="profiletext">${profil}</p>
    </div>
    <div id="work">
        <div id="head">
            <div class="row">
             <div class="col-sm-10">  <h5 >WORK EXPERIENCE</h5></div> 
               <div class="col-sm-2"><i class="fas fa-briefcase" id="ico"></i>
               </div> 
                
            </div>
            <hr id="C">
            
        </div>`;
    workExperiences.forEach(wor => {
        const work = `
           <div class="b">
           <h3>${wor.years}</h3>
           <p id="rol">${wor.role}</p>
           <p id="com">${wor.company}</p>
           <p>${wor.mor}</p>
           </div>
        `;
        resumeContent+=work;
    });   
       resumeContent+=
    `</div>
            <div class="vertical-line"></div>
        </div>
    </div>
    </div>

 <script src="./index.js"></script>
</body>
</html>
`;

    const newWindow = window.open('');
    newWindow.document.write(resumeContent);
}

