// import required essentials
const express = require('express');
// create new router
const router = express.Router();
// create a JSON data array
let data = [
    { id: 1, title: 'The Village by the sea', order: 1, author: 'Anita Desai',cost:3000, createdOn: new Date() },
    { id: 2, title: 'Sherlock Homes',  order: 1, author:'Arthur Conan Doyle',cost:2500, createdOn: new Date() },
    { id: 3, title: 'Harry Potter',  order: 1, author: 'J. K. Rowling',cost:4000, createdOn: new Date() }
];

// HTTP methods ↓↓ starts here.

// READ
// this api end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
   
    
   
});
router.get('/books', function (req, res) {
    // res.status(200).json(data);
   
    
    res.render('books/index', { page: 'Available Books', data:data })
});

// READ
// this api end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/create', function (req, res) {
    // get itemIds from data array
    let itemIds = data.map(item => item.id);
    // get orderNums from data array
    let orderNums = data.map(item => item.order);

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    // create new order number (basically +1 of last item object)
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

   
    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        title: req.body.title, // value of `title` get from POST req
        order: newOrderNum, // generated in above step
        author: req.body.author, // default value is set to false
        cost: req.body.cost,
        createdOn: new Date() // new date object
    };

    // push new item object to data array of items
    data.push(newItem);
     console.log(req.body);
     console.log(newItem);
    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    // res.status(201).json(newItem);
    // let data = newItem;
    // res.render('books/index', { page: 'Available Books', data:data })
    backURL=req.header('Referer') || '/';
    // do your thang
    res.redirect(backURL);
});

// UPDATE
// this api end-point update an existing item object
// for that we get `id` and `title` from api end-point of item to update

 // id: 3, title: 'Harry Potter',  order: 1, author: 'J. K. Rowling',cost:4000, createdOn: new Date() },

router.put('/:id', function (req, res) {
    // get item object match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    // check if item found
    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, 
            order: req.body.order, 
            author: req.body.author, 
            cost: req.body.cost,
        };

        // find index of found object from array of data
        let targetIndex = data.indexOf(found);
        console.log(updated)
        // replace object from data list with `updated` object
        data.splice(targetIndex, 1, updated);

        // return with status 204
        // success status response code 204 indicates
        // that the request has succeeded
        let obj ={'status': 1}
        res.status(200).json(obj);

    } else {
        res.sendStatus(404);
    }
});

// DELETE
// this api end-point delete an existing item object from
// array of data, match by `id` find item and then delete
router.delete('/:id', function (req, res) {
    // find item from array of data
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.indexOf(found);

        // splice means delete item from `data` array using index
        data.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
   let x ={'massege': 'Book deteted successfully'}
    res.status(200).json(x);
});

// module.exports is an object included in every JS file of Node.js
// application, whatever we assign to module.exports will be exposed as a module. 
module.exports = router;