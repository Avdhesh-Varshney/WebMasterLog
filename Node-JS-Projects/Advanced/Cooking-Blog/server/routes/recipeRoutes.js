const express=require('express');
const router =express.Router();
const recipeController = require('../controllers/recipeController');

/**
 * App Routes
 */
router.get('/',recipeController.homepage);
router.get('/recipe/:id',recipeController.exploreRecipe);
router.get('/categories',recipeController.exploreCategories);
router.get('/categories/:id',recipeController.exploreCategoriesById);
//so want to go to the recipe page with the project id then query it
//and show the detailed view

router.post('/search', recipeController.searchRecipe);

//for explorelatest we are creating another route
router.get('/explore-latest', recipeController.exploreLatest);

//for exploreRandom recipe again create another route
router.get('/explore-random',recipeController.exploreRandom);

//submit recipe 
router.get('/submit-recipe', recipeController.submitRecipe);

//In order to post the recipe we need to create a post router too
router.post('/submit-recipe', recipeController.submitRecipeOnPost);

// About and Contact routes
router.get('/about', recipeController.about);
router.get('/contact', recipeController.contact);
router.post('/contact', recipeController.submitContactForm);

module.exports = router;