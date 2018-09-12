'use strict';

var N8Token = artifacts.require('N8Token');
var TestContract = artifacts.require('TestContract');

contract('Test', function (accounts) {
    describe('Init contracts', () => {
        it("should init total as 0", async function () {
            let token = await N8Token.new({from: accounts[0], gas: 4500000});
            let contract = await TestContract.new(token.address, {from: accounts[0], gas: 4500000});
            assert.equal(await contract.total(), 0)
        });

        it("should sum total", async function () {
            let token = await N8Token.new({from: accounts[0], gas: 4500000});
            let contract = await TestContract.new(token.address, {from: accounts[0], gas: 4500000});
            assert.equal(await contract.total(), 0)
            let amount = 17;
            const {logs} = await contract.test(amount);
            assert.equal(await contract.total(), amount);
            const event_total_added  = logs.find(e => e.event === "totalAdded");
            assert.notEqual(event_total_added, undefined);
        });
    });
});