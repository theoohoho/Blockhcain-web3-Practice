var solc = require('solc');
var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3('http://localhost:8545'); //ganache default url
var sender = '0x3a8ed9523252a74c53ddf618271fa4fdcee9bb27'; // ganache random account

// contract compile 
var file = fs.readFileSync('./token.sol','utf8');
console.log('compiling ... ');
var compileContract  = solc.compile(file);
console.log('done!');

// 抽取 abi and bytecode
for(var contractName in compileContract.contracts){
    var bytecode = compileContract.contracts[contractName].bytecode;
    var abi = JSON.parse(compileContract.contracts[contractName].interface);
}
fs.writeFileSync('./contractABI.json',JSON.stringify(abi));

//unlock account
web3.eth.personal.unlockAccount(sender).then(console.log('unlock Account!'));

// estimate gas 
var estimateGas;
new web3.eth.Contract(abi).deploy({
    data:bytecode,
    arguments:[1000] 
}).estimateGas(function(err,gas){
    estimateGas = gas;
}).then(()=>{

    // deploy contract
    var myContractInstance = new web3.eth.Contract(abi).deploy({
        data:bytecode,
        arguments:[1000] //直接輸入parameter，型別必須相同，所以需要先轉換(這邊設定是uint，所以數字沒問題)
    }).send({
        from:sender,
        gasPrice: 20000,
        gas: estimateGas
    },function(err,txHash){
        console.log(`transaction hash :: ${txHash}`);
    }).then(function(newContractInstance){
        console.log(`contractAddress:: ${newContractInstance.options.address}`);
        fs.writeFileSync('./contractAddress.js',newContractInstance.options.address);
    });
});



