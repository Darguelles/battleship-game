## Battleship

Welcome to my mini implementation of the popular game Battleship. To run the application, ensure you have all the dependences downloaded in your current PC. Once installed, you have three options:

-**_Start development server_**
If you want to check the code and make some refactor. Just type and run `npm start`

-**_Build your minified JS ready for production and deploy_**
Only if you are sure all the test pass and want to play Battleship anywhere!
*  To tun test : ` npm test`
*  To build : ` npm build`

-_**Last, but not least, the last option. Docker!**_ If you dont wanna install and configure npm in your own machine, it's ok. Here you will found two scripts, so you must run in the next order:
* To create the container, cd into the root folder oproject and `. create-docker-container.sh`
* Once finished, lets run our application! `. start-docker-container.sh`


**Tech stack**

* Webpack
* React
* Materialize CSS
* ESLint
* Babel
* SASS
* Jest / Enzyme

If you have some doubts about the tools used, please, go to the `doc/arch/***` files to see the Architecture design records of this application.


Enjoy it!!
