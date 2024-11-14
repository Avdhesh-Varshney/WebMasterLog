//logic for searching a random recipe by the selected search criteria
async function searchRandomRecipe() {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/random.php`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API call was successful and contains meals
        if (data.meals) {
            searchByNameFromCard(data.meals[0].strMeal);
        } else {
            console.error('No recipes found for the specified category.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Added this function to handle the search based on the selected option
function performSearch() {
    const searchBy = document.getElementById('searchBy').value;

    switch (searchBy) {
        case 'name':
            searchByName();
            break;
        case 'categories':
            searchByCategory();
            break;
        case 'cuisine':
            searchByCuisine();
            break;
        case 'mainIngredient':
            searchBymainIngredient();
            break;
        default:
            console.error('Invalid search option');
            break;
    }
}

// Added this function to make an API call for a given name
async function searchRecipeByName(name) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API call was successful and contains meals
        if (data.meals) {
            return data.meals;
        } else {
            return null; // No matching recipes found
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Added this function to handle the search by name
async function searchByName() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();

    if (searchTerm !== '') {
        // Split the search term into words
        const searchWords = searchTerm.split(' ');

        // Create an array to store the results
        const results = [];

        // Make API calls for each word
        for (const word of searchWords) {
            const recipes = await searchRecipeByName(word);
            if (recipes) {
                results.push(...recipes);
            }
        }

        // Display the results
        displayResults(results);
    }
}

// Modify this function to display the results
function displayResults(results) {

    const resultContainer = document.getElementById('resultContainer');
    const relatedContainer = document.getElementById('relatedContainer');
    resultContainer.innerHTML = ''; // Clear previous results
    relatedContainer.innerHTML = ''; // Clear previous related results
    document.getElementById('related-recipes').style.display = 'block';

    if (results.length === 0) {
        resultContainer.innerHTML = '<p>No matching recipes found.</p>';
        return;
    }

    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive comparison

    // Filter the results based on the user's search term
    const filteredResults = results
        .filter((recipe, index, self) => self.findIndex(r => r.strMeal.toLowerCase() === recipe.strMeal.toLowerCase()) === index)
        .filter(recipe => recipe.strMeal.toLowerCase().includes(searchTerm));


    // Display only the filtered results
    filteredResults.forEach(recipe => {
        const category = recipe.strCategory;
        const cuisine = recipe.strArea;
        const thumbnail = recipe.strMealThumb;
        const recipeVideo = recipe.strYoutube;
        const ingredients = getIngredientsList(recipe);
        const instructions = recipe.strInstructions;

        const resultHTML = `
            <div class="recipe">
                <img src="${thumbnail}" alt="${recipe.strMeal}">
                <h2>${recipe.strMeal}</h2>
                <p>Category: ${category}</p>
                <p>Cuisine: ${cuisine}</p>
                <p>Recipe Video: <a href="${recipeVideo}" target="_blank">Watch Here</a></p>
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
                <h3>Procedure:</h3>
                <p>${instructions}</p>
            </div>
        `;

        resultContainer.innerHTML += resultHTML;
    });

    if (filteredResults.length === 0) {
        resultContainer.innerHTML = '<p>No matching recipes found.</p>';
    }
    // Display all results in the related section (before filtering)
    results.forEach(recipe => {
        const category = recipe.strCategory;
        const cuisine = recipe.strArea;
        const thumbnail = recipe.strMealThumb;

        const relatedCardHTML = `
        <div class="related-card" onclick="searchByNameFromCard('${recipe.strMeal}')">
            <img src="${thumbnail}" alt="${recipe.strMeal}">
            <h4>${recipe.strMeal}</h4>
            <p>Category: ${category}</p>
            <p>Cuisine: ${cuisine}</p>
        </div>
    `;

        relatedContainer.innerHTML += relatedCardHTML;
    });
}



// Added this function to get the ingredients as an ordered list
function getIngredientsList(recipe) {
    const ingredients = [];

    for (let i = 1; i <= 30; i++) { // Assuming a maximum of 30 ingredients
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];

        if (ingredient && measure) {
            ingredients.push(`<li>${measure} ${ingredient}</li>`);
        } else {
            break; // Stop when there are no more ingredients
        }
    }

    return ingredients.join('');
}

// Added this function to search by category
async function searchByCategory() {
    const searchInput = document.getElementById('searchInput');
    const category = searchInput.value.trim();
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API call was successful and contains meals
        if (data.meals) {
            displayCategoryResults(data.meals, category);
        } else {
            console.error('No recipes found for the specified category.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Added this function to search by cuisine
async function searchByCuisine() {
    const searchInput = document.getElementById('searchInput');
    const category = searchInput.value.trim();
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API call was successful and contains meals
        if (data.meals) {
            displayCategoryResults(data.meals, category);
        } else {
            console.error('No recipes found for the specified category.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Added this function to search by main Ingredient
async function searchBymainIngredient() {
    const searchInput = document.getElementById('searchInput');
    const category = searchInput.value.trim();
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Check if the API call was successful and contains meals
        if (data.meals) {
            displayCategoryResults(data.meals, category);
        } else {
            console.error('No recipes found for the specified category.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


// Modify this function to display the category results
function displayCategoryResults(categoryResults, category) {
    const resultContainer = document.getElementById('resultContainer');
    const relatedContainer = document.getElementById('relatedContainer');
    const relatedSection = document.querySelector('.related-recipes');

    // Clear previous results and related recipes
    resultContainer.innerHTML = '';
    relatedContainer.innerHTML = '';

    // Show the related recipes section
    relatedSection.style.display = 'block';

    // Display the category results as cards
    categoryResults.forEach(recipe => {
        const thumbnail = recipe.strMealThumb;
        const name = recipe.strMeal;

        const categoryCardHTML = `
            <div class="category-card" onclick="searchByNameFromCard('${name}')">
                <img src="${thumbnail}" alt="${name}">
                <h3>${name}</h3>
            </div>
        `;

        resultContainer.innerHTML += categoryCardHTML;
    });
}

// Added this function to search by name when clicking a related recipe card
function searchByNameFromCard(name) {
    searchInput.value = name;
    searchByName();
}
