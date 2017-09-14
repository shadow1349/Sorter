angular.module('sorter')
//Implement my own infinite scrolling mechanism so that loading the 6000+ rows 
.directive('infinitescroll', [function() {
    return {
        restrict: 'A',
        link: function(scope, el, attr) {
            var element = el[0];
            //Bind the scroll event to the element that will have the scroll bar for a list
            el.bind('scroll', function() {
                //Add 100 to load more entries before the user hits the bottom of the scroll
                if(element.scrollTop + element.offsetHeight + 100 > element.scrollHeight) {
                    //When we reach the bottom call the function in the directive
                    scope.$apply(attr.infinitescroll);
                }
            });
        }
    }
}])
.directive('sticky', ['$mdSticky', function($mdSticky) {
    return {
        restrict: 'E',
        link: function(scope, el) {
            $mdSticky(scope, el);
        }
    }
}])
.directive('smoothscroll', [function(){
    return {
        restrict: 'EA',
        template: '<md-button class="md-fab"><md-icon class="fa icon" md-font-icon="fa-angle-up"></md-icon></md-button>',
        link: function(scope, el) {
            var scrollObject = {};
            var scrollElement = document.getElementById('top');
                  window.onscroll = getScrollPosition;
            
            scrollElement.addEventListener("click", scrollToTop, false);
      
                  function getScrollPosition(){
              scrollObject = {
                 x: window.pageXOffset,
                 y: window.pageYOffset
              }
              if(scrollObject.y > 300) {
                  scrollElement.classList.add("visible");
              } else {
                  scrollElement.classList.remove("visible");
              }
              }
            
            function scrollToTop() {
              var scrollDuration = 500;
              var scrollStep = -window.scrollY / (scrollDuration / 15);
              console.log(scrollStep);
                  
              var scrollInterval = setInterval(function(){  
                if (window.scrollY != 0) {
                  window.scrollBy(0, scrollStep);
                } else {
                  clearInterval(scrollInterval); 
                }
              },15);		
            }
            
          }
    }
}])
.controller('IndexController', ['Sorter', '$window', function(Sorter, $window) {
    var vm = this;
    //Initialize this so that the length of the array will be 0 and it will show the Loading message while the page is rendering
    vm.cars = [];

    //These will sort the 3 different lists
    vm.carsorder = false;
    vm.cars2order = false;
    vm.cars3order = false;

    //Show enough 
    vm.showlimit = 200;

    Sorter.GetAllItems().then(function(res) {
        //I split these out into 3 sepearte variables so that when I filter one list, other lists won't be affected
        vm.cars = res.data;
        //This will be filled by the map function in vm.search()
        vm.cars2 = [];
        //This will be filled by called a backend service
        vm.cars3 = [];
    });

    //This will add 100 elements to the list once it reaches the bottom
    vm.loadmore = function() {
        vm.showlimit += 100;
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

    //This is called for searching the second list
    vm.search1 = function(query) {
        if(query == null || query == '') {
            //Display nothing if there is nothing to query
            vm.cars2 = [];
        }
        else if(query.toLowerCase() == 'all') {
            //we set vm.cars2 equal to the full list
            vm.cars2 = vm.cars;
        }
        else {
            vm.cars2 = vm.cars.filter(function(car) {
                return car.Make_Name.toLowerCase().includes(query.toLowerCase());
            });
        }
    }

    //This calls the backend service to filter throught the lists
    vm.search2 = function(query) {
        if(query == null || query == '') {
            vm.cars3 = [];
        }
        else if(query.toLowerCase() == 'all') {
            //We will send a blank string to pull all results
            sendquery('');
        }
        else {
            sendquery(query);
        }
    }

    vm.scrolltop = function() {
        console.log('to the top');
        $window.scrollTo(0,0);
    }

    //Split this to a seperate function because we can reuse the function and make our code a little shorter
    function sendquery(query) {
        Sorter.Search(query).then(function(res) {
            vm.cars3 = res.data;
        });
    }

}]);