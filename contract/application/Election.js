'use strict';

class Election {

  async validateElection(electionId) {
    if (electionId) {
      return true;
    } else {
      return false;
    }
  }
 
  constructor(name, country, year, startDate, endDate) {
      this.electionId = Math.random().toString(25).substring(10, 15);
      this.name = name;
      this.country = country;
      this.year = year;
      this.startDate = startDate;
      this.endDate = endDate;
      this.type = 'election';
      if (this.__isContract) {
        delete this.__isContract;
      }
      return this;
  }

}

module.exports = Election;