// =========== Declare Dependences ===============
var mysql = require("mysql");
var inquirer = require("inquirer");

// =========== Create Connection =================

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    displayInventory(); // call function to display inventory when app is ran
});

// ============= Display Inventory ===============

function displayInventory () {
    connection.query("SELECT * FROM bamazon_db.products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
    })
}

// =============== Customer Item =================

// function custItem () {
//     inquirer
//         .prompt([

//         ])
//         .then(function (response) {
//              {

//             }
//         });
// }

// ============ Customer Item Quantity =============

// function custQuant () {
//     inquirer
//         .prompt([

//         ])
//         .then(function (inquirerRes) {

//         })
// }



