const keccak256 = require('js-sha3').keccak256; // require sha3 module use keccak256 algorithum
const BN = require('bn.js'); // require bignum module 
const EC = require('elliptic').ec; // require elliptic module use ecdsa
const ec = new EC('secp256k1'); // Create and initialize EC context


//This code just a public key and private key concept
//Not regular method 
var G = ec.g; //generate point
var privateKey = new BN(100); //assume private key is BigNum
var publicPoint= G.mul(privateKey); //use multipliction to determine public key point
console.log(publicPoint);

//<EC Point x: ed3bace23c5e17652e174c835fb72bf53ee306b3406a26890221b4cef7500f88 y: e57a6f571288ccffdcda5e8a7a1f87bf97bd17be084895d0fce17ad5e335286e>

var pubX = publicPoint.getX().toBuffer(); // get 32bit x co-ordinate of public point
var pubY = publicPoint.getY().toBuffer(); // get 32bit y co-ordinate of public point
console.log(pubX);
console.log(pubY);

//NON TO BUFFER
//pubX :: <BN: ed3bace23c5e17652e174c835fb72bf53ee306b3406a26890221b4cef7500f88>
//pubY :: <BN: e57a6f571288ccffdcda5e8a7a1f87bf97bd17be084895d0fce17ad5e335286e>

//TO BUFFER
//pubX :: <Buffer ed 3b ac e2 3c 5e 17 65 2e 17 4c 83 5f b7 2b f5 3e e3 06 b3 40 6a 26 89 02 21 b4 ce f7 50 0f 88>
//pubY :: <Buffer e5 7a 6f 57 12 88 cc ff dc da 5e 8a 7a 1f 87 bf 97 bd 17 be 08 48 95 d0 fc e1 7a d5 e3 35 28 6e>

// if we need use Buffer.concat(), we have to buffer pubX and pubY
var publicKey = Buffer.concat([pubX,pubY]); //concate x and y to generate public key

var address = keccak256(publicKey); //generate address use public key hash by keccak256
console.log(address);

//address:: d004ced906bcdb3ebcbf706dd9a284367b6d3e25a91c91b5a430af2593886eb9
