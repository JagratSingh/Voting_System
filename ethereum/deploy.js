const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const compiledVoting = require('./Build/Voting.json');

const provider = new HDWalletProvider(
  'fatal seven myth aisle shoulder kind rose giggle nasty rib enact aisle',
  // remember to change this to your own phrase!
  'https://goerli.infura.io/v3/69f06d84671f459dbc70fb6c5d9102ce'
  // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledVoting.interface))
    .deploy({ data: compiledVoting.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
  provider.engine.stop();
};
deploy();
