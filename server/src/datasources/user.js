const { RESTDataSource } = require('apollo-datasource-rest');

class UserAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }
}

let users = [{
    id: 1,
    name: "Alina",
    patronymic: "Albertovna",
    surname: "Opolskaya"
}];

module.exports = users;