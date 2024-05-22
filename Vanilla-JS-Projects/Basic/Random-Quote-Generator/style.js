function random_num(){
    return Math.floor(Math.random()*1746)+1
}

async function loadCSV(file) {
    const response = await fetch(file);
    const data = await response.text();
    return data;
}

function parseCSV(csv) {
    const quotes = [];

    // Split CSV into rows
    const rows = csv.split('\n');

    // Parse each row
    for (let i = 1; i < rows.length; i++) { // Start from index 1 to skip header row
        const columns = rows[i].split(',');

        if (columns.length >= 3) { // Ensure there's at least 3 columns (including quote)
            const quote = columns[2].trim(); // Get the quote (third column, index 2)

            if (quote) {
                quotes.push(quote);
            }
        }
    }

    return quotes;
}

$(".btn").click(function(){
    loadCSV('./Data/insparation.csv')
        .then(csv => {
            const quotes = parseCSV(csv);

            if (quotes.length > 0) {
                const randomIndex = Math.floor(Math.random() * quotes.length);
                const randomQuote = quotes[randomIndex];

                $("h3").text(randomQuote);
            }
        })
        .catch(error => {
            console.error('Error loading CSV:', error);
        });
})