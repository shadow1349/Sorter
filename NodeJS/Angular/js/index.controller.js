angular.module('sorter')
.controller('IndexController', ['Sorter', '$filter', '$timeout', function(Sorter, $filter, $timeout) {
    var vm = this;
    //Initialize this so that the length of the array will be 0 and it will show the Loading message while the page is rendering
    vm.cars = [];
    
    vm.search = '';
    vm.keysearch = '';
    vm.keysearch2 = '';

    Sorter.GetAllItems().then(function(res) {
        //I split these out into 3 sepearte variables so that when I filter one list, other lists won't be affected
        vm.cars = res.data;
        //This will be filled by the map function in vm.search()
        vm.cars2 = [];
        //This will be filled by called a backend service
        vm.cars3 = [];
    });

    vm.load = function() {
        var last = vm.cars[vm.cars.length - 1];
        for(var i = 1; i <= vm.cars.length - 1; i++) {
            vm.cars.push(last + 1);
        }
    }


    vm.search1 = function(query) {
        vm.cars2 = vm.cars.Search(query);
    }

    vm.search2 = function(query) {
        Sorter.Search(query).then(function(res) {
            console.log(res.data);
            vm.cars3 = res.data;
        });
    }

    Array.prototype.Search = function(query) {
        return this.filter(function(car) {
            return car.Make_Name.toLowerCase().includes(query.toLowerCase());
        });
    }

}]);