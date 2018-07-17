const crypto = require("crypto");
const Transaction = require("./transaction");
const Blockchain = require("./blockchain");
const Helper = require("./helper");

class Block {
    constructor(blockchain = new Blockchain()) {
        this._transactions = [];
        this._prev_hash = (blockchain.get_blocks_count() > 0) ?
            blockchain.get_recently_added_block()._hash : null;
        this._height = blockchain.get_blocks_count() + 1;
        this._hash = null;
        this._timestamp = new Date().getTime();
        this._transaction_count = 0;
    }

    _hash_transactions() {
        let curr_hash = "";
        for (let txn of this._transactions) {
            let txn_rep = curr_hash.concat(JSON.stringify(txn));
            curr_hash = Helper.sha256Hash(txn_rep);
        }
        return curr_hash;
    }

    _hash_payload() {
        return this._hash_transactions();
    }

    add_transaction(transaction) {
        this._transactions.push(transaction);
        this._transaction_count = this._transactions.length;
    }

    _hash_block() {
        let payload_hash = this._hash_payload();
        let blockheader_data = {
            'payload_hash': payload_hash,
            'timestamp': this._timestamp,
            'prev_hash': this._prev_hash,
            'total_transactions': this._transaction_count
        };
        return Helper.sha256Hash(JSON.stringify(blockheader_data));
    }

    finalize() {
        if(this._hash == null) {
            this._hash = this._hash_block();
        } else {
            throw new Error("Block already finalized");
        }
    }

    validate() {
        return (this._hash == this._hash_block());
    }

    get_transaction_count() {
        return this._transaction_count;
    }
}

module.exports = Block;