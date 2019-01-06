const html = require('nanohtml');
const csjs = require('css-inject');
const morphdom = require('morphdom');
const Web3 = require('web3');
const web3 = new Web3('https://ropsten.infura.io/v3/a18e477ef5054ba7990221817a29e3af');


// css inject
const css = csjs`
    .box {
    }
    .input {
        margin: 10px;
        width: 500px;
        font-size: 20px;
    }
    .button {
        margin-top: 10px;
        font-size: 20px;
        width: 180px;
        background-color: #4CAF50;
        color: white;
    }
    .result {
        margin: 10px;
    }
    img {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 5px;
        width: 150px;
    }
`

// DOM element
const inputAccount = html `<input class=${css.input} type="text" value="" placeholder="Please insert account address that you want to search"/>`;
const resultElement = html `<div></div>`;


// Event
function queryBalance(event){
    web3.eth.getBalance(inputAccount.value).then((result)=>{
        let number = Math.round(web3.utils.fromWei(result,'ether') * 100 ) / 100;
        const newElement = html `<div class="${css.result}"> Balance: ${number} Ether </div>`;
        morphdom(resultElement, newElement);
    });
}



// Render
function render(){
    document.body.appendChild(html `
    <div class=${css.box} id="app">
        ${inputAccount} 
        <button class=${css.button} onclick=${queryBalance}> Search Ether Balacne </button> 
        ${resultElement}
    </div>
 `)
}

render();

