# university-enterance-tg-chatbot
Backend of Telegram bot for communication between the university and applicants


Diagram link
https://dbdiagram.io/d/6012d60e80d742080a383d3b

Postman link 
https://www.getpostman.com/collections/8e901a8e93bdb4270446


## DB migration
```DATABASE_URL``` enviroment variable or ```.env``` file with it (in project's root folder)  must be set.

* ```npx sequelize-cli db:create``` - creates database
* ```npx sequelize-cli db:drop``` - drops database
* ```npx sequelize-cli db:migrate``` - migrates all migration files (creates all tables in our case)
* ```npx sequelize-cli db:migrate:undo``` - undoes all migrations (drop all tables in our case)
* ```npx sequelize-cli db:seed:all``` - mocks tables with data
* ```npx sequelize-cli db:seed:undo``` - removes all mocked data


## Server setup and deployment

The first step is to define the list of environment variables

* ```DATABASE_URL```
* ```DIALOGFLOW_PROJECT_ID```
* ```PASS```
* ```REDIS_URL```

To connect DialogFlow, you need to place a file with ```APPLICATION CREDENTIALS``` in the project root.

Next, enter the environment variables:

* ```GOOGLE_APPLICATION_CREDENTIALS``` with a path to google application credentials file

If this option cannot be implemented through security. You can use another way:

Enter the environment variables:

* ```GOOGLE_APPLICATION_CREDENTIALS = google-credentials.json```
* ```GOOGLE_CREDENTIALS``` equal to the content of the Google application credentials file

Next, connect this build pack / script:

https://github.com/gerywahyunugraha/heroku-google-application-credentials-buildpack

He himself will generate a file with google application credentials in the root of the project

Next, you need to migrate the databases. Run the following commands:

* ```npx sequelize-cli db:create``` - creates database
* ```npx sequelize-cli db:migrate``` - migrates all migration files (creates all tables in our case)
* ```npx sequelize-cli db:seed:all``` - mocks tables with data

The server is started by sequential execution of commands:

* ```npm run postinstall``` - compiles TypeScript code to JavaScript
* ```npm run start``` - start server
