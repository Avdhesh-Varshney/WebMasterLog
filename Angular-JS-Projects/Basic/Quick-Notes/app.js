// AngularJS
angular.module('QuickNotesApp', [])
    .controller('NotesController', function ($scope) {
        // Initialize notes array
        $scope.notes = [];

        // Load notes from local storage when the page loads
        if (localStorage.getItem('notes')) {
            $scope.notes = JSON.parse(localStorage.getItem('notes'));
        }
        
        // Function to add a new note
        $scope.addNote = function () {
            if ($scope.newNote.title && $scope.newNote.body) {
                $scope.notes.push({ 
                    title: $scope.newNote.title,
                    body: $scope.newNote.body
                });
                $scope.newNote.title = '';
                $scope.newNote.body = '';
                // Save notes to local storage
                localStorage.setItem('notes', JSON.stringify($scope.notes));
            }
        };
        
        // Function to remove a note
        $scope.removeNote = function (index) {
            $scope.notes.splice(index, 1);
            // Save notes to local storage
            localStorage.setItem('notes', JSON.stringify($scope.notes));
        };
        
        
    });
