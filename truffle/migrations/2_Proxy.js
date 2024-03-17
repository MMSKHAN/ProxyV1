const Parent = artifacts.require("Parent");
// const Proxy = artifacts.require("Proxy");

// module.exports = function(deployer, network, accounts) {
//   const adminAddress = accounts[0]; // Assuming the first account is the admin

//   deployer.deploy(Parent)
//   .then(function() {
//     return deployer.deploy(Proxy, Parent.address, adminAddress);
//   })
//   .then(function() {
//     console.log('ADMIN ADDRESS',adminAddress)
//     console.log("Parent Contract Address: ", Parent.address);
//     console.log("Proxy Contract Address: ", Proxy.addresss);
//   });
// };
const Proxy = artifacts.require("Proxy");
module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(Parent);
  const logicInstance = await Parent.deployed();
  const adminAddress = accounts[0]; // Assuming the first account is the admin
  await deployer.deploy(Proxy, logicInstance.address, adminAddress);
};

