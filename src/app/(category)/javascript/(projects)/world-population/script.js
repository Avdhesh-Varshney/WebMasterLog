function calculatePopulation() {
    const startingPopulation = parseInt(document.getElementById("starting-population").value);
    const birthRate = parseFloat(document.getElementById("births-per-year").value) / 100;
    const deathRate = parseFloat(document.getElementById("deaths-per-year").value) / 100;
    const years = parseInt(document.getElementById("years").value);

    let population = startingPopulation;

    for (let i = 0; i < years; i++) {
        const births = birthRate * population;
        const deaths = deathRate * population;
        population += births - deaths;
    }

    document.getElementById("result").textContent =
        "Projected population after " +
        years +
        " years: " +
        population.toLocaleString();
}