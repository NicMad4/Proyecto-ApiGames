const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const gameSchema = new Schema(
  {
    id: Number,
    title: String,
    thumbnail: String,
    short_description: String,
    game_url: String,
    genre: Number,
    platform: String,
    developer: String,
    release_date: String,
    freetogame_profile_url: String
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
