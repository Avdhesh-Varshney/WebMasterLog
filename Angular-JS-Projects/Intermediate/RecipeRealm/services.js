angular.module('RecipeRealm')
.service('RecipeService', function($q) {
    var db = firebase.firestore();

    this.getRecipes = function() {
        var deferred = $q.defer();
        db.collection('recipes').get().then(function(querySnapshot) {
            var recipes = [];
            querySnapshot.forEach(function(doc) {
                recipes.push({ id: doc.id, data: doc.data() });
            });
            deferred.resolve(recipes);
        });
        return deferred.promise;
    };

    this.getRecipeById = function(id) {
        var deferred = $q.defer();
        db.collection('recipes').doc(id).get().then(function(doc) {
            if (doc.exists) {
                deferred.resolve(doc.data());
            } else {
                deferred.reject('Recipe not found');
            }
        });
        return deferred.promise;
    };

    this.addRecipe = function(recipe) {
        var deferred = $q.defer();
        db.collection('recipes').add(recipe).then(function() {
            deferred.resolve();
        });
        return deferred.promise;
    };
});
