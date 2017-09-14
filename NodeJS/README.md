## NodeJS Angular Sorter ##
This project requires npm and bower in order to run 

To install dependencies run

    npm install
    bower install

Once dependencies have been installed run the project with

    npm start
Once the project is running it will be available on port 8080

----------


If you are having trouble with installing the bower_components comment out the Dependencies scripts/links and un-comment the Fallback Dependencies in index.html


----------

## Project Overview ##
For this project I am using the https://vpic.nhtsa.dot.gov/api/ vehicle api
This project uses 3 different mechanisms in order to display and search data.

 1. Display all data using an infinite scroll mechanism with an Angular filter to perform the search
 2. Prompt the user to start typing in a search bar to display data using an Angular controller method which will pull back all results like what they searched for
 3. Prompt the user to start typing in a search bar to display data pulled from an HTTP call

All of these method rely on the angular orderBy filter in the ng-repeat method to order them from A - Z. I have added additional functionality to reverse the order so the user can display the list from Z - A.


----------


## Method Behind The Madness##

I chose to use NodeJS with AngularJS because they both parse JSON objects natively so I don't have to convert to JSON, which would take additional resource and take longer.

 - I also used Express with NodeJS for additional ease of use passing data to and from the front end using the express body-parser and express-session so that I could store data in a user's session so that I can reuse that data without having to re-query a REST API.
	 - I did additional error checking when using the stored session variable in case something happened to the session. This way if the session data gets lost we can still re-query the data and still display it to the user.

I also chose to use Angular Material because the framework works with Angular and provides additional ease of use like configuring a theme (app colors) and components like tabs and styled lists.

I chose to use the Font Awesome icons rather than the Angular Material icons because they offer a much larger variety of icons and I needed an icon that shows lists A-Z and Z-A.