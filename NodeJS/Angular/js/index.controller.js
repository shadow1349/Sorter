angular.module('sorter')
.filter('sort',function(){
    function sort (a, b) {
        if (a > b) { return 1; }
        if (a < b) { return -1; }
        
        return 0;
    }
    
    return function(arrInput, prop) {
        var arr = arrInput.sort(function(a, b) {
            return sort(+a[prop], +b[prop]);
        });
        return arr;
    }
})
.controller('IndexController', ['Sorter', '$filter', function(Sorter, $filter) {
    var vm = this;
    vm.cars = [];
    vm.search = '';
    Sorter.GetAllItems().then(function(res) {

        vm.cars = res.data.Results;//$filter('orderBy')(res.data.Results, 'Make_Name', false);
        console.log(vm.cars);
        
    });
}]);