// import required essentials
const http = require('http');
const express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser')
// import `items` from `routes` folder 
const itemsRouter = require('./routes/books');

// create new app
const app = express();
// parse requests of content-type: application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.json());
// use it before all route definitions
// allowing below URL to access these APIs end-points
// you can replace this URL(http://localhost:8100) with your
// application URL from where you are calling these APIs
// app.use(cors({origin: 'http://localhost:8100'}));

/* this '/items' URL will have two end-points:
→ localhost:3000/items/ (this returns array of objects)
→ localhost:3000/items/:id (this returns single object)
*/
app.use('/items', itemsRouter);
app.set('view engine', 'ejs');
// default URL to API
app.use('/', function(req, res) {
    // res.send('node-ex-api works :-)');
    res.render('pages/about', { page: 'Book Store'})
});
const port = process.env.PORT || 3000

// listen for request
app.listen(port, () =>
  console.log(`Server running on port ${port}`)
)

module.exports = app