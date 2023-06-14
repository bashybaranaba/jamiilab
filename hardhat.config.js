require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });
const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    calibration: {
      chainId: 314159,
      url: "https://api.calibration.node.glif.io/rpc/v1",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
