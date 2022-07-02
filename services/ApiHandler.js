// service/index.js
const axios = require('axios');

class CharactersApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://www.freetogame.com/api/games' //actualització api
    });
  }

  getAllCharacters = () => this.api.get("/"); //Aqui va el model

}


module.exports = CharactersApi;
