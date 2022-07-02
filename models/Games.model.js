const mongoose = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new mongoose.Schema(
  {
    id: {
      type: Number
    },
    
    title: {
      type: String
    },

    thumbnail: {
      type: String
    },

    short_description: {
      type: String
    },

    game_url: {
      type: String
    },
    genre: {
      type: String
    },

    platform: {
      type: String
    },

    developer: {
      type: String
    },

    release_date: {
      type: String
    },
    freetogame_profile_url: {
      type: String
    }
  }
);


gameSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});

const Games = mongoose.model("Games", dronSchema);

module.exports = Games;
