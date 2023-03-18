const assert = require("assert");
const ganache = require("ganache-cli");
const { it } = require("mocha");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledVoting = require('../ethereum/Build/Voting.json');

let voting;
let accounts;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    voting = await new web3.eth.Contract(JSON.parse(compiledVoting.interface))
    .deploy({ data : compiledVoting.bytecode})
    .send({ from : accounts[0], gas : "1000000" });
    // console.log(accounts[0]);
});

describe('Voting System', () => {
    it('depolys a contract', () => {
        assert.ok(voting.options.address);
    });

    it('marks caller as the campaign manager', async () => {
        const manager = await voting.methods.manager().call();
        assert.equal(accounts[0], manager);
    });

    it('User is able to Register', async () => {
        await voting.methods.Register(accounts[1], 1234).send({ from: accounts[1] });
        await voting.methods.Register(accounts[0], 12345).send({ from: accounts[1] });
        const counting = await voting.methods.voterCount().call();
        assert.equal(counting, 2);
    });

    it('Person is able to Vote', async () => {
        await voting.methods.Register(accounts[0], 12345).send({ from: accounts[1] });
        await voting.methods.VoteTo("AAP").send({ from: accounts[0] });
        const count = await voting.methods.AAP().call();
        assert.equal(count, 1);
    });

    it('Person is able to vote only once', async () => {
        await voting.methods.Register(accounts[0], 12345).send({ from: accounts[1] });
        try{
            await voting.methods.VoteTo("AAP").send({ from: accounts[0] });
            await voting.methods.VoteTo("AAP").send({ from: accounts[0] });
        } catch(err) {
            assert(err);
        }
    });

    it('Only registred person will be able to vote', async () => {
        try{
            await voting.methods.VoteTo("BJP").send({ from: accounts[0] });
        } catch(err) {
            assert(err);
        }
    });
    
    it('Only Manager will pick the winner', async () => {
        //Manager is the accounts[0], so this will throw an error
        try {
             await voting.methods.PickWinner().call({ from: accounts[1] });
        } catch(err){
            assert(err);
        }
    });
});