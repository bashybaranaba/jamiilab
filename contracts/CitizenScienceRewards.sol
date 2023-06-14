// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract CitizenScienceRewards {

    using Counters for Counters.Counter;
    Counters.Counter private _projectIds;
    Counters.Counter private  _dataContributionIds;

    struct Contributor {
        address contributorAddress;
    }
    
    struct Project {
        address creator;
        string projectData;
        address[] contributors;
        uint256 totalContributions;
        uint256 totalEarnings;
    }

    struct DataContribution {
        string contributionData;
    }

    Project[] public projects;
    DataContribution[] public dataContributions;
    mapping(uint256 => mapping(address => uint)) public contributions;

    event ProjectCreated(uint256 indexed id, address indexed creator, string projectData);
    event ContributorAdded(uint256 indexed id, address indexed contributor);
    event ContributionAdded(uint256 indexed id, uint256 projectId, address indexed contributor, uint256 amount);
    event DatasetPurchased(uint256 projectId, address indexed buyer, uint256 earnings);


    function createProject(string memory _projectData) public {
        _projectIds.increment();
        uint256 newProjectId = _projectIds.current(); 
        projects.push(Project(msg.sender,_projectData,new address[](0),0,0));
        emit ProjectCreated(newProjectId, msg.sender, _projectData);
    }

    function addContributor(uint256 _projectId) external {
        //require(projects[_projectId-1].exists, "Project does not exist");
        Project storage project = projects[_projectId-1];
        require(msg.sender != project.creator, "Owner cannot be a contributor");

        for (uint256 i = 0; i < project.contributors.length; i++) {
            require(project.contributors[i] != msg.sender, "Contributor already exists");
        }

        project.contributors.push(msg.sender);
        emit ContributorAdded(_projectId, msg.sender);
    }

    function contribute(uint256 _projectId, uint256 _dataPoints, string memory _data) public {
        require(_dataPoints > 0, "Contribution must have data points");
        require(projects[_projectId-1].creator != address(0), "Project does not exist");

        _dataContributionIds.increment();
        uint256 newContributionId =_dataContributionIds.current(); 
        dataContributions.push(DataContribution(_data));

        contributions[_projectId][msg.sender] += _dataPoints;
        projects[_projectId-1].totalContributions += _dataPoints;
        emit ContributionAdded(newContributionId, _projectId, msg.sender, _dataPoints);
    }
    
    function purchaseDataset(uint256 _projectId) public payable {
        //require(projects[_projectId-1].exists, "Project does not exist");
        require(msg.value > 0, "Purchase amount must be greater than zero");

        Project storage project = projects[_projectId-1];
        uint256 totalContributions = project.totalContributions;
        require(totalContributions > 0, "No contributions have been made to this project");

        uint256 earnings = (msg.value) ;
        project.totalEarnings += earnings;

        //Distribute earnings to contributors
        for (uint256 i = 0; i < project.contributors.length; i++) {
            address contributor = project.contributors[i];
            uint256 contribution = contributions[_projectId][contributor];
            uint256 contributorEarnings = (contribution * earnings) / totalContributions;
            payable(contributor).transfer(contributorEarnings);
        }
        emit DatasetPurchased(_projectId, msg.sender, earnings);
    }

    //Get functions

    function getProject(uint256 _projectId) public view returns (Project memory) {
        return projects[_projectId-1];
    }

    function getProjects() public view returns (Project[] memory) {
        return projects;
    }

    function getOwnedProjects() public view returns (Project[] memory) {
        Project[] memory ownedProjects;
        for (uint256 i = 0; i < projects.length; i++) {
            if (projects[i].creator == msg.sender) {
                ownedProjects[i] = projects[i];
            }
        }
        return ownedProjects;
    }

    function getDataContribution(uint256 _dataContributionId) public view returns (DataContribution memory) {
        return dataContributions[_dataContributionId-1];
    }

    function getDataContributions() public view returns (DataContribution[] memory) {
        return dataContributions;
    }

    function getProjectContributors(uint256 _projectId) public view returns (address[] memory) {
        return projects[_projectId-1].contributors;
    }

    function getProjectContributions(uint256 _projectId) public view returns (uint256) {
        return projects[_projectId-1].totalContributions;
    }

    function getContributorContribution(uint256 _projectId, address _contributor) public view returns (uint256) {
        return contributions[_projectId][_contributor];
    }

    function getProjectContributorContribution(uint256 _projectId) public view returns (uint256) {
        return contributions[_projectId][msg.sender];
    }

    function getProjectEarnings(uint256 _projectId) public view returns (uint256) {
        return projects[_projectId-1].totalEarnings;
    }

}

