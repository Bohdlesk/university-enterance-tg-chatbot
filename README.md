# university-enterance-tg-chatbot
Backend of Telegram bot for communication between the university and applicants


Diagram link
https://dbdiagram.io/d/6012d60e80d742080a383d3b

Postman link 
https://www.getpostman.com/collections/8e901a8e93bdb4270446


## DB migration
```DATABASE_URL``` environment variable or ```.env``` file with it (in project's root folder)  must be set.

* ```npx sequelize-cli db:create``` - creates database
* ```npx sequelize-cli db:drop``` - drops database
* ```npx sequelize-cli db:migrate``` - migrates all migration files (creates all tables in our case)
* ```npx sequelize-cli db:migrate:undo``` - undoes all migrations (drop all tables in our case)
* ```npx sequelize-cli db:seed:all``` - mocks tables with data
* ```npx sequelize-cli db:seed:undo``` - removes all mocked data


## Server setup and deployment

1. The first step is to define the list of environment variables

* ```DATABASE_URL```
* ```DIALOGFLOW_PROJECT_ID```
* ```PASS``` with passphrase for API authentication and authorization
* ```REDIS_URL```
* ```GOOGLE_APPLICATION_CREDENTIALS``` with a path to google application credentials file

2. Create JSON file with google application credentials.
If you deploy the project to heroku you need to do the following steps:
* Connect this build pack / script https://github.com/gerywahyunugraha/heroku-google-application-credentials-buildpack to the heroku app 
This script will generate a file ```google-credentials.json``` with google application credentials in the root of the project
* Create environment var key ```GOOGLE_CREDENTIALS``` and paste the content of google application credentials JSON file as is.
* Set environment var key ```GOOGLE_APPLICATION_CREDENTIALS``` to ```google-credentials.json```


3. Next, you need to migrate the databases. Run the following commands:

* ```npx sequelize-cli db:create``` - creates database
* ```npx sequelize-cli db:migrate``` - migrates all migration files (creates all tables in our case)
* ```npx sequelize-cli db:seed:all``` - mocks tables with initial data

4. The server is started by sequential execution of commands:

* ```npm run postinstall``` - compiles TypeScript code to JavaScript
* ```npm run start``` - start server
