const Elements = artifacts.require("Elements");

module.exports = function (deployer, network, addresses) {
  deployer.deploy(
    Elements,
    {from: addresses[0]}
    );
};
