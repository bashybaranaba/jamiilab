## Arttribute

Jamii Lab is a decentralized citizen science platform that allows individuals or organizations to create projects where contributors help generate valuable datasets. By implementing a purchase model for datasets, the platform ensures that contributors are rewarded proportionately for their data contributions.

The aim is to incentivize long-term engagement and commitment, addressing the problem of participant retention and lack of meaningful incentives in citizen science.

### How it works:

**Creating a project:**
Anyone can create a project and is required to enter the project's name and description and may add an image for the project. To establish the dataset fields that project participants will help populate, the project owner can create a form similar to Google Forms.

**Joining and contributing to a project:** To contribute data to a project, individuals need to become a member of the project. Once they join, they can add data to the project's dataset by filling out the predefined project form created by the project owners.

**Purchasing a dataset:**
The price of a dataset is dynamic and depends on the amount of data in the dataset at any given time. More data contributed over time impacts the dataset's price. The price is calculated by multiplying the number of data points in the dataset by the predetermined price per data point set by the project owners.

**Getting rewards:**
When a dataset is purchased, project participants who contributed data to that dataset receive rewards proportionately to their contributions. The earnings of the dataset are distributed among contributors based on the percentage of data points they contributed to the overall dataset. For example, if a contributor filled out 9 out of 10 fields in the dataset form and the dataset contains a total of 1000 data points, the contributor would receive 9/1000 of the earnings.

## How it's Made

Jamii Lab was developed using a combination of technologies which include Next js, Solidity, Polybase, and Web3 Storage to create a truly decentralized citizen science platform deployed on the Filecoin testnet. Here's a comprehensive overview of the technologies used:

**Next js for Frontend Development:**
The frontend of Jamii Lab was built using Next.js, a popular JavaScript framework for building web applications. Next.js provides a seamless user interface and allows for efficient rendering and routing.

**Solidity for Smart Contract Development:**
Solidity was used to define the rules for dataset purchases and participant rewards. The smart contract rewards project participants proportionately to the amount of data contributed upon the purchase of a dataset.

**Polybase Decentralized Database:**
Jamii Lab integrates Polybase, a privacy-preserving decentralized database built on zk-STARKs, for efficient and secure data management leveraging its native indexing to enable decentralized database rules, fast queries, and scalable writes.

**Web3 Storage for File Storage:**
For secure storage of project files such as images, Web3 Storage was integrated into Jamii Lab. Web3 Storage utilizes IPFS to store project files securely across a distributed network. This ensures reliable access and redundancy for project files.

**Hardhat for Testing and Deployment:**
The development process of the smart contract was facilitated by Hardhat, which provides a comprehensive set of tools for testing and deploying Ethereum smart contracts. Hardhat ensured efficient testing and deployment of the smart contract defining the dataset purchase and reward mechanisms. The smart contract was deployed on the Filecoin virtual machine, leveraging the security and scalability of the Filecoin network.

## Deployed on

**Web Url:** https://jamiilab.vercel.app/

**Deployed smart contract adddress:** 0xF5b81Fe0B6F378f9E6A3fb6A6cD1921FCeA11799

## Running it locally

First, install dependencies

```bash
npm install
# or
yarn install
```

Test the contract

```bash
npx hardhat test
```

Start a local node

```bash
npx hardhat node
```

Deploy the contract locally:

```bash
npx hardhat run --network localhost scripts/deploy.ts
```

Run the development server for next js:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
