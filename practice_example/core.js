const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs');

module.exports = (url) => {
    if( web3 !== 'undefined'){
        web3 = new Web3(web3.currentPrivder);
    }else{
        web3 = new Web3(url);
    }
    
    this.compile = (contract){
        
        var file = fs.readFileSync(`./${contract}.sol`,'utf8');
        var compiledContract = solc.compile(file);

        for(var contractName in compiledContract.contracts){
            var abi = compiledContract.contracts[contractName].interface;
            var bytecode = '0x' + compiledContract.contracts[contractName].bytecode;
        }
        
    }

    // fs.writeFileSync()





}
