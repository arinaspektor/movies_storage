# movies_storage

My tech assignment: web application for storing movie's information.
___
### Requirements
  - Add movie
  - Delete movie
  - Show information about movie
  - Show list of movies sorted by alphabetical order
  - Search movie by title
  - Search movie by actor's name
  - Import movies from txt file
___
### Tech
* SPA on ReactJS
* RESTful API on NodeJS (Express.js)
* Database - MongoDB using MongooseODM
* API testing tools: Mocha, Chai, SinonJS and SuperTest
___
### Installation

**After cloning the repo follow next steps.**

Install all server's and client's dependencies one by one.

```sh
$ cd movies_storage
$ npm install
$ npm install --prefix client
```
API uses config package to store port value and database link.
```sh
$ mkdir config
$ touch config/default.json
```
Then you need to put next data to default.json file.
```json
{
  "port": 5000,
  "mongoURI": "<yourMongoDBHostURI>"
}
```
Replace <yourMongoDBHostURI> with link to your database host (unimportant local or cloud one).
If you want to use another port you would have to change proxy value in client/package.json as well.

Now app is ready for usage.

### Usage

Run API tests
```sh
$ npm test
```

Start web application

```sh
$ npm run dev
```
App will launch at http://localhost:3000/. 



