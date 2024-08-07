angular.module('RecipeRealm', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeController'
        })
        .when('/recipe/:id', {
            templateUrl: 'partials/recipe.html',
            controller: 'RecipeController'
        })
        .when('/add-recipe', {
            templateUrl: 'partials/add-recipe.html',
            controller: 'AddRecipeController'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.run(function($rootScope) {
    var firebaseConfig = {
        apiKey: "YOUR_API_KEY",
        authDomain: "YOUR_AUTH_DOMAIN",
        projectId: "YOUR_PROJECT_ID",
        storageBucket: "YOUR_STORAGE_BUCKET",
        messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
        appId: "YOUR_APP_ID"
    };
    firebase.initializeApp(firebaseConfig);
});
