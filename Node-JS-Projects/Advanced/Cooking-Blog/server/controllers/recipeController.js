require('../models/database');
const Category = require('../models/Category')
const Recipe = require('../models/Recipe')

const path = require('path');
const fs = require('fs');

// Assuming filePath is constructed somewhere in your code
const safeFilePath = path.resolve(__dirname, 'uploads', path.basename(filePath));

// Ensure the filePath is within the intended directory
if (safeFilePath.startsWith(path.resolve(__dirname, 'uploads'))) {
    fs.readFile(safeFilePath, (err, data) => {
        if (err) throw err;
        // handle data
    });
} else {
    // Handle invalid file path
}

/**
 * GET/
 * Homepage
 */

exports.homepage = async(req,res)=>{

    try{
        const limitNumber=5;
        const categories=await Category.find({}).limit(limitNumber);
        //const latest= await Recipe.find({}) till this we will get those 
        //recipes which are actually added first so 
        //these will show the oldest recipe 
        //in order to get the latest recipe we sort it out like below
        const latest= await Recipe.find({}).sort({_id:-1}).limit(limitNumber+1);

        const thai=await Recipe.find({'category' : 'Thai'}).limit(limitNumber);
        const american=await Recipe.find({'category' : 'American'}).limit(limitNumber);
        const chinese=await Recipe.find({'category' : 'Chinese'}).limit(limitNumber);
        const mexican=await Recipe.find({'category' : 'Mexican'}).limit(limitNumber);
        const indian=await Recipe.find({'category' : 'Indian'}).limit(limitNumber);

        const food={ latest ,thai,american, chinese, mexican, indian};



        // In order to display the categories we need to pass the object that we are getting from the database
        // Thats way we are passing categoreies also in the index 
        res.render('index', {title : 'Cooking Blog - Home',categories,food});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
}

/**
 * GET/categories
 * Categories
 */

// From this we are getting view all and exploring all the categories

exports.exploreCategories = async(req,res)=>{

    try{
        const limitNumber=20;
        const categories=await Category.find({}).limit(limitNumber);

        // In order to display the categories we need to pass the object that we are getting from the database
        // Thats way we are passing categoreies also in the index 
        res.render('categories', {title : 'Cooking Blog - Categories',categories});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
}

/**
 * GET/categories/:id
 * Categories By ID
 */

// From this we are getting all the recipes which are in that category

exports.exploreCategoriesById = async(req,res)=>{
    try{
        let categoryId=req.params.id;
        const limitNumber=20;
        const categoryById=await Recipe.find({'category':categoryId}).limit(limitNumber);

        res.render('categories', {title : 'Cooking Blog - Categories',categoryById});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
}






/**
 * GET/recipes/:id
 * Recipes
 */

// From this we are getting the detailed view of the recipes

exports.exploreRecipe = async(req,res)=>{
  try{
      let recipeId=req.params.id;
      const recipe=await Recipe.findById(recipeId); 
      res.render('recipe', {title : 'Cooking Blog - Recipe',recipe});
  }catch(error){
      res.status(500).send({message:error.message || "Error Occured"});
  }
}




/**
 * POST/search
 * Search
 *///to search we are going to use this

exports.searchRecipe = async(req,res)=>{
    try{
        let searchTerm= req.body.searchTerm;
        let recipe =await Recipe.find( { $text: { $search: searchTerm, $diacriticSensitive: true}});
        // res.json(recipe);        we are successfully getting the json file of recipe while search 
        res.render('search', {title : 'Cooking Blog - Search',recipe});
        
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
}


/**
 * GET/explore-latest
 * Explore Latest
 */

// From this we are getting the detailed view of the recipes

exports.exploreLatest = async(req,res)=>{
    try{
        const limitNumber=20;
        const recipe=await Recipe.find({}).sort({ _id: -1}).limit(limitNumber); 
        res.render('explore-latest', {title : 'Cooking Blog - Explore Latest',recipe});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
  }
  


  //we copied from the above and now we are going to do minor changes and get the data in random order
  /**
 * GET/explore-random
 * Explore Random
 */

exports.exploreRandom = async(req,res)=>{
    try{
        let count=await Recipe.find().countDocuments();
        let random=Math.floor(Math.random() * count);
        let recipe=await Recipe.findOne().skip(random).exec();
        // res.json(recipe);

        res.render('explore-random', {title : 'Cooking Blog - Explore Random Recipes',recipe});
    }catch(error){
        res.status(500).send({message:error.message || "Error Occured"});
    }
  }

  /**
 * GET/submit-recipe
 * Submit Recipe
 */

exports.submitRecipe = async(req,res)=>{
    const infoErrorObj= req.flash('infoErrors');
    const infoSubmitObj= req.flash('infoSubmit');
     res.render('submit-recipe', {title : 'Cooking Blog - Submit Recipe',infoErrorObj,infoSubmitObj});   
}


  /**
 * POST/submit-recipe
 * Submit Recipe
 */

    //in order to show flash messages that you have successfully added recipe at end
/**
 * POST /submit-recipe
 * Submit Recipe
*/
exports.submitRecipeOnPost = async(req, res) => {
    try {
  
      let imageUploadFile;
      let uploadPath;
      let newImageName;
  
      if(!req.files || Object.keys(req.files).length === 0){
        console.log('No Files where uploaded.');
      } else {
  
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
  
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
  
        imageUploadFile.mv(uploadPath, function(err){
          if(err) return res.satus(500).send(err);
        })
  
      }
  
      const newRecipe = new Recipe({
        name: req.body.name,
        description: req.body.description,
        email: req.body.email,
        ingredients: req.body.ingredients,
        category: req.body.category,
        image: newImageName
      });
      
      await newRecipe.save();
  
      req.flash('infoSubmit', 'Recipe has been added.')
      res.redirect('/submit-recipe');
    } catch (error) {
      // res.json(error);
      req.flash('infoErrors', error);
      res.redirect('/submit-recipe');
    }
}

//about and contact 
exports.about = (req, res) => {
    res.render('about', { title: 'About' });
  };
  
  exports.contact = (req, res) => {
    res.render('contact', { title: 'Contact' });
  };
  
  exports.submitContactForm = (req, res) => {
    // Handle the contact form submission logic here
    // For now, you can just redirect back to the contact page or display a success message
    res.render('contact', { title: 'Contact', message: 'Thank you for reaching out. We will get back to you soon!' });
  };
  
  

  //UPDATING THE RECIPE WITH SOME QUERIES
//   async function updateRecipe(){
//     try {
//         const res=await Recipe.updateOne({name:'Simran Saini special'},{name:'Simran Saini Special'});
//         res.n;      //Number of documnents matched 
//         res.nModified;  //Number of documents modified
//     } catch (error) {
//         console.log(error);
//     }
//   }
//   updateRecipe();


//Same is DELETING THE RECIPE TOO
    // async function DeleteRecipe(){
    //     try {
    //         const res=await Recipe.deleteOne({name:'Simran Saini Special'});
    //     } catch (error) {
    //         console.log(error);
    //     }
    //   }
    //   DeleteRecipe();








// DUMMY DATA INSERTION HERE--------------------------------



//IN ORDER TO INSERT THE DUMMY DATA ABOUT THE RECIPES INTO THE MONGODB
//I HAVE ALREADY INCLUDED const Recipes ABOVE IN ORDER TO FETCH THE SCEMAS OF THE RECIPE
//copied it from jamio olivo website
// async function insertDymmyRecipeData(){
//   try {
//     await Recipe.insertMany([
//       {
//         name: "Key lime pie",
//         description: `Preheat the oven to 175ºC/gas 3. Lightly grease a 22cm metal or glass pie dish with a little of the butter.
//         For the pie crust, blend the biscuits, sugar and remaining butter in a food processor until the mixture resembles breadcrumbs.
//         Transfer to the pie dish and spread over the bottom and up the sides, firmly pressing down.
//         Bake for 10 minutes, or until lightly browned. Remove from oven and place the dish on a wire rack to cool.
//         For the filling, whisk the egg yolks in a bowl. Gradually whisk in the condensed milk until smooth.
//         Mix in 6 tablespoons of lime juice, then pour the filling into the pie crust and level over with the back of a spoon.
//         Return to the oven for 15 minutes, then place on a wire rack to cool.
//         Once cooled, refrigerate for 6 hours or overnight.
//         To serve, whip the cream until it just holds stiff peaks. Add dollops of cream to the top of the pie, and grate over some lime zest, for extra zing if you like.
        
//         Source: https://www.jamieoliver.com/recipes/fruit-recipes/key-lime-pie/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "4 large free-range egg yolks",
//           "400 ml condensed milk",
//           "5 limes",
//           "200 ml double cream"
//         ],
//         category: "American",
//         image: "key-lime-pie.jpg"
//       },
//       {
//         name: "Thai green curry",
//         description: `Preheat the oven to 180ºC/350ºF/gas 4.
//         Wash the squash, carefully cut it in half lengthways and remove the seeds, then cut into wedges. In a roasting tray, toss with 1 tablespoon of groundnut oil and a pinch of sea salt and black pepper, then roast for around 1 hour, or until tender and golden.
//         For the paste, toast the cumin seeds in a dry frying pan for 2 minutes, then tip into a food processor.
//         Peel, roughly chop and add the garlic, shallots and ginger, along with the kaffir lime leaves, 2 tablespoons of groundnut oil, the fish sauce, chillies (pull off the stalks), coconut and most of the coriander (stalks and all).
//         Bash the lemongrass, remove and discard the outer layer, then snap into the processor, squeeze in the lime juice and blitz into a paste, scraping down the sides halfway.
//         Put 1 tablespoon of groundnut oil into a large casserole pan on a medium heat with the curry paste and fry for 5 minutes to get the flavours going, stirring regularly.
//         Tip in the coconut milk and half a tin’s worth of water, then simmer and thicken on a low heat for 5 minutes.
//         Stir in the roasted squash, roughly chop and add the leftover greens and leave to tick away on the lowest heat, then taste and season to perfection.
//         Meanwhile, cube the tofu and fry in a pan on a medium- high heat with 1 tablespoon of groundnut oil for 2 minutes, or until golden.
//         Crush the peanuts in a pestle and mortar and toast in the tofu pan until lightly golden.
//         Serve the curry topped with the golden tofu and peanuts, drizzled with a little sesame oil. Slice the chilli and sprinkle over with the reserved coriander leaves. Serve with lime wedges, for squeezing over. Great with sticky rice.

//         Source: https://www.jamieoliver.com/recipes/butternut-squash-recipes/thai-green-curry/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "1 butternut squash (1.2kg)",
//           "groundnut oil",
//           "2x 400 g tins of light coconut milk",
//           "400 g leftover cooked greens, such as Brussels sprouts, Brussels tops, kale, cabbage, broccoli",
//           "350 g firm silken tofu",
//           "75 g unsalted peanuts",
//           "sesame oil",
//           "1 fresh red chilli",
//           "2 limes"
//         ],
//         category: "Thai",
//         image: "thai-green-curry.jpg"
//       },
//       {
//         name: "Thai-inspired vegetable broth",
//         description: `Peel and crush the garlic, then peel and roughly chop the ginger. Trim the greens, finely shredding the cabbage, if using. Trim and finely slice the spring onions and chilli. Pick the herbs.
//         Bash the lemongrass on a chopping board with a rolling pin until it breaks open, then add to a large saucepan along with the garlic, ginger and star anise.
//         Place the pan over a high heat, then pour in the vegetable stock. Bring it just to the boil, then turn down very low and gently simmer for 30 minutes.
        
//         Source: https://www.jamieoliver.com/recipes/vegetables-recipes/asian-vegetable-broth/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "3 cloves of garlic",
//           "5cm piece of ginger",
//           "200 g mixed Asian greens , such as baby pak choi, choy sum, Chinese cabbage",
//           "2 spring onions",
//           "1 fresh red chilli",
//           "5 sprigs of fresh Thai basil",
//           "1 stick of lemongrass",
//           "2 star anise",
//           "800 ml clear organic vegetable stock",
//           "1 teaspoon fish sauce (optional)",
//           "1 teaspoon soy sauce",
//           "1 small punnet shiso cress",
//           "1 lime"
//         ],
//         category: "Thai",
//         image: "thai-inspired-vegetable-broth.jpg"
//       },
//       {
//         name: "Thai-Chinese-inspired pinch salad",
//         description: `Peel and very finely chop the ginger and deseed and finely slice the chilli (deseed if you like). Toast the sesame seeds in a dry frying pan until lightly golden, then remove to a bowl.
//         Mix the prawns with the five-spice and ginger, finely grate in the lime zest and add a splash of sesame oil. Toss to coat, then leave to marinate.
        
//         Source: https://www.jamieoliver.com/recipes/seafood-recipes/asian-pinch-salad/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "5 cm piece of ginger",
//           "1 fresh red chilli",
//           "25 g sesame seeds",
//           "24 raw peeled king prawns , from sustainable sources (defrost first, if using frozen)",
//           "1 pinch Chinese five-spice powder"
//         ],
//         category: "Chinese",
//         image: "thai-chinese-inspired-pinch-salad.jpg"
//       },
//       {
//         name: "Tequila michelada",
//         description: `TO SERVE Rub the rim of a tall glass with a wedge of lime, then dip it into fine sea salt (Maldon smoked salt would be awesome here). Halve the tomato and grate the cut side on a box grater into a perfumed slurry, discarding the skin and seeds. Pour into the glass, along with the tequila. Squeeze in the juice from your lime wedge, add a dash of hot chilli sauce, and stir. Drop in a few chunky ice cubes, then top up the glass with cold lager.
        
//         Source: https://www.jamieoliver.com/recipes/drink-recipes/tequila-michelada/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "1 lime",
//           "fine sea salt",
//           "1 large ripe tomato",
//           "30 ml golden tequila",
//           "hot chilli sauce",
//           "a few ice cubes"
//         ],
//         category: "Mexican",
//         image: "tequila-michelada.jpg"
//       },
//       {
//         name: "Tomato enchiladas with cheese",
//         description: `Pour the passata into a small frying pan. Add the salt and oregano and bring to a quick boil over a medium heat. Once it starts boiling, turn off the heat and set aside.
//         Place the queso fresco or ricotta in a bowl and add the coriander and salt. Mix well and set aside. To make the entomatadas, gather the tortillas, the cheese filling, warmed tomato sauce and a large plate.
//         Heat the oil over a medium heat for around 3 minutes, using a clean frying pan, big enough to fry the corn tortillas individually.
//         Using a pair of kitchen tongs, grab a cold tortilla, fry for one minute, flipping sides halfway through cooking. Grab with the pair of tongs and place in the tomato sauce. Drench the tortilla in it and then remove.
//         Put on the plate, add 1 tablespoon of the cheese filling then roll the tortilla. Transfer to a platter dish.
//         Repeat the process with the remaining tortillas until all the entomatadas are made and sitting on your platter.
//         To serve, simply scatter some shredded lettuce, avocado slices, queso fresco or feta and soured cream over your platter. Serve with some fried pinto beans on the side.
        
//         Source: https://www.jamieoliver.com/recipes/vegetable-recipes/tomato-enchiladas-with-cheese/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "125 ml passata",
//           "½ teaspoon sea salt",
//           "pinch of dried oregano",
//           "125 g queso fresco or ricotta",
//           "50 g fresh coriander , chopped",
//           "½ teaspoon sea salt",
//           "60 ml sunflower oil",
//           "12 corn tortillas , cold (shop-bought or see here for homemade)",
//           "2 handfuls of thinly shredded iceberg lettuce",
//           "1 perfectly ripe hass avocado , thinly sliced",
//           "75 g queso fresco or feta cheese , crumbled",
//           "60 ml soured cream"
//         ],
//         category: "Mexican",
//         image: "tomato-enchiladas-with-cheese.jpg"
//       },
//       {
//         name: "Griddled avocado & broccoli tacos",
//         description: `Place a griddle pan over a high heat, scatter in 50g of pumpkin seeds and toast for 1 to 2 minutes, then remove to a bowl.
//         Cut 1 head of broccoli into 1cm slices, then toss in a little olive oil and a pinch of sea salt and black pepper. Lay them on the hot griddle and cook for 3 to 4 minutes on each side, or until charred and just cooked through – you want them to retain a bit of bite.
//         Peel, destone and slice 3 ripe avocados into wedges.
//         Remove the broccoli from the griddle and add the avocado wedges, griddling until lightly charred on both sides.
//         For the dressing, put 45g of fresh coriander (stalks and all) into a blender with 250g of ricotta and 1 splash of milk. Squeeze in the juice from 2 limes and peel and finely grate in 1 clove of garlic.
//         Season with salt and pepper, blitz until combined, then spoon onto a platter.
//         Top the dressing with the griddled veg and a drizzle of olive oil. Pick over the remaining 15g of coriander leaves and sprinkle with the toasted pumpkin seeds.
//         Finish with a sprinkling of cayenne pepper. Serve with a pile of tacos and let everyone help themselves.

//         Source: https://www.jamieoliver.com/recipes/avocado-recipes/avocado-and-broccoli-tacos/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "50 g pumpkin seeds",
//           "1 head of broccoli",
//           "olive oil",
//           "3 ripe avocados",
//           "ground cayenne pepper",
//           "16 tacos",
//           "1 large bunch of fresh coriander , (60g)",
//           "250 g ricotta cheese",
//           "1 splash of milk",
//           "1 clove of garlic"
          
//         ],
//         category: "Mexican",
//         image: "griddled-avocado-&-broccoli-tacos.jpg"
//       },
//       {
//         name: "Mega veggie nachos",
//         description: `Place the oven on to 180ºC/350ºF/gas 4.
//         Place a griddle pan over a high heat and cook the whole peppers, chilli, tomatoes and trimmed spring onions until soft and charred.
//         Put the peppers and chilli in a bowl, cover with clingfilm and set aside for 5 minutes.
//         Dice the tomatoes and spring onions, then add to another bowl. Peel, deseed and dice the peppers and chillies, then add to the tomatoes and spring onions.
//         Pick in a few coriander leaves, season, then mix in a good squeeze of lime juice and a drizzle of oil. Wipe the griddle pan and return to the heat.
//         Cut the tortillas into wedges and arrange over two baking sheets. Bake in the oven for 5 minutes, or until golden.
//         Place a large frying pan over a high heat and toast the cumin seeds for a few seconds. Add the Tabasco sauce and beans and cook for a few minutes, or until thick, stirring occasionally.
//         Peel, destone and slice the avocado into wedges, then drizzle with the remaining lime juice.
//         Arrange the tortillas in a bowl. Top with the beans, salsa, dressed avocado, feta and pick over the remaining coriander, then serve.
        
//         Source: https://www.jamieoliver.com/recipes/vegetable-recipes/mega-veggie-nachos/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "2 mixed-colour peppers",
//           "1 fresh red chilli",
//           "3 ripe tomatoes , on the vine",
//           "6 spring onions",
//           "1 bunch of fresh coriander",
//           "2 limes",
//           "extra virgin olive oil",
//           "4 corn tortillas",
//           "½ teaspoon cumin seeds",
//           "Chipotle Tabasco sauce",
//           "1 x 400g tin of black beans",
//           "1 ripe avocado",
//           "20 g feta cheese"
//         ],
//         category: "Mexican",
//         image: "mega-veggie-nachos.jpg"
//       },
//       {
//         name: "Mango chutney",
//         description: `Peel, stone and roughly chop the mangos; set aside.
//         Remove the cardamom seeds from the pods. Peel and finely chop the garlic, then trim and finely chop the chilli.
//         Add the vinegar and sugar to a large pan over a medium heat, stirring until the sugar dissolves. Bring to the boil and reduce by a couple of centimetres.
//         Gently toast the cumin, coriander and cardamom seeds until aromatic, then crush with the chilli powder using a pestle and mortar. Add to the vinegar pan, along with the chopped mango, nigella seeds and 2 teaspoons of sea salt.
//         Finely grate in the ginger, add the garlic and bring to a boil. Reduce the heat and simmer for 45 minutes to 1 hour until it has a thick, syrupy consistency, adding the chopped chilli for the last 10 minutes.
//         Divide among sterilised jars, seal and keep for up to 6 months.
        
//         Source: https://www.jamieoliver.com/recipes/fruit-recipes/mango-chutney/`,
//         email: "hello@gmail.com",
//         ingredients: [
//           "2 kg mangos (firm, but ripe)",
//           "8 cardamom pods",
//           "2 cloves of garlic",
//           "1 fresh red chilli",
//           "500 ml white wine vinegar",
//           "400 g granulated sugar",
//           "1 teaspoon cumin seeds",
//           "1 teaspoon coriander seeds",
//           "1 teaspoon chilli powder",
//           "2 teaspoons nigella seeds",
//           "8cm piece of ginger"
//         ],
//         category: "Indian",
//         image: "mango-chutney.jpg"
//       },
//       {
//         name: "Aloo gobi",
//         description: `Bring a pot of salted water to the boil and add your cauliflower. Bring back to the boil for 1 minute, then remove the florets with a slotted spoon and leave in a colander. Keep the cauliflower water to one side.
//         Heat a wide pan big enough to hold all the ingredients at once. Add a good splash of vegetable oil and when it’s hot, add the mustard seeds, the asafoetida, the curry leaves and turmeric. Fry for a few seconds then add the diced potatoes, just enough of the cauliflower water to cover them and some salt. Cover with a lid and simmer gently until the potatoes are just cooked. Add the peas, chillies and cauliflower florets, stir and replace the lid. Cook over a gentle heat until everything is cooked and soft, and the liquid has reduced. Taste and season well with salt and pepper, sprinkle with loads of chopped coriander and some coconut shavings and serve.
        
//         Source: https://www.jamieoliver.com/recipes/vegetables-recipes/the-best-aloo-gobi/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "3 coloured chillies, seeded and chopped",
//           "1 small bunch fresh coriander",
//           "coconut shavings",
//           "1 small head cauliflower, or ½ a big one, cut into large florets",
//           "1 splash vegetable oil",
//           "1 tablespoon black mustard seeds",
//           "1 large pinch asafoetida",
//           "12 curry leaves, pulled off their stalk",
//           "½ teaspoon ground turmeric",
//           "4 medium-sized potatoes, peeled and cut into chunks",
//           "1 big handful frozen peas"
//         ],
//         category: "Indian",
//         image: "aloo-gobi.jpg"
//       },
//       {
//         name: "Mango lassi",
//         description: `Crush the cardamom pods in a pestle and mortar (if using) and discard the green husks. Bash the seeds to a fine powder and set aside.
//         Cut the juicy flesh off the mangos (the riper they are, the better), leaving the stone in the middle and trimming away all the skin.
//         Place the mango flesh and any juices into a blender with the yoghurt, ice cubes, 1 tablespoon of honey and the ground cardamom (if using).
//         Blitz until smooth, have a taste, and add a little more honey, if needed. Serve immediately.

//         Source: https://www.jamieoliver.com/recipes/fruit-recipes/mango-lassi/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "6 green cardamom pods, optional",
//           "2 ripe mangos",
//           "500 g low-fat natural yoghurt",
//           "100 g ice cubes",
//           "runny honey, optional"
//         ],
//         category: "Indian",
//         image: "mango-lassi.jpg"
//       },
//       {
//         name: "Saag paneer",
//         description: `To make the paneer, line a sieve with a large piece of muslin and place over a bowl.
//         Heat the milk in a large heavy-based pan over a medium heat. Gently bring to the boil, then reduce the heat to a gentle simmer. Gradually add 4 tablespoons of lemon juice, stirring continuously so the curds and whey separate.
//         Carefully pour the mixture into the sieve so the curds collect in the muslin. Place under cold running water to get rid of any whey, then gather up the muslin and squeeze out the excess moisture.
//         Keeping the muslin bundle in the sieve, cover it with a plate and top with a few heavy weights (a couple of tins work well). Place in the fridge for 1 hour 30 minutes to set. Once set, cut the paneer into 2cm chunks.
//         Drizzle a lug of oil into a large non-stick frying pan over a medium heat, add the paneer and fry for 5 minutes, or until golden, stirring frequently. Using a slotted spoon, transfer to a double layer of kitchen paper to drain.
//         Peel and finely chop the onion, garlic and ginger.
//         Return the pan to a medium-low heat, adding a splash more oil, if needed. Add the cumin seeds, fry for 1 minute, then add the onion and cook for around 8 minutes, or until softened.
//         Stir in the garlic, ginger, garam masala and turmeric. Halve, deseed and very finely chop the tomato, add to the pan and cook for a further 10 minutes, or until softened but not coloured, stirring occasionally.
//         Stir in the frozen spinach, cover and cook for 5 minutes, then stir in the cream, paneer and a splash of boiling water.
//         Reduce the heat to low and cook for a further 5 minutes with the lid off, or until reduced to a deliciously creamy consistency. Season to taste with sea salt and black pepper and serve immediately.

//         Source: https://www.jamieoliver.com/recipes/vegetables-recipes/saag-paneer/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "groundnut oil",
//           "1 onion",
//           "2 cloves of garlic",
//           "5 cm piece of ginger",
//           "1 teaspoon cumin seeds",
//           "2 teaspoons garam masala",
//           "½ teaspoon ground turmeric",
//           "1 ripe tomato",
//           "600 g frozen spinach",
//           "50 ml single cream",
//           "sea salt",
//           "freshly ground black pepper",
//           "1.5 litres whole milk",
//           "1 lemon"
//         ],
//         category: "Indian",
//         image: "saag-paneer.jpg"
//       },
//       {
//         name: "Masala Chai",
//         description: `Place the tea bags, cinnamon, cloves, ginger and milk into a small pan, grate in two-thirds of the nutmeg and add 350ml of water.
//         Give it a stir and place over a medium-high heat.
//         Gently bring to the boil, then reduce the heat and simmer for 12 to 15 minutes to allow the flavours to infuse.
//         Strain into a teapot or straight into cute little heatproof glasses. Serve with a drizzle of honey, agave or maple syrup to sweeten, if you like.

//         Source: https://www.jamieoliver.com/recipes/drink-recipes/spiced-chai/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "4 English breakfast tea bags",
//           "2 cinnamon sticks",
//           "4 cloves",
//           "1 teaspoon ground ginger",
//           "600 ml milk",
//           "1 whole nutmeg, for grating",
//           "OPTIONAL: honey, or maple or agave syrup"
//         ],
//         category: "Indian",
//         image: "masala-chai.jpg"
//       },
//       {
//         name: "Tadka dal",
//         description: `Put the dal, water and turmeric in a large saucepan, over a medium heat. Bring to the boil, then simmer uncovered for 1¼ hours, until the dal is soft, stirring every few minutes to make sure the dal doesn’t stick to the bottom of the pan.
//         Mash lightly with a potato masher, then turn off the heat and set aside.
//         To make the tadka, heat the oil in a frying pan (skillet) over a medium heat. Add the cumin seeds, then after a few seconds, add the onions and fry for 8 minutes, stirring well so that they brown evenly. Add the garlic and fry for a further minute, then add the crushed fennel seeds, chilli powder and ground coriander and stir well. Add the tomato and fry for 2-3 minutes until soft, then add the ginger and fry for a further 1 minute.
//         Pour the tadka mix over the cooked dal. Add enough boiling water to thin out the dal; about 80–100 ml (3 floz /⅓ cup–7 fl oz/scant ½ cup). Simmer for a couple of minutes to heat through, season to taste and garnish with fresh coriander. Serve warm with roti or rice.

//         Source: https://www.jamieoliver.com/recipes/lentil-recipes/tadka-dal/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "250 g (9 oz/1 ¼ cups) chana dal",
//           "1 litre (34 fl oz/4 cups) water",
//           "1 teaspoon ground turmeric",
//           "3 tablespoons vegetable oil",
//           "1 teaspoon cumin seeds",
//           "110 g (3¾ oz) white onions, thinly sliced",
//           "4 garlic cloves, thinly sliced",
//           "1 teaspoon fennel seeds, coarsely crushed",
//           "½ teaspoon Kashmiri chilli powder or mild chilli powder",
//           "1 teaspoon ground coriander",
//           "90 g (3¼ oz) tomato, finely chopped",
//           "2.5 cm (1in) ginger root, sliced into matchsticks",
//           "salt, to taste",
//           "chopped coriander (cilantro), to garnish"
//         ],
//         category: "Indian",
//         image: "tadka-dal.jpg"
//       },
//       {
//         name: "Punjabi kadhai paneer",
//         description: `First make the kadhai masala. Put the spices in a dry frying pan (skillet) and dry-roast over a low heat for 3–4 minutes until fragrant, stirring well to make sure they are evenly toasted. Leave to cool, then grind in a spice grinder to a coarse mix. Set aside.
//         Put the tomatoes and tomato purée in a blender and blend to a smooth, fine paste. Set aside.
//         Heat 2 tablespoons of the oil in a large frying pan over a medium heat, then add the red onion and peppers and fry for 5 minutes until they begin to soften, stirring well. Add the diced paneer, along with 3 tablespoons of the kadhai masala (or a touch more if you prefer it spicy). Stir well, but make sure not to break up the paneer. Cook for 2 minutes to soften, then turn off the heat and set aside.
//         Heat the remaining 3 tablespoons of oil in a wok or kadhai over a medium heat. Add the cumin seeds and two-thirds of the ginger matchsticks and fry for a few seconds, then add the white onions and fry for 12–14 minutes until they soften and change colour, stirring well to make sure they don’t stick to the bottom of the pan.
//         Add the blended tomato purée and cook for another 12 minutes until the mixture thickens and reduces slightly. Add the chilli powder, turmeric, ground coriander and sugar, season to taste and cook for a couple of minutes, stirring well. Now add the paneer and pepper mix and stir together over a low heat for 2–3 minutes.
//         Turn off the heat, add the kasoori methi and the remaining ginger matchsticks and stir well. Garnish with fresh coriander and serve in the thali with tadka dal, phulkas and raita

//         Source: https://www.jamieoliver.com/recipes/paneer-recipes/punjabi-kadhai-paneer/`,
//         email: "hello@gmail.com",
//         ingredients: [

//           "300 g (10½oz) tomatoes, roughly chopped",
//           "2 heaped tablespoons tomato purée (paste)",
//           "5 tablespoons vegetable oil",
//           "80 g (3oz) red onion, thinly sliced",
//           "300 g (10½oz) mixed (bell) peppers, thinly sliced",
//           "450 g (1lb) paneer, cut into bite-sized cubes",
//           "1 teaspoon cumin seeds",
//           "7.5 cm (3in) ginger root, cut into matchsticks",
//           "120 g (4oz) white onions, finely chopped",
//           "1 teaspoon Kashmiri chilli powder",
//           "¼ teaspoon ground turmeric",
//           "1 teaspoon ground coriander",
//           "pinch of sugar",
//           "salt, to taste",
//           "2 tablespoons kasoori methi",
//           "chopped coriander (cilantro), to garnish",
//           "3 dried red Kashmiri chillies",
//           "2 tablespoons coriander seeds",
//           "2 teaspoons cumin seeds",
//           "1 teaspoon whole black peppercorns",
//           "7–8 green cardamom pods, seeds only"
//         ],
//         category: "Indian",
//         image: "punjabi-kadhai-paneer.jpg"
//       },
//       // { 
//       //   "name": "Recipe Name Goes Here",
//       //   "description": `Recipe Description Goes Here`,
//       //   "email": "simransaini29march@gmail.com",
//       //   "ingredients": [
//       //     "1 teaspoon turmeric",
//       //     "1 teaspoon jeera",
//       //     "1 teaspoon red chilli powder",
//       //   ],
//       //   "category": "Indian", 
//       //   "image": "ghar-kaa-khana.jpg"
//       // },
//     ]);
//   } catch (error) {
//     console.log('err', + error)
//   }
// }

// // insertDymmyRecipeData();




//IN ORDER TO INSERT THE DUMMY DATA CATEGORY INTO THE MONGODB
// async function insertDymmyCategoryData(){
//     try{
//         await Category.insertMany([
//                     {
//                         "name": "Thai",
//                         "image": "thai-food.jpg"
//                       },
//                       {
//                         "name": "American",
//                         "image": "american-food.jpg"
//                       }, 
//                       {
//                         "name": "Chinese",
//                         "image": "chinese-food.jpg"
//                       },
//                       {
//                         "name": "Mexican",
//                         "image": "mexican-food.jpg"
//                       }, 
//                       {
//                         "name": "Indian",
//                         "image": "indian-food.jpg"
//                       },
//                       {
//                         "name": "Spanish",
//                         "image": "spanish-food.jpg"
//                       }
//         ]);
//     }
//     catch(error){
//         console.log('err',+error)
//     }

// }
// insertDymmyCategoryData();

