# URL Scraper

This application is a simple URL scraper built using Node.js and Express.js. It extracts information from a given URL and displays it.

## Getting Started

Follow these instructions to run the application on your local machine.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/WebMasterLog.git

2. Navigate to the project directory:
   ```bash
   cd WebMasterLog
   cd Node-JS-Projects
   cd intermediate
   cd URL-scrapper

### Installation

To install the dependencies, run the following command in your terminal:

```bash
npm install

### Running the Application
Start the server by running the following command:

```bash
node app.js

The server will start running on [http://localhost:3000](http://localhost:3000).

### Usage

To scrape a URL, send a POST request to `http://localhost:3000/scrape` with a JSON body containing the URL you want to scrape.

Example using curl:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"url": "https://example.com"}' http://localhost:3000/scrape




