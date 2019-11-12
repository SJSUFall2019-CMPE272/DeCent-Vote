const MyContract = require('./application/voterContract.js');

//export contract and contracts list
module.exports.MyAssetContract = MyContract;
module.exports.contracts = [ MyContract];