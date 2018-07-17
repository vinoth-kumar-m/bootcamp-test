class Transaction {
    constructor(sender, receiver, amount) {
        this._sender = sender;
        this._receiver = receiver;
        this._amount = amount;
        this._timestamp = new Date().getTime();
    }

    toString() {
        return `Transaction: ${this._sender} sent ${this._amount} units to ${this._receiver}`;
    }
}

module.exports = Transaction;