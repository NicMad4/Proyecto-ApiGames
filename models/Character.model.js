const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const characterSchema = new Schema(
  {
    id: Number,
    title: String,
    thumbnail: String,
    short_description: String,
    game_url: String,
    genre: String,
    platform: String,
    developer: String,
    release_date: String,
    freetogame_profile_url: String
  },
  {
    timestamps: true,
  }
);


characterSchema.pre("save", function(next) {
  // console.log(this)

  const nameToUpper = this.name.split(' ').map(word => word[0].toUpperCase() + word.slice(1).toLowerCase()).join(' ')

  this.name = nameToUpper

    next();
});


// const Character = model("Character", userSchema);

module.exports = model("Character", characterSchema);
