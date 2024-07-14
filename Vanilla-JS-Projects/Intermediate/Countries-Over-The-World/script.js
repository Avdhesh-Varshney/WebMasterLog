document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const regionFilter = document.getElementById('regionFilter');
    const countriesList = document.getElementById('countries-list');
    let allCountries = [];
  
    // Fetch countries data from REST API
    const fetchCountries = async () => {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const countries = await res.json();
      
      // Sort countries alphabetically
      countries.sort((a, b) => {
        if (a.name.common < b.name.common) return -1;
        if (a.name.common > b.name.common) return 1;
        return 0;
      });
  
      allCountries = countries;
      displayCountries(countries);
    };
  
    // Display countries in the DOM
    const displayCountries = (countries) => {
      countriesList.innerHTML = '';
      countries.forEach(country => {
        const countryCard = document.createElement('div');
        countryCard.classList.add('card');
        countryCard.innerHTML = `
          <img src="${country.flags.svg}" alt="${country.name.common}">
          <div class="card-content">
            <h2 class="card-title">${country.name.common}</h2>
            <p class="card-text"><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
            <p class="card-text"><strong>Region:</strong> ${country.region}</p>
            <p class="card-text"><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <a href="https://en.wikipedia.org/wiki/${country.name.common}" target="_blank" class="button">Learn More</a>
          </div>
        `;
        countriesList.appendChild(countryCard);
      });
    };
  
    // Filter countries based on search input and region filter
    const filterCountries = () => {
      const searchValue = searchInput.value.toLowerCase();
      const regionValue = regionFilter.value;
      const filteredCountries = allCountries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = regionValue === 'all' || country.region === regionValue;
        return matchesSearch && matchesRegion;
      });
      displayCountries(filteredCountries);
    };
  
    searchInput.addEventListener('input', filterCountries);
    regionFilter.addEventListener('change', filterCountries);
  
    fetchCountries();
  });
  