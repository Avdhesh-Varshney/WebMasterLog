
![Harify](https://camo.githubusercontent.com/dd5e3080a7adc2ead8f86cbbd6577cee0a38439c0ebf195021ce41587b0a405f/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313430302f312a633459675258595161794f5657785633376f757272772e706e67)
<div align="center"><h1>Hairify</h1> <h2>one solution for all your hair problems</h2>
</div>
<table align="center">
    <thead align="center">
        <tr border: 1px;>
            <td><b>🌟 Stars</b></td>
            <td><b>🍴 Forks</b></td>
            <td><b>🐛 Issues</b></td>
            <td><b>🔔 Open PRs</b></td>
            <td><b>🔕 Close PRs</b></td>
        </tr>
     </thead>
    <tbody>
         <tr>
            <td><img alt="Stars" src="https://img.shields.io/github/stars/algovengers/Hairify?style=flat&logo=github"/></td>
             <td><img alt="Forks" src="https://img.shields.io/github/forks/algovengers/Hairify?style=flat&logo=github"/></td>
            <td><img alt="Issues" src="https://img.shields.io/github/issues/algovengers/Hairify?style=flat&logo=github"/></td>
            <td><img alt="Open Pull Requests" src="https://img.shields.io/github/issues-pr/algovengers/Hairify?style=flat&logo=github"/></td>
           <td><img alt="Close Pull Requests" src="https://img.shields.io/github/issues-pr-closed/algovengers/Hairify?style=flat&color=critical&logo=github"/></td>
        </tr>
    </tbody>
</table>
</div>
<h3> Featured In</h3>

<table>

   <tr>
      <th>Event Name</th>
      <th>Event Description</th>
   </tr>
   <tr>
      <td>GirlScript Summer of Code 2024</td>
      <td>GirlScript Summer of Code is a three-month-long Open Source Program conducted every summer by GirlScript Foundation. It is an initiative to bring more beginners to Open-Source Software Development.</td>
   </tr>

</table>

#### Deploy Link : [Hairify](https://hairify-ai.vercel.app/)
#### Youtube Link : [Hairify Youtube Explanation](https://www.youtube.com/watch?v=XnA6hmyCEUk)


#### Devfolio Link : [Hairify Hackathon Project Link](https://devfolio.co/projects/hairify-2a4f)


Hairify is an innovative **AI**-powered chat assistant dedicated to guiding individuals in improving their hair health. The Hairify website boasts a user-friendly UI tailored to help users find solutions for their hair health concerns.




## Features

- AI chat assistant to give solutions to your hair problems
- analyze the picture of your scalp condition and detect hairfall stage
- give you suggestion to tackle your hair loss buy suggesting medication

  

## Tech

#### System Design
Hairify application runs on 2 server
- Frontend
- Backend

![des](https://github.com/algovengers/MindMate/assets/101347977/83c3f205-23d7-411d-8c26-91fa93adc1b4)

#### Tech stack
- Frontend
  - Next JS
  - Tailwind 
- Backend
  - Django
  - Gemini (Gen AI)
  - SSE
  - Langchain
- Tools
  - Vercel
  - Render
  - Postgress
  - Cloudinary
  - Langchain

## Website Flow

  - At first we head to landing page. (https://hairify-ai.vercel.app/)
  - Then we go to login -> signup. We create a new accout. After that, we login with it. (https://hairify-ai.vercel.app/login) (https://hairify-ai.vercel.app/signup)
  - After, we can chat with AI for hair and scalp related issues. (https://hairify-ai.vercel.app/chat)
  - Also, from landing page we can go to Image Report generation. We need to upload the image of our scalp/hairline. It will generate a report. (https://hairify-ai.vercel.app/report)
  - In Dashboard, we can see previous report histories that we have generated before. (https://hairify-ai.vercel.app/dashboard)

## How to setup the project locally 

  #### Frontend
    - Open Terminal
    - Naviagate to your directory and navigate to the frontend folder
    - Install Node if not present in your machine
    - Do `npm install`
    - Create a .env file and copy paste the content of .env.sample
    - Do `npm run dev` to start the project

  #### Backend
    - Create a Cloudinary Account and get the creditnals
    - Host Postgres locally or on Cloud, you can also use a docker Image
    - Create a Gemini Account and get the API Key
    - Install Python and Pip if not present
    - Do `pip install virtualenv`
    - Navigate to backend folder
    - Setup virtualenv in your backend folder by typing `virtualenv env` in your terminal
    - Activate Virtualenv by doing `.\env\Scripts\activate` (for windows) or `source env/bin/activate` (for linux)
    - Do `pip install -r requirements.txt`
    - Create a .env file and add all the variables of .env.sample file with relevant keys
    - Do `cd hairify` in backend
    - Finally do `python manage.py runserver ` to start the server


## Website Preview

#### HomePage 
![83dae728-5f7f-48c7-b2f4-0dccaacfec55](https://github.com/algovengers/MindMate/assets/101347977/ba239651-947c-40ee-a1b9-af174d02551c)
#### Login
![5e8cb463-c116-4eff-bc96-7a52eb0a1a72](https://github.com/algovengers/MindMate/assets/101347977/a7bcc395-f9c5-46ec-91ed-f9d99393501c)
#### Signup
![Screenshot from 2024-03-30 11-29-31](https://github.com/algovengers/Hairify/assets/92659226/d2c52ef4-ac2a-4906-b39d-09f45ec04b79)
#### AI Chat
![Screenshot from 2024-03-30 11-31-08](https://github.com/algovengers/Hairify/assets/92659226/026c05a4-b95f-4007-a74d-ac1ba9c6661e)
#### Report History Details
![Screenshot from 2024-03-30 11-30-48](https://github.com/algovengers/Hairify/assets/92659226/12b797f9-edbf-4a52-8f44-413c20770bae)
#### Report Generate
![Screenshot from 2024-03-30 11-29-53](https://github.com/algovengers/Hairify/assets/92659226/6e8b7fef-d6cd-40b1-bc86-550b0e9d8b1b)
#### Report Histories
![Screenshot from 2024-03-30 11-30-44](https://github.com/algovengers/Hairify/assets/92659226/c94ff965-8f56-4c42-a562-5857a18de359)







