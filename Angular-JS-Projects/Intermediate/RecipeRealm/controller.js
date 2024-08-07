angular.module('RecipeRealm')
.controller('MainController', function($scope) {
    $scope.title = "RecipeRealm";
})
.controller('HomeController', function($scope, RecipeService) {
    $scope.recipes = [];

    RecipeService.getRecipes().then(function(recipes) {
        $scope.recipes = recipes;
    });
})
.controller('RecipeController', function($scope, $routeParams, RecipeService) {
    var recipeId = $routeParams.id;
    $scope.recipe = {};

    RecipeService.getRecipeById(recipeId).then(function(recipe) {
        $scope.recipe = recipe;
    });
})
.controller('AddRecipeController', function($scope, RecipeService) {
    $scope.recipe = {};

    $scope.addRecipe = function() {
        RecipeService.addRecipe($scope.recipe).then(function() {
            $scope.recipe = {};
            alert('Recipe added successfully!');
        });
    };
});
