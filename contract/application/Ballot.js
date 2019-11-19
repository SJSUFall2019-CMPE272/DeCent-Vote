'use strict';

class Ballot {

  constructor(ctx, items, election, voterId) {
    if (this.validateBallot(ctx, voterId)) {
      this.votableItems = items;
      this.election = election;
      this.voterId = voterId;
      this.ballotCast = false;
      this.ballotId = Math.random().toString(25).substring(4, 17);
      this.type = 'ballot';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;
    } else {      
      throw new Error ('ballot already present for voter');
    }
  }

  async validateBallot(ctx, voterId) {
    const state = await ctx.stub.getState(voterId);
    if (!!state && state.length > 0) {
      let voter = JSON.parse(state.toString());
      if (voter.ballotCreated) {
        console.log('ballot already present for voter');
        return false;
      } else {
        return true;
      }
    } else {
      console.log('Invalid voter id');
      return false;
    }
  }

}

module.exports = Ballot;