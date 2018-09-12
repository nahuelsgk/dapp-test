'use strict';

let Web3 = require('web3');

let provider;
if (process.env.NODE_TYPE === 'INFURA') {
    console.log("Init Private Key provider");
    let PKWalletProvider = require('truffle-privatekey-provider');
    provider = new PKWalletProvider(process.env.PRIVATE_KEY, process.env.RPC_HOST);
} else {
    console.log("Init GETH provider");
    provider = new Web3.providers.HttpProvider(process.env.RPC_HOST);
}

let web3 = new Web3();
web3.setProvider(provider);

let path             = require('path');
let json             = require(path.join(__dirname, '../build/contracts/TestContract.json'));
let truffle_contract = require('truffle-contract');
let contract         = truffle_contract(json);
contract.setProvider(provider);
contract = fixTruffleContractCompatibilityIssue(contract);

// Workaround for a compatibility issue between web3@1.0.0-beta.29 and truffle-contract@3.0.3
// https://github.com/trufflesuite/truffle-contract/issues/57#issuecomment-331300494
function fixTruffleContractCompatibilityIssue(contract) {
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function() {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    return contract;
}

/**
 * Create an account on blockchain.
 *
 * @param request
 * @param response
 * @returns {*}
 */
exports.postAccount = function (request, response) {
    let password = request.body.password;
    if (password === undefined) {
        return response.status(400).json({status: "error", message: "To create an account, password is needed"})
    }

    web3
        .eth
        .personal
        .newAccount(password)
        .then((account) => { response.status(200).json({status: "ok", address: account});})
        .catch((error) => {
            response.status(400).json({status: "error", address: error.toString()});
        })
};

/**
 * Get the balance in ethers from an account.
 * @param request
 * @param response
 */
exports.getBalance = function (request, response) {
    let account = request.params.account;
    web3
        .eth
        .getBalance(account)
        .then( (balance) => {response.status(200).json({status: "ok", balance: balance})})
}

/**
 * Actually just reads the accounts
 * @param request
 * @param response
 */
exports.getBlockChainStatus = function (request, response) {
    web3
        .eth
        .getAccounts()
        .then( (accounts) => { response.status(200).json({status: "ok", accounts: accounts}) });
};

exports.postTest = function (request, response) {
    let amount = request.body.amount;
    let smart_contract;
    let tx;
    contract
        .deployed()
        .then((deployed_contract) => {smart_contract = deployed_contract;})
        .then(()                  => { return executeFunctionContract({amount: amount, contract: smart_contract});})
        .then((transaction)       => { tx = transaction;})
        .then(()                  => { console.log(tx);})
        .catch((error)            => { console.log(error)});

    return response.status(200).json({status: "ok"});
};

function executeFunctionContract({contract, amount}) {
    return contract
        .test(amount, {from: "0x4fAe49fc92B6C321AB532f265f8B3F017B592B23"})
        .catch((error) => { console.log(error)});
}