// =========== Declare Dependences ===============
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

// =========== Create Connection =================

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Password123",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    displayInventory(); // call function to display inventory when app is ran
});

// ============= Display Inventory ===============

function displayInventory() {
    connection.query("SELECT * FROM bamazon_db.products", function (err, res) {
        if (err) throw err;
        var inventory = cTable.getTable(res);
        console.log("\n" + "ALL INVENTORY: " + "\n" + inventory);
        itemToBuy(); // call function to prompt cust & ask what they want to buy
    })
}

// =============== Customer Item =================

function itemToBuy() {
    inquirer
        .prompt({
            name: "item",
            type: "input",
            message: "What is the item_id of the product you would like to purchase?",
        })
        .then(function (inqRes) {
            var itemQuery = "SELECT product_name, department_name, price, stock_quantity FROM bamazon_db.products WHERE ?";
            connection.query(itemQuery, { item_id: inqRes.item }, function (err, res) {
                if (err) throw err;
                if (res[0].stock_quantity > 0) {
                    custQuant(inqRes.item, res[0].stock_quantity, res[0].price); // call function to prompt cust how many they want to buy
                                                                                // to avoid another query, pass information already 'grabbed'
                } else {
                    console.log("Sorry, that item is out of stock.");
                    itemToBuy(); // recall function to give customer another chance to purchase something in stock
                }
            });
        });
}

// ============ Customer Item Quantity =============

function custQuant(id, quantity, price) {
    inquirer
        .prompt({
            name: "itemQuantity",
            type: "input",
            message: "How many would you like to purchase?"
        })
        .then(function (inqRes, res) {
            if (inqRes.itemQuantity <= quantity) {
                updateDB(id, inqRes.itemQuantity, price); // call function to update the db, passing information already 'grabbed' 
            } else {
                console.log("Insufficient quantity, there is only: " + quantity + " in stock. Please update your quantity");
                itemToBuy(); // call function to start customer from beginning again 
            }
            // maybe another function to ask if they want to purchase anything else (run displayInventory)
        });
}

// ============ Update Database =============

function updateDB(id, quantity, price) {
    var updateQuery = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
    connection.query(updateQuery, [quantity, id], function (err, res) {
        if (err) throw err;
        console.log("Sold! Your total is: $" + (price * quantity));
    })
    connection.end();
}