const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Transaction = require("../transaction");
const Block = require("../block");
const Blockchain = require("../blockchain");
const Helper = require("../helper");

describe('Helper', function () {
    describe('sha256Hash', function () {
        it('should return true when hash value equals for the given input', function () {
            assert.equal(Helper.sha256Hash("Test"), Helper.sha256Hash("Test"));
        });

        it('should return true when hash value not equals for the given input', function () {
            assert.notEqual(Helper.sha256Hash("Test"), Helper.sha256Hash("test"));
        });

    });
});

describe('Transaction', function () {
    let tx = new Transaction("Satheesh", "Chaitra", 10);

    it('should be constructed', function () {
        assert.equal(tx._sender, "Satheesh");
        assert.equal(tx._receiver, "Chaitra");
        assert.equal(tx._amount, 10);
    });
});


describe('Block', function () {
    let tx = new Transaction("Satheesh", "Chaitra", 10);
    let newtx = new Transaction("Chaitra", "Nala", 10);
    let block = new Block();

    describe('getTransactionCount', function () {
        it('should return 0 when no transaction added to the block', function () {
            assert.equal(block.get_transaction_count(), 0);
        });
    });

    describe('add_transaction', function () {
        it('should add the transaction to the block and increase the transaction count', function () {
            block.add_transaction(tx);
            assert.equal(block.get_transaction_count(), 1);
        });
    });

    describe('validate', function () {
        it('should return false if the block is not finalized', function () {
            assert.isFalse(block.validate());
            assert.isNull(block._hash);
        });
    });

    describe('finalize', function () {
        it('should finalize the block and create the hash for the payload', function () {
            assert.isFalse(block.validate());
            block.finalize();
            assert.isNotNull(block._hash);
            assert.isNull(block._prev_hash);
            assert.equal(block._height, 1);
            assert.isTrue(block.validate());
        });

        it('should throw error if called twice', function () {
            expect(() => block.finalize()).throws(Error);
        });

        it('should return false if new transaction added after block is finalized', function() {
            let old_hash = block._hash;
            assert.isTrue(block.validate());
            block.add_transaction(newtx);
            expect(() => block.finalize()).throws(Error);
            let new_hash = block._hash;
            assert.equal(old_hash, new_hash);
            assert.equal(block.validate(), false);
        });
    });
});

describe('Blockchain', function () {
    let tx = new Transaction("Satheesh", "Chaitra", 10);
    let newtx = new Transaction("Chaitra", "Nala", 10);
    let block = new Block();
    block.add_transaction(tx);
    block.finalize();
    let blockchain = new Blockchain();
    blockchain.add_block(block);

    describe('validate_chain', function() {
        it('should return true if new block is added to blockchain and the chain is validated', function() {
            let newBlock = new Block(blockchain);
            let newTx = new Transaction("Jeeva", "Satheesh", 2);
            newBlock.add_transaction(newTx);
            newBlock.finalize();
            blockchain.add_block(newBlock);
            assert.isTrue(blockchain.validate_chain());
        });
    });

});