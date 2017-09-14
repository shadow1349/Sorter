angular.module('sorter')
//Implement my own infinite scrolling mechanism so that loading the 6000+ rows 
.directive('infinitescroll', [function() {
    return {
        restrict: 'A',
        link: function(scope, el, attr) {
            var element = el[0];
            //Bind the scroll event to the element that will have the scroll bar for a list
            el.bind('scroll', function() {
                if(element.scrollTop + element.offsetHeight > element.scrollHeight) {
                    //When we reach the bottom call the function in the directive
                    scope.$apply(attr.infinitescroll);
                }
            });
        }
    }
}])
.controller('IndexController', ['Sorter', '$filter', '$timeout', function(Sorter, $filter, $timeout) {
    var vm = this;
    //Initialize this so that the length of the array will be 0 and it will show the Loading message while the page is rendering
    vm.cars = [];
    
    /*
    vm.search = '';
    vm.keysearch = '';
    vm.keysearch2 = '';
    */

    vm.carsorder = false;
    vm.cars2order = false;
    vm.cars3order = false;

    vm.showlimit = 100;

    Sorter.GetAllItems().then(function(res) {
        //I split these out into 3 sepearte variables so that when I filter one list, other lists won't be affected
        vm.cars = res.data;
        //This will be filled by the map function in vm.search()
        vm.cars2 = [];
        //This will be filled by called a backend service
        vm.cars3 = [];
    });

    //This will add 20 elements to the list once it reaches the bottom
    vm.loadmore = function() {
        vm.showlimit += 20;
    }

    //This will reverse the order of the lists based off of the list number
    vm.reverseorder = function(orderfor) {
        if(orderfor == 1) {
            vm.carsorder = !vm.carsorder;
        }
        if(orderfor == 2) {
            vm.cars2order = !vm.cars2order;
        }
        if(orderfor == 3) {
            vm.cars3order = !vm.cars3order;
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