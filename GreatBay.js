//create table (items) in DB
//fields (id, itemname, category, startingbid, highestbid)


// establish connection to GreatBayDB
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "GreatBayDB"
});

// test connection to GreatBayDB
connection.connect(function (err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
});


var inq = require('inquirer');

inq.prompt([
   {
       type: 'list',
       message: 'Main Menu',
       choices: ['Create new item', 'Bid on existing item'],
       name: 'menu'
   }
]).then(function (res) {
   console.log(res)
   if (res.menu === 'Create new item') {
       newItemPrompt()
   } else {
       bid()
   }
})

function newItemPrompt() {
   inq.prompt([
       {
           type: 'input',
           message: 'Enter item name:',
           name: 'name'
       },
       {
           type: 'input',
           message: 'Enter category:',
           name: 'category'
       },
       {
           type: 'input',
           message: 'Enter starting bid:',
           name: 'bid',
           validate: function validateAge(bid) {
               var reg = /^\d+$/;
               return reg.test(bid) || 'Bid should be a number!';
           }
       }
   ]).then(function (res) {
       // create new item
       console.log(res)
       insertItem(res);
   })
}

function bid() {
    connection.query(
        "SELECT * FROM items",
        function(err,res){
            if (err) throw err;

   inq.prompt([
       {
           type: 'list',
           message: 'Choose item to bid on:',
           choices: function(){
                var itemNames = []
                for (var i = 0; i<res.length; i++){  
                    itemNames.push(res[i].name)
               }
                    return itemNames;
            },
           name: 'item'
       },
       {
           type: 'input',
           message: 'Enter bid:',
           name: 'bid',
           validate: function validateAge(bid) {
               var reg = /^\d+$/;
               return reg.test(bid) || 'Bid should be a number!';
           }
       }
   ]).then(function (res) {
       insertItem(res);
       // find item with name selected
       // add bid to that item
   })
})
}
// insert userCreated item into DB
function insertItem(res) {
    connection.query(
        "INSERT into items set?",
        {
            name: res.name,
            category: res.category,
            startingbid: res.bid,
            highestbid: res.highestbid
        }, function (err, res) {
            if (err) throw err;
            console.log(res.affectedRows + " item inserted!\n");
        }
    )
}
