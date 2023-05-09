# MyJob ( Backend )

## Description

MyJob is a simple web application for managing job postings.
It is built with Node.js, Express, and MongoDB using the Mongoose ORM.

## Installation

 - Install dependencies: npm install

 - Set up environment variables by creating a .env
   file in the root directory of the project
   and adding the following values:

        PORT=3000
        MONGODB_URI=mongodb://localhost/myjob

   Replace 3000 with the port you want to run the app
   on and mongodb://localhost/myjob with the connection
   string for your MongoDB instance.

 -  Initialize the database by running: npm run initdb

        Start the server: npm start

## Usage

Once the server is running, 
you can access the app by navigating to http://localhost:3000
(or the port you specified in your .env file) in your web browser.
You can create, view, update, and delete job postings
using the web interface.

## Testing

You can run the automated tests using the command: __npm test__

## Credits

This project was created by Frankie as part of a coding bootcamp.
Feel free to use it as a starting point for your own projects!

