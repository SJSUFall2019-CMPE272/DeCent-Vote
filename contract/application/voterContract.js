'use strict';

const { Contract } = require('fabric-contract-api');
const path = require('path');
const fs = require('fs');

const electionDataJson = fs.readFileSync(path.join(process.cwd(), './application/util/electionData.json'), 'utf8');
const electionData = JSON.parse(electionDataJson);
let Ballot = require('./Ballot.js');
let Election = require('./Election.js');
let Voter = require('./Voter.js');
let VotableItem = require('./VotableItem.js');

class MyAssetContract extends Contract {
  /*
  Create election
  create and return voters
   */
  async init(ctx) {

    let voters = [];
    let votableItems = [];
    let elections = [];
    let election;
   
    let currElections = JSON.parse(await this.queryByObjectType(ctx, 'election'));

    if (currElections.length === 0) {

      let electionStartDate = await new Date(2021, 01, 10);
      let electionEndDate = await new Date(2021, 01, 12);
      //create election
      election = await new Election(electionData.electionName, electionData.electionCountry,
      electionData.electionYear, electionStartDate, electionEndDate);
      elections.push(election);
      await ctx.stub.putState(election.electionId, Buffer.from(JSON.stringify(election)));
    } else {
      election = currElections[0];
    }

    electionData.ballot.forEach(record => {
      let item = await new VotableItem(ctx, record.color, record.name);
      votableItems.push(item);
    });

    votableItems.forEach(record => {
      await ctx.stub.putState(record.votableId, Buffer.from(JSON.stringify(record)));
    });

    //generate ballots for all voters
    for (let i = 0; i < voters.length; i++) {
      if (!voters[i].ballot) {
        await this.generateBallot(ctx, votableItems, election, voters[i]);
      } else {
        console.log('Voters already have ballots');
        break;
      }
    }

    return voters;
  }

  /*
    updates with a ballot for a particular voter object
   */
  async generateBallot(ctx, voteItems, election, currentVoter) {
    let ballot = await new Ballot(ctx, voteItems, election, currentVoter.voterId);
    currentVoter.ballot = ballot.ballotId;
    currentVoter.ballotCreated = true;
    await ctx.stub.putState(ballot.ballotId, Buffer.from(JSON.stringify(ballot)));
    await ctx.stub.putState(currentVoter.voterId, Buffer.from(JSON.stringify(currentVoter)));
  }

  /*
  create nw voter and update state
   */
  async createVoter(ctx, args) {
    args = JSON.parse(args);
    let voter = await new Voter(args.voterId, args.registrarId, args.firstName, args.lastName);
    await ctx.stub.putState(voter.voterId, Buffer.from(JSON.stringify(voter)));
    let currElections = JSON.parse(await this.queryByObjectType(ctx, 'election'));
    if (currElections.length === 0) {
      let response = {};
      response.error = 'Error: There is no active election';
      return response;
    }
    let currElection = currElections[0];
    let votableItems = JSON.parse(await this.queryByObjectType(ctx, 'votableItem'));
    await this.generateBallot(ctx, votableItems, currElection, voter);
    let response = `voter with Id ${voter.voterId} is updated in the state`;
    return response;
  }

    /*
  to cast a vote for the color picked
   */
  async castVote(ctx, args) {
    args = JSON.parse(args);
    let votableId = args.picked;
    let electionExists = await this.myAssetExists(ctx, args.electionId);
    if (electionExists) {
      let electionState = await ctx.stub.getState(args.electionId);
      let election = await JSON.parse(electionState);
      let voterState = await ctx.stub.getState(args.voterId);
      let voter = await JSON.parse(voterState);
      if (voter.ballotCast) {
        let response = {};
        response.error = 'voter has already cast thier vote';
        return response;
      }
      let currentTime = await new Date();
      let parsedCurrentTime = await Date.parse(currentTime);
      let electionStart = await Date.parse(election.startDate);
      let electionEnd = await Date.parse(election.endDate);
      if (parsedCurrentTime >= electionStart && parsedCurrentTime < electionEnd) {
        let votableExists = await this.myAssetExists(ctx, votableId);
        if (!votableExists) {
          let response = {};
          response.error = 'Id does not exist!';
          return response;
        }
        let votableState = await ctx.stub.getState(votableId);
        let votable = await JSON.parse(votableState);
        await votable.count++;
        let result = await ctx.stub.putState(votableId, Buffer.from(JSON.stringify(votable)));
        console.log(result);
        voter.ballotCast = true;
        voter.picked = {};
        voter.picked = args.picked;
        let response = await ctx.stub.putState(voter.voterId, Buffer.from(JSON.stringify(voter)));
        console.log(response);
        return voter;
      } else {
        let response = {};
        response.error = 'the election is not valid now';
        return response;
      }
    } else {
      let response = {};
      response.error = 'the election or the voter does not exist!';
      return response;
    }
  }
  
    /*
  Checks to see if a key exists
   */
  async myAssetExists(ctx, key) {
    const asset = await ctx.stub.getState(key);
    return (!!asset && asset.length > 0);

  }

  async queryByObjectType(ctx, objectType) {
    let query = {
      selector: {
        type: objectType
      }
    };
    let results = await this.queryWithQueryString(ctx, JSON.stringify(query));
    return results;
  }

    /*
  Reads a key-value pair from the world state, based on the key given.
   */
  async readMyAsset(ctx, key) {
    const exists = await this.myAssetExists(ctx, key);
    if (!exists) {
      let response = {};
      response.error = `asset ${key} does not exist`;
      return response;
    }
    const assetState = await ctx.stub.getState(key);
    const asset = JSON.parse(assetState.toString());
    return asset;
  }

  /*
   Deletes a key-value pair from the state, based on the key.
   */
  async deleteMyAsset(ctx, key) {
    const exists = await this.myAssetExists(ctx, key);
    if (!exists) {
      throw new Error(`asset ${key} does not exist`);
    }
    await ctx.stub.deleteState(key);
  }

  async queryAll(ctx) {
    let query = {
      selector: {}
    };
    let results = await this.queryWithQueryString(ctx, JSON.stringify(query));
    return results;
  }

  async queryWithQueryString(ctx, queryString) {
    let results = await ctx.stub.getQueryResult(queryString);
    let allResults = [];
    while (true) {
      let currentResult = await results.next();
      if (currentResult.value && currentResult.value.value.toString()) {
        let jsonRes = {};
        jsonRes.Key = currentResult.value.key;
        try {
          jsonRes.Record = JSON.parse(currentResult.value.value.toString('utf8'));
        } catch (err) {
          console.log(err);
          jsonRes.Record = currentResult.value.value.toString('utf8');
        }
        allResults.push(jsonRes);
      }
      if (currentResult.done) {
        await results.close();        
        console.log(JSON.stringify(allResults));
        return JSON.stringify(allResults);
      }
    }
  }

}

module.exports = MyAssetContract;