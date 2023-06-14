// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CitizenScienceRewards {
     struct Contributor {
        address contributorAddress;
        uint256 earnings;
    }
    
    struct Project {
        address creator;
        string title;
        Contributor[] contributors;
        uint256 totalContributions;
        uint256 totalEarnings;
    }

    mapping(uint256 => Project) public projects;
    mapping(uint256 => mapping(address => uint)) public contributions;
    uint256 public projectIdCounter;

    event ProjectCreated(uint256 indexed id, address indexed creator, string title);
    event ContributorAdded(uint256 indexed id, address indexed contributor);
    event DatasetPurchased(uint256 projectId, address indexed buyer, uint256 earnings);

    function createProject(string memory _title) public {
        projectIdCounter++;
        projects[projectIdCounter] = Project({
            creator: msg.sender,
            title: _title,
            totalContributions: 0,
            contributors:new Contributor[](0),
            totalEarnings: 0
        });
        emit ProjectCreated(projectIdCounter, msg.sender, _title);
    }

    function addContributor(uint256 _projectId) external {
        require(_projectId <= projectIdCounter, "Invalid project ID");
        Project storage project = projects[_projectId];
        require(msg.sender != project.creator, "Owner cannot be a contributor");
        
        // Check if contributor already exists
        for (uint256 i = 0; i < project.contributors.length; i++) {
            require(project.contributors[i].contributorAddress != msg.sender, "Already a contributor");
        }
        
        project.contributors.push(Contributor(msg.sender, 0));
        emit ContributorAdded(_projectId, msg.sender);
    }
    
    function purchaseDataset(uint256 _projectId) public payable {
        require(projects[_projectId].creator != address(0), "Project does not exist");
        require(msg.value > 0, "Purchase amount must be greater than zero");

        Project storage project = projects[_projectId];
        uint256 totalContributions = project.totalContributions;
        require(totalContributions > 0, "No contributions have been made to this project");

        uint256 earnings = (msg.value * 50) / 100;
        project.totalEarnings += earnings;

        for (uint256 i = 1; i <= project.contributors.length; i++) {
            address contributor = project.contributors[i].contributorAddress;
            uint256 contribution = contributions[_projectId][contributor];
            if (contribution > 0) {
                uint256 contributorEarnings = (contribution * earnings) / totalContributions;
                payable(contributor).transfer(contributorEarnings);
            }
        }

        emit DatasetPurchased(_projectId, msg.sender, earnings);
    }

}

