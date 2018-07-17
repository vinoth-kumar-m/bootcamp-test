const crypto = require("crypto");
const Transaction = require("./transaction");
const Block = require("./block");
const Blockchain = require("./blockchain");
const Helper = require("./helper");

// Creating List 
let mylist = [1, 1, 2, 3, 5, 8];
console.log(`\nLength: ${mylist.length}`);

// Appending to List
mylist.push(13);
console.log("\nList Elements: ", mylist);

// Slicing list
console.log("\nSlicing List");

console.log("slice(1,3): ", mylist.slice(1,3));
console.log("slice(0,3): ", mylist.slice(0,3));
console.log("slice(-1): ", mylist.slice(-1));
console.log("slice(-2): ", mylist.slice(-2));

// Iterating list
console.log("\nIterating List");
for(let item of mylist) {
    console.log(item);
}

// Dict
let person = {"name": "Vinoth", "country": "India", "age": 33};
console.log("\nDict: ", person);

// Creating hash for a string

console.log("\nHash for 'Blockchain is simple': ", Helper.sha256Hash("Blockchain is simple"));

console.log("\nHash for 'Blockchain is Simple': ", Helper.sha256Hash("Blockchain is Simple"));

// Creating first block

let txn1 = new Transaction("Vinoth", "Satheesh", 10);

console.log("\n" + txn1.toString());

let txn2 = new Transaction("Satheesh", "Pardha", 20);

console.log("\n" + txn2.toString());

let block = new Block();

block.add_transaction(txn1);

block.add_transaction(txn2);

console.log(`\nTransaction Count: ${block.get_transaction_count()}`);

block.finalize();

console.log(`\nValidate Block: ${block.validate()}`);

let txn3 = new Transaction("Pardha", "Vinita", 30);

block.add_transaction(txn3);

console.log(`\nTransaction Count: ${block.get_transaction_count()}`);

console.log(`\nValidate Block (Before Finalize): ${block.validate()}`);

try {
    block.finalize();
} catch(err) {
    console.log(err);
}

console.log(`\nValidate Block (After Finalize): ${block.validate()}`);

let myblockchain = new Blockchain();

myblockchain.add_block(block);

myblockchain.validate_chain();

// Creating second block

txn1 = new Transaction("Jeeva", "Joe", 50);

block = new Block(myblockchain);

block.add_transaction(txn1);

block.finalize();

myblockchain.add_block(block);

console.log(`\nLength of Blockchain: ${myblockchain.get_blocks_count()}`)

myblockchain.validate_chain();

// Save blockchain to file

Helper.save_chain(myblockchain);

// Load blockchain from file

console.log("\nLoad Blockchain from file");

let newblockchain = Helper.load_chain();

newblockchain.validate_chain();

console.log();