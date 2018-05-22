# Alaska

ALASKA steganalysis contest's webapp.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Node.js](https://nodejs.org/en/) and [npm](https://docs.npmjs.com/) should be installed on your machine.

You also need a SQL SGBD, like [MySQL](https://www.mysql.com/fr/).
If you want to use another SGBD, take a look at the ones supported by [Sequelize](http://docs.sequelizejs.com/).

### Installing

#### Install the dependencies.

```
npm install
```

#### Configure the environnement variables

Rename **.env.example** at the project's root to **.env**, and fill it with your values.

Server's port
```
PORT=
```

Database's config
```
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=mysql
```
*If you are using another SGBD, you must take a look at [sequelize's doc](http://sequelize.readthedocs.io/en/1.7.0/docs/usage/#dialects) to set the right dialect*

JWT's config
```
JWT_SECRET=yourSecretKey
JWT_ALGORITHM=HS512
JWT_DURATION=
```
*For more informations, take a look at the [JWT's doc](https://www.npmjs.com/package/jsonwebtoken)*
*Duration in milliseconds*

Email's config
```
EMAIL_HOST=
EMAIL_PORT=
EMAIL_SENDER=yourEmailAddress
EMAIL_USER=
EMAIL_PASS=
```

Contest stages's config
```
STAGE_1_START=
STAGE_1_END=
STAGE_1_FILE=answers/stage_1.txt

STAGE_2_START=
STAGE_2_END=
STAGE_2_FILE=answers/stage_2.txt
```
*START / END are timestamps*
*STAGE_1 must happen before STAGE_2*

The time that each competitor has to wait between each submission.
```
SUBMISSION_WAITING_TIME=
```
*in milliseconds*

If *true*, submissions are blocked
```
BLOCK_SUBMISSION=
```

#### Create answers files

Create **STAGE_1_FILE** and **STAGE_2_FILE**, and put your answers as binary strings in it.

#### Database

First, create the tables in the database by running
```
./node_modules/.bin/sequelize db:migrate
```

Then, you can fill it with tests data (only if you want it)
```
./node_modules/.bin/sequelize db:seed:all
```

### Build and run

You can find all the scripts in **package.json**.

But if you just want to build the webapp and run the server
```
npm start
```

### Testing

```
npm test
```

## Authors

* **Antoine PRUDHOMME**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
