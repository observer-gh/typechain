"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    static calcHash(index, previousHash, timestamp, data) {
        return CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    }
    ;
}
// validating block field types
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
;
// functions for creation&addition of blocks
const getBlockchain = () => blockchain;
const getLatestBlock = () => getBlockchain()[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimeStamp = getNewTimestamp();
    const nextHash = Block.calcHash(newIndex, previousBlock.hash, nextTimeStamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const isBlockValid = (candidateBlock, previousBlock) => {
    // type check
    if (!Block.validateStructure(candidateBlock)) {
        return false;
        // index check
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
        // hash collision check
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
        // y dis?
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const getHashforBlock = (aBlock) => {
    return Block.calcHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
// creation of blockchain
const myBlock = new Block(1, "123123", "", "this is ma block", getNewTimestamp());
let blockchain = [myBlock];
createNewBlock("ma block"), createNewBlock("gett off ma block"), createNewBlock("block is ghood");
console.log(blockchain);
//# sourceMappingURL=index.js.map