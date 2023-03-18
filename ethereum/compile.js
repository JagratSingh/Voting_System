const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'Build');
fs.removeSync(buildPath); 

const contractPath = path.resolve(__dirname, 'contract', 'Voting.sol');
const source = fs.readFileSync(contractPath, 'utf-8');
const output = solc.compile(source, 1).contracts[":Voting"];

fs.ensureDirSync(buildPath);

// console.log(output);
fs.outputJsonSync(path.resolve(buildPath, 'Voting.json'), output);
