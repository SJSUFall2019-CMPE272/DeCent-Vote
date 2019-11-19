'use strict';

class Voter {

  constructor(id, registrarId, firstName, lastName) {
    if (this.validateVoter(id)) {
      this.voterId = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.ballotCreated = false;
      this.registrarId = registrarId;      
      this.type = 'voter';
      if (this.__isContract) {
        delete this.__isContract;
      }
      if (this.name) {
        delete this.name;
      }
      return this;
    } else {
      throw new Error('voterId is invalid. Must be 8 characters long');
    }
  }

  async validateVoter(voterId) {
    if (voterId.length == 8) {
      return true;
    } else {
      return false;
    }
  }

}

module.exports = Voter;