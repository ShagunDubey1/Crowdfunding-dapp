import hre from "hardhat";
import { expect } from "chai";
import { ContractFactory } from "ethers";
import { IDGenerator } from "../typechain-types/IDGenerator";
import { Crowdfunding } from "../typechain-types/Crowdfunding";

const tokens = (n: number) => hre.ethers.parseUnits(n.toString(), "ether");

const dummyCampaign = {
  endDateTime: "0000",
  title: "Example Campaign",
  targetGoalAmount: tokens(2),
  minimumGoalAmount: tokens(1.5),
  description: "Some description",
  thumbnailURI: "http://google.com",
} as const;

const EventIdentifiers = {
  createCampaign: "CreateCampaign",
  contributeToCampaign: "ContributeToCampaign",
} as const;

describe("Crowdfunding Platform", () => {
  let deployer: any, user1: any, user2: any;
  let app: Crowdfunding, idGenerator: IDGenerator;

  beforeEach(async () => {
    [deployer, user1, user2] = await hre.ethers.getSigners();

    const IDGenerator: ContractFactory =
      await hre.ethers.getContractFactory("IDGenerator");
    idGenerator = (await IDGenerator.connect(deployer).deploy()) as IDGenerator;

    await idGenerator.waitForDeployment();

    const Crowdfunding: ContractFactory =
      await hre.ethers.getContractFactory("Crowdfunding");
    app = (await Crowdfunding.connect(deployer).deploy(
      idGenerator.getAddress(),
    )) as Crowdfunding;

    await idGenerator.waitForDeployment();
  });

  describe("Deployment", () => {
    it("Match Deployer", async () => {
      const data = await app.getDeployer();
      expect(data).to.be.equal(deployer);
    });
  });

  describe("Create Campaign", () => {
    let transaction: any, receipt: any, logs: any[];

    beforeEach(async () => {
      transaction = await app.createCampaign(
        dummyCampaign.title,
        dummyCampaign.endDateTime,
        dummyCampaign.description,
        dummyCampaign.thumbnailURI,
        dummyCampaign.targetGoalAmount,
        dummyCampaign.minimumGoalAmount,
      );

      receipt = await transaction.wait();
      logs = receipt?.logs.filter(
        (log: any) => log.fragment.name === EventIdentifiers.createCampaign,
      );
    });

    it("Event Emitted", async () => {
      expect(transaction).to.emit(app, EventIdentifiers.createCampaign);
    });

    it("Match Campaign", async () => {
      const data = await app.getCampaign(logs[0].args._campaign.id);
      expect(data.title).to.be.equal(dummyCampaign.title);
      expect(data.endDateTime).to.be.equal(dummyCampaign.endDateTime);
      expect(data.description).to.be.equal(dummyCampaign.description);
      expect(data.thumbnailURI).to.be.equal(dummyCampaign.thumbnailURI);
      expect(data.targetGoalAmount).to.be.equal(dummyCampaign.targetGoalAmount);
      expect(data.minimumGoalAmount).to.be.equal(
        dummyCampaign.minimumGoalAmount,
      );
    });

    it("Match User's Campaigns Count", async () => {
      const data = await app.getUserCampaigns();
      expect(data.length).to.be.equal(1);
    });

    it("Match Public Campaigns Count", async () => {
      const data = await app.getPublicCampaigns();
      expect(data.length).to.be.equal(0);
    });
  });

  describe("Contribute Money To Campaign", () => {
    let transaction: any, receipt: any, logs: any[];
    const donationAmount = tokens(2);

    beforeEach(async () => {
      transaction = await app
        .connect(user1)
        .createCampaign(
          dummyCampaign.title,
          dummyCampaign.endDateTime,
          dummyCampaign.description,
          dummyCampaign.thumbnailURI,
          dummyCampaign.targetGoalAmount,
          dummyCampaign.minimumGoalAmount,
        );

      receipt = await transaction.wait();
      logs = receipt?.logs.filter(
        (log: any) => log.fragment.name === EventIdentifiers.createCampaign,
      );

      transaction = await app
        .connect(user2)
        .contributeToCampaign(logs[0].args._campaign.id, {
          value: donationAmount,
        });
      await transaction.wait();
    });

    it("Check Raised Amount", async () => {
      const data = await app.getCampaign(logs[0].args._campaign.id);
      expect(data.raisedAmount).to.be.equal(donationAmount);
    });

    it("Check Contract Holdings", async () => {
      const data = await hre.ethers.provider.getBalance(app.getAddress());
      expect(data).to.be.equal(donationAmount);
    });
  });

  describe("End Campaign and Withdraw Funds", () => {
    let transaction: any, receipt: any, logs: any[];
    const donationAmount = tokens(2);

    beforeEach(async () => {
      transaction = await app
        .connect(user1)
        .createCampaign(
          dummyCampaign.title,
          dummyCampaign.endDateTime,
          dummyCampaign.description,
          dummyCampaign.thumbnailURI,
          dummyCampaign.targetGoalAmount,
          dummyCampaign.minimumGoalAmount,
        );

      receipt = await transaction.wait();
      logs = receipt?.logs.filter(
        (log: any) => log.fragment.name === EventIdentifiers.createCampaign,
      );

      transaction = await app
        .connect(user2)
        .contributeToCampaign(logs[0].args._campaign.id, {
          value: donationAmount,
        });
      await transaction.wait();

      transaction = await app
        .connect(user1)
        .endCampaignAndWithdrawFunds(logs[0].args._campaign.id);
      await transaction.wait();
    });

    it("Check campaign status", async () => {
      const data = await app.getCampaign(logs[0].args._campaign.id);
      expect(data.status).to.be.equal("Completed");
    });
  });
});
