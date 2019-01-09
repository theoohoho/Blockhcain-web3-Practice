const html = require('nanohtml');
const csjs = require('css-inject');
const morphdom = require('morphdom');
const Core = require('./core');
const core = new Core('https://localhost:8545');

// CSS inject
const css = csjs`
    .box{
        margin: 10px;
    }
    .input {
        margin-top: 10px;
        margin-right: 10px;
        width: 500px;
        font-size: 20px;
    }
    .button{
        margin-top: 10px;
        margin-right: 10px;
        font-size: 20px;
        width: 180px;
        background-color: $4CAF50;
        color: white;
    }
    .result {
        padding: 10px;
        font-size: 40px;
        color: red;
    }
    img {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 150px;
    }
`
// DOM Element
const resultElement = html `<div></div>`;
const inputName = html`<input class=${css.input} type="text" value="" placeholder="input your name"/>`
const inputAmount = html `<input class=${css.input} type="number" value="" placeholder="input ether amount"/>`;

// Listening Contract Event
const options = {
    fromBlock: 'latest'
}

myContract.events.NewKing(options, async (err,revevnt)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log(event);
    const ether = web3.utils.fromWei(event.returnValues.amount,'ether');
    const newElement = html `<div class="${css.result}"> The new King is ${event.returnVlaues.name}, amount is ${ether} Ether</div>`
    morphdom(resultElement,newElement);
    return;
})

// Instance DOM Event
function replaceKing(event){
    let account = web3.eth.defaultAccount;
    myContract.methods.replaceKing(inputAmount.value).send({
        from: account,
        value: web3.utils.toWei(inputAmount.value,'ether')
    }).then((result)=>{
        console.log(result);
    }).catch(console.log);
}

function playerWithdrawal(event){
    let account = web3.eth.defaultAccount;
    myContract.methods.playerWithdrawal().send({
        from: account
    }).then((result)=>{
        console.log('>>> playWithdrawal ok!');
    }).catch(console.log);
}

// Utils
function getNetworkName(networkId){
    if(netwowkrId == 1) return 'Main';
    else if(netwowkrId == 2) return 'Ropsten';
    else if(netwowkrId == 3) return 'Kovan';
    else if(netwowkrId == 4) return 'Rinkeby';
    else return '';
}


// Pre-Loading

function start(){
    console.log('start!');
    getNetworkId({});
}
function getNetworkId(result){
    console.log('get network Id!');
    web3.eth.net.getId((id)=>{
        result.networkId = id;
        getAccounts(result);
    })
}
function getAccounts(result) {
    console.log('get account!');
    web3.eth.getAccounts().then((address)=>{
        const address = address[0];
        web3.eth.defaultAccount = address;
        result.account = address;
        getKingInfo(result);
    })
}

function getKingInfo(result){
    console.log('read contract function !');
    myContract.methods.kingInfo().call().then((data)=>{
        if(data.amount != '0'){
            const ether = web3.utils.fromWei(data.amount, 'ether');
            const newElement = html `<div class="${css.result}"> The King's name is ${data.name}, amount is ${ether} Ether</div>`
            morphdom(resultElement, newElement);
        }
        render(result);
    }).catch(console.log);
}

// Render

function render(result){
    document.body.appendChild(html`
    <div class=${css.box} id="app">
        <h2> King of the Ether - ${getNetworkName(result.networkId)} Network </h2>
        <div>If toy put more money here, you could be a King, too.</div>
        Name: ${inputName}</br>
        Amount: ${inputAmount}</br>
        <button class="${css.button}" onclick=${replaceKing}> replace King</button>
        <button class="${css.button}" onclick=${playerWithdrawal}> withdrawal </button>
        ${resultElement}
    </div>
    `)
}

if ( typeof web3 !== 'undefined') start();