------------------
myFlix Application
------------------

--------------------
Project Description:
--------------------
The myFlix Application is an interactive digital encyclopedia for movie fans, providing detailed information about various movies, including directors, actors, ratings, release year, ratings, a description of the film, and the genres it fits into.  Designed to be user-friendly and informative, this app allows users to search and filter movies by title.

--------------
Prerequisites:
--------------
JavaScript ES6
Node.js v20.11.0
React v18.2.0
Parcel v2.12.0

-------------------------------------
Other dependencies from package.json:
-------------------------------------
"dependencies": {
      "axios": "^1.6.7",
      "bootstrap": "^5.3.3",
      "date-fns": "^3.3.1",
      "prop-types": "^15.8.1",
      "proptypes": "^1.1.0",
      "react": "^18.2.0",
      "react-bootstrap": "^2.10.1",
      "react-dom": "^18.2.0",
      "react-router": "^6.22.2",
      "react-router-dom": "^6.22.2"
   },
   "devDependencies": {
      "@parcel/reporter-dev-server": "^2.12.0",
      "@parcel/transformer-sass": "^2.12.0",
      "buffer": "^6.0.3",
      "gh-pages": "^6.1.1",
      "parcel": "^2.12.0",
      "process": "^0.11.10"
   }

git repo:  https://github.com/stix2you/myFlix-client

To set up dev environment, install node.js, install react, react-dom, and parcel:
npm init
npom install -g parcel
npm install --save react react-dom

To start a development server with parcel:
parcel ./src/index.html 
or set this to your "start" script in package.json

Using the myFlix API, hosted on Heroku at https://stix2you-myflix-5cbcd3c20372.herokuapp.com

