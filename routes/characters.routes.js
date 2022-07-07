const router = require("express").Router();

const alert = require("alert");
const isLoggedIn = require("../middleware/isLoggedIn");
const Character = require("../models/Character.model");
const Score = require("../models/Score.model");
const User = require("../models/User.model");
const Api = require("../services/ApiHandler");
const CharactersAPI = new Api()


router.get('/characters',(req, res)=>{
    
    
    CharactersAPI
    .getAllCharacters()
    .then((allCharacters) => {
        
        res.render('characters/list', {characters: allCharacters.data} )
        // console.log(allCharacters)
    })
    .catch(err => console.log(err));
    
    
    
})

router.post("/add-favorite", isLoggedIn ,(req, res) =>{
   
const query = ({ apiId, title, thumbnail, short_description, game_url, genre, platform, developer, release_date, freetogame_profile_url } = req.body)

console.log(query,"hola")

const idToCheck = req.body.apiId;
    Character.find({apiId: idToCheck})
	.then (charArray => {
        console.log("adios",charArray)
		//comprobar si ese apiId ya esta en db characters
		if (charArray.length === 0) {
            Character
                .create(query)
                .then(result => {
                  User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : result._id}})
                    .then(()=>{
                        res.redirect("/characters")
                    })
                })
                .catch(err => console.log(err))
        } else {
			User
            .findById(req.user._id)
            .then((user)=>{
                if (!user.favorites.includes(charArray[0]._id)){
                    User
                    .findByIdAndUpdate(req.user._id,{$push : {favorites : charArray[0]._id}})
                    .then(()=>{
                        res.redirect("/characters")
                    })
                }else{res.redirect("/characters")}
            })
            .catch((err)=>{
            console.log(err)
            })
            
            
            
		}
	}) 
})


router.post("/delete-favorite",isLoggedIn,(req,res)=>{
    const {id} = req.body
    User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))
})



router.get('/ratings/:id',(req, res)=>{
    let rating=[]
    Score.find({apiId:req.params.id})


    .then((scores)=>{
        scores.forEach((score)=>{
            rating.push(score.score)
            
        })
        let totalScore=0
        rating.forEach((score)=>{totalScore+=score
            
        })
        let average=(totalScore/rating.length).toFixed(2)
        
      
        //encontrar juego modificar media
        Character.findOneAndUpdate({apiId:req.params.id},{ rating_av : average})
        //hacer redirect
        .then(()=>{
            Character.find().sort([['rating_av', -1]])
            .then((game)=>{
                res.render("ratings",{game})
            })
           
        })
           
       
       
    })
    .catch(err => console.log(err))
    
            
   




})


router.post("/ratings",isLoggedIn,(req,res)=>{
    
   
    Score.create(req.body)
    
    .then((score)=>{
        res.redirect("ratings/"+score.apiId)
    })
  
    
//inicioprueba
// Score.findById(req.body.apiId)
// .then((juegoEncontrado)=>{
//     if(!juegoEncontrado.ratings.includes(req.body.apiId)){
//         Score.findByIdAndUpdate(req.body.apiId,{
//             $push:{ratings: score},
//             }).then(()=>{
//                 res.redirect("/ratings");
//             }),
//     }
// })
//finprueba



   /* User.findByIdAndUpdate(req.user._id,{$pull : {favorites : id}})
    .then(()=>{
        res.redirect("/profile")
    })
    .catch(err => console.log(err))*/
})

/**
 * ---arrays
{ field: { $in: [ value1, value2, ..... , valueN ] } }
{ field: { $nin: [ value1, value2, ..... , valueN ] } }
{ field: { $all: [ value1, value2, ..... , valueN ] } }
 */

module.exports = router;