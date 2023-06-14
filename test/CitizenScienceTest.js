const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CitizenScienceRewards", function () {
  it("Rewards citizen scientists for contributing in citizen science projects", async function () {
    const CitizenScienceRewards = await ethers.getContractFactory(
      "CitizenScienceRewards"
    );
    const citizenScienceRewards = await CitizenScienceRewards.deploy();
    await citizenScienceRewards.deployed();

    const [_, firstMember, secondMember, thirdMember, fourthMember] =
      await ethers.getSigners();

    const projectData = "Test Project";
    const dataPoints = 10;
    const data = "Sample Data";

    // Create a new project
    await citizenScienceRewards
      .connect(fourthMember)
      .createProject(projectData);

    // Create a new project
    await citizenScienceRewards
      .connect(fourthMember)
      .createProject(projectData);

    // Add contributors to the project
    await citizenScienceRewards.connect(firstMember).addContributor(1); // Project ID is 1
    await citizenScienceRewards.connect(thirdMember).addContributor(1); // Project ID is 1

    //Get members initial balance
    const initialBalance1 = await ethers.provider.getBalance(
      firstMember.address
    );
    const initialBalance2 = await ethers.provider.getBalance(
      secondMember.address
    );
    const initialBalance3 = await ethers.provider.getBalance(
      thirdMember.address
    );

    // Make a contribution to the project
    await citizenScienceRewards
      .connect(firstMember)
      .contribute(1, dataPoints, data); // Project ID is 1
    await citizenScienceRewards
      .connect(firstMember)
      .contribute(1, dataPoints, data); // Project ID is 1
    await citizenScienceRewards
      .connect(thirdMember)
      .contribute(1, dataPoints, data); // Project ID is 1

    await citizenScienceRewards
      .connect(firstMember)
      .contribute(2, dataPoints, data); // Project ID is 2
    await citizenScienceRewards
      .connect(firstMember)
      .contribute(2, dataPoints, data); // Project ID is 2
    await citizenScienceRewards
      .connect(thirdMember)
      .contribute(2, dataPoints, data); // Project ID is 2

    // Purchase the dataset
    await citizenScienceRewards.connect(secondMember).purchaseDataset(1, {
      value: ethers.utils.parseUnits("0.002", "ether"),
    }); // Project ID is 1

    // Purchase the dataset
    await citizenScienceRewards.connect(secondMember).purchaseDataset(2, {
      value: ethers.utils.parseUnits("0.008", "ether"),
    }); // Project ID is 1

    //Print project details
    const projectDetails = await citizenScienceRewards.getProject(1);
    console.log("Project Details 1: ", projectDetails);
    //Print project details
    const projectDetails2 = await citizenScienceRewards.getProject(2);
    console.log("Project Details 2: ", projectDetails2);

    //Print all projects
    const allProjects = await citizenScienceRewards.getProjects();
    console.log("All Projects: ", allProjects);

    //Get members final balance
    const finalBalance1 = await ethers.provider.getBalance(firstMember.address);
    const finalBalance2 = await ethers.provider.getBalance(
      secondMember.address
    );
    const finalBalance3 = await ethers.provider.getBalance(thirdMember.address);

    //Check and print balnace difference
    const balanceDifference1 = finalBalance1.sub(initialBalance1);
    const balanceDifference2 = finalBalance2.sub(initialBalance2);
    const balanceDifference3 = finalBalance3.sub(initialBalance3);
    console.log("Balance Difference 1: ", balanceDifference1.toString());
    console.log("Balance Difference 2: ", balanceDifference2.toString());
    console.log("Balance Difference 3: ", balanceDifference3.toString());
  });
});
