angular.module('taskManagerApp', [])
.controller('TaskController', function() {
    var vm = this;

    vm.tasks = [];
    vm.newTask = '';

    vm.addTask = function() {
        if (vm.newTask) {
            vm.tasks.push({ name: vm.newTask, editing: false });
            vm.newTask = '';
        }
    };

    vm.deleteTask = function(task) {
        var index = vm.tasks.indexOf(task);
        if (index !== -1) {
            vm.tasks.splice(index, 1);
        }
    };
});
