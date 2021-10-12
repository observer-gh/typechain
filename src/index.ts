import * as CryptoJS from "crypto-js";

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(
      index: number,
      hash: string,
      previousHash: string,
      data: string,
      timestamp: number
    ) {
      this.index = index;
      this.hash = hash;
      this.previousHash = previousHash;
      this.data = data;
      this.timestamp = timestamp;
    }
    static calcHash(
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
      ): string {
        return CryptoJS.SHA256(index+previousHash+timestamp+data).toString();

    };
    // validating block field types
    static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
  };

  // functions for creation&addition of blocks
  const getBlockchain = ():Block[] => blockchain;
  const getLatestBlock = ():Block => getBlockchain()[blockchain.length-1];
  const getNewTimestamp = ():number => Math.round(new Date().getTime() /1000);
  const createNewBlock = (data:string):Block => {
      const previousBlock: Block = getLatestBlock();
      const newIndex: number = previousBlock.index + 1;
      const nextTimeStamp: number = getNewTimestamp();
      const nextHash:string = Block.calcHash(newIndex, previousBlock.hash, nextTimeStamp, data);
      const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimeStamp);
      addBlock(newBlock);
      return newBlock;

  };
  const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    // type check
    if (!Block.validateStructure(candidateBlock)) {
      return false;
    // index check
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
      return false;
    // hash collision check
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
      return false;
    // y dis?
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash){
      return false;
    } else {
      return true;
    }
  };
  const getHashforBlock = (aBlock: Block):string => {
      return Block.calcHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data );
  }
  const addBlock = (candidateBlock:Block) => {
    if (isBlockValid(candidateBlock, getLatestBlock())){
      blockchain.push(candidateBlock);
    }
  }

// creation of blockchain
const myBlock = new Block(1, "123123", "", "this is ma block", getNewTimestamp());
let blockchain: Block[] = [myBlock]
createNewBlock("ma block"), createNewBlock("gett off ma block"), createNewBlock("block is ghood");
console.log(blockchain);
