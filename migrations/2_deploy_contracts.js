var N8Token = artifacts.require("N8Token");
var TestContract = artifacts.require("TestContract");
module.exports = function (deployer, network, accounts) {
    var token = null;
    deployer.deploy(N8Token, {from: accounts[0], gas: 4700000}).then(() => {
        return N8Token.deployed().then(instance => {token = instance});
    }).then(() => {
        return deployer.deploy(TestContract, token.address, {from: accounts[0], gas: 4700000});
    });
}