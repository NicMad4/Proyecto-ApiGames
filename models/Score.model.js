/*
paso 1- crear modelo score: 
score,average score,apiId del juego.

paso 2- formulario con boton metodo POST- /Score.

paso 3-crear ruta POST Score input vacio(ApiId como name y ApiId como value), score/score.length y guardarlo
*/

const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const scoreSchema = new Schema(
  {
   score: Number,
   apiId: Number,
  },
);

module.exports = model("Score", scoreSchema);