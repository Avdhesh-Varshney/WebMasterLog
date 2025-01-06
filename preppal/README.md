# PrepPal

**PrepPal** is an AI-driven web application designed to help users prepare for interviews effectively by providing feedback on their responses. It features question prompts, feedback on answers, and suggestions for improvement, making it a comprehensive tool for interview preparation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
---

### Features

- **Question Prompts:** Generate interview questions based on topics or difficulty level.
- **Real-time Feedback:** Get instant feedback on your responses, including suggestions for improvement.
- **Collapsible Feedback View:** User-friendly interface with collapsible sections for feedback per question.
- **Session Storage:** Each interview session is stored, allowing users to review past feedback and track improvement.

### Technologies Used

- **Frontend:** React, Next.js, Tailwind CSS
- **Backend:** Node.js, Drizzle ORM, PostgreSql
- **Other:** Lucide React Icons for UI icons, Expo for mobile compatibility (if applicable)

---

### Getting Started

#### Prerequisites

- Node.js (version 16 or 18 is recommended)
- npm or yarn (package manager)


### Usage

1. *Create an Interview Session:** Start a new interview by selecting a topic or difficulty.
2. **Answer Questions:** Respond to questions, and receive real-time feedback.
3. **Review Feedback:** Access detailed feedback on each answer, including suggestions for improvement.
4. **Start a New Session:** Return to the dashboard and start another session.

---

### Project Structure

```bash
.
├── components         # Reusable UI components (buttons, collapsibles)
├── pages              # Next.js pages (dashboard, feedback, etc.)
├── utils              # Utility functions (db connection, schema, etc.)
├── public             # Static assets
├── styles             # Global styles, Tailwind CSS configuration
├── .env.local         # Environment variables
└── README.md          # Project documentation
```
