# BAMazon
An Amazon-like storefront CLI app utilizing MySQL 

## How to Install & Use On Your Own Local Computer
1. Create a new GitHub repository 
2. Clone this repository onto your own local computer
3. In terminal, navigate to the root of your project and run a general `npm install` to install the necessary node packages listed below for this app to work, all of which are saved within my `package.json` to make it an easy install for you!

    * <a href="https://www.npmjs.com/package/inquirer" target="_blank">Inquirer</a>

    * <a href="https://www.npmjs.com/package/mysql" target="_blank">MySQL</a>

    * <a href="https://www.npmjs.com/package/console.table" target="_blank">Console.table</a>
        * This will serve to render table data within your computer's CLI.

4. Create a `.gitignore` file and add the following line of code to that file -- this step will prevent Git from tracking/committing all of the dependencies for each node package:
```
node_modules

```

5. Use your favorite SQL IDE to execute the queries within both the `schema.sql` and `bamazonSeeds.sql` files to establish the BAMazon store inventory.

## Run Using Node.JS 
(If necessary, you can download Node.JS <a href="https://nodejs.org/en/download/">here</a>)

Act like a customer who wants to purchase items from BAMazon by running the following line of code:

```
$ node bamazonCustomer.js

```

* 1. This should immediately display all of the store's current inventory in a table, displaying:
    * **item_id** (the unique id for each product)
    * **product_name** (the name of the product)
    * **department_name** 
    * **price** (the cost to the customer)

* 2. After product information is displayed, the app will prompt the user to enter the item_id of the product they would like to purchase.

    * Upon the customer entering the item_id of the product they wish to purchase, the app will then check to see if that product is in stock. 
        * If the item is *not* in stock, the app will respond with `Sorry, that item is out of stock.` and will automatically reprompt the customer to enter the item_id of a product they wish to purchase (in hopes that the customer will pick another item to purchase).
        * If the item *is* in stock, the app will then ask the customer how many units they wish to purchase.  

* 3. At this point, the app will then check to see if the store has enough of the product to meet the request.
    * If the customer's request exceeds the store's stock_quantity, the app will respond with `Insufficient quantity, there is only: <quantity> in stock. Please try again.` and will automatically redirect to step #2. 
    * If the store's stock_quantity can handle the customer's order, the app will respond with `Sold! Your total is: $<amount>`.  This is meant to validate the current order and to display the total order cost to the customer. 
        * This will also update the store's inventory AND will also end the connection, or terminate the app.  

* INSERT GIF HERE!
