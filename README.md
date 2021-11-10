# Quizzone
By Alessandro Chiarelli, developed for the course "Web Software Development"

## About the project
This project was developed as the second project for the "Web Software Development" course. The project is built with Deno, a runtime for JavaScript. The application also has some HTML written in the .eta files.

## Getting started
The application is deployed to this link: https://project-issues.herokuapp.com/projects. If you want to run the server locally, you'll need to download deno and a PostgreSQL database.

In order to make the application work, you'll need to create these tables in your database.
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password CHAR(60)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(256) NOT NULL,
  question_text TEXT NOT NULL
);

CREATE TABLE question_answer_options (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id),
  option_text TEXT NOT NULL,
  is_correct BOOLEAN DEFAULT false
);

CREATE TABLE question_answers (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  question_id INTEGER REFERENCES questions(id),
  question_answer_option_id INTEGER REFERENCES question_answer_options(id),
  correct BOOLEAN DEFAULT false
);

CREATE UNIQUE INDEX ON users((lower(email)));
```

Now, clone the repo and set the database configuration in the database/database.js file and start the server with the command:
```bash
deno run --allow-net --allow-env --watch --unstable --allow-read run-locally.js 
```

The server will be running on localhost:7777; you can change the port if you want.

## Structure of the project

The project has the following structure:

- app.js - it is the main file of the server which is in charge of wrapping all the components together
- run-locally.js - it is the file used to launch the app locally
- README.md - the file you are currently reading
- Procfile - the procfile used for Heroku deployment
- runtime.txt - the file that specifies the deno version of the project
- routes - it is the folder that is in charge of handling the requests to server. There are one file and two directories:
  - apis - it is the folder that is in charge of handling requests made to the api. It only contains one file, apiController.js that deals with such requests.
  - controllers - it is the folder that is in charge of responding to the different requests made to the web app. It contains the following files:
    - loginController.js - it is in charge of handling the login process for users
    - mainController.js - it is in charge of handling requests to the root "/" path
    - optionsController.js - it is in charge of handling requests dealing with answer options
    - questionsController.js - it is in charge of handling requests dealing with question
    - quizController.js - it is in charge of handling the requests made to the "/quiz/" path
    - registrationController.js - it is in charge of letting people sign up into the web app
    - statisticsController.js - it is in charge of handling the statistics
  - routes.js - it is the file that builds the router for our application and makes use of all the controllers
- databse - it is the directory that holds the database.js file which contains the database configuration. Please, put your configuration here if you want to run the app locally
- middlewares - it is the folder that contains the middlewares used by this application. It contains the following files/middlewares:
  - authMiddleware.js - used for authentication and access control
  - errorMiddleware.js - used to log all errors as they come
  - renderMiddleware.js - used to render all .eta files to the user
  - serveStaticMiddleware.js - used to serve static files
- services - it is the directory that is in charge of making queries to the database by making use of the file in the database directory. It contains:
  - answerService.js - service file for answers
  - optionsService.js - service file for question options
  - questionsService.js - service file for questions
  - statisticsService.js - service file for retrieving user's statistics
  - userService.js - service file for users
- views - it is a directory that contains the files used for rendering the HTML pages of the web app. It contains:
  - layouts - it is a directory that contains a single file named layout.eta, used to implement the partials in the other .eta files
  - partials - it is a directory that contains a single file named navbar.eta, used to add a navbar to all html pages
  - addQuestionForm.eta - files for adding, deleting and showing the user's questions
  - correct.eta - file used in case of correct answer to a quiz
  - incorrect.eta - file used in case of incorrect answer to a quiz
  - login.eta - file used to show the login page
  - main.eta - file used for the root path
  - registration.eta - file used for the sign up page
  - singleQuestion.eta - file used to show a single question to the user and the question's options, as well as adding options
  - statistics.eta - file used to show user's statistics

## Creator
Alessandro Chiarelli - alessandro.chiarelli@aalto.fi - mail@alessandrochiarelli.com