// service/index.js
const axios = require('axios');

class CharactersApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://api.rawg.io/api/platforms?key=83a729a4b653492d8e187bdbcdd29d06'
    });
  }

  getAllCharacters = () => this.api.get("/"); //Aqui va el model

}


module.exports = CharactersApi;
