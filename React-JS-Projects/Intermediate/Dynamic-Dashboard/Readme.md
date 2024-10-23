# Dynamic React Dashboard with JSON Server

## Project Overview

This project is a dynamic dashboard built using React, where you can manage widgets within different categories. The dashboard allows users to add, delete, and search for widgets within categories, making it interactive and customizable. The UI is responsive, with a carousel feature that activates when the number of widgets in a row exceeds 5. The project uses a JSON server to serve data and `shadcn/ui` components for responsive design.

## Features

- **Dynamic Widget Management**: Add, delete, and search for widgets within categories.
- **Global State Management**: Uses `ValueContext` and `ValueState` to store and manage JSON data globally.
- **Responsive Design**: The dashboard layout adapts to different screen sizes, with a carousel feature when widgets exceed 5 in a row.
- **Customizable JSON Data**: The dashboard is built from a JSON file containing categories and widgets.

## Getting Started

### Prerequisites

- npm installed on your machine.

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repository-link.git
    cd your-repository-folder
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

### Running the Application

1. **Start the JSON Server**:

    Open a terminal and run the following command:
    ```bash
    npx json-server data.json --port 3000
    ```

    This command will start a JSON server on `http://localhost:3000` that serves the data from `data.json`.

2. **Run the React Dashboard**:

    Open another terminal and run:
    ```bash
    npm run dev
    ```

    This command will start the React development server. The dashboard will be available at `http://localhost:5173`.

### Project Structure

- **`ValueContext.js`**: 
    - Contains the context created using `createContext`.
    - This is used to share the global state across components.

- **`ValueState.jsx`**: 
    - Manages the global state using `useState`.
    - Provides `globalData` and `setGlobalData` to the entire app through the `ValueContext.Provider`.

- **`data.json`**:
    - Contains the JSON structure used to render the dashboard dynamically. 
    - Categories and widgets are defined here, and changes made via the UI are reflected in this data.

- **UI Components**:
    - Built using `shadcn/ui` components for responsiveness and a clean user interface.
    - The dashboard adjusts its layout based on screen size and activates a carousel when widgets in a row exceed 5.

### Features Implementation

- **Widget Management**: Users can add a new widget by clicking "+Add Widget", entering the widget name and text, and assigning it to a category.
- **Delete Widget**: Each widget has a cross icon (`X`) that allows the user to remove it from the category.
- **Responsive Design**: The use of `shadcn/ui` ensures the dashboard is responsive. A carousel is used to manage overflow when more than 5 widgets are present in a row.

### Initial Assignment Description

The initial assignment was to create a dashboard where widgets are dynamically rendered based on a JSON structure. The task involved implementing features such as adding/removing widgets, making the dashboard responsive, and allowing users to manage widgets within categories.


## Authority

This project is Frontend assignment under the AccuKnox Pvt. Ltd. .

## Contact

For any questions or feedback, please contact janvichoudhary116@gmail.com.

---

This `README.md` provides a comprehensive guide to understanding, setting up, and running your React dashboard project.
