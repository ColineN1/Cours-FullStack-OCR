const express = require('express');

const app = express();

const stuffRoutes = require('./routes/stuff');

const path = require('path');
app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require('./routes/user');
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);


// ------------------------------------------POST : VENDRE UN ARTICLE  : -----------------------------
// récupere les infos de type json pour les envoyer au même endpoint 
app.use(express.json());

// app.use((req, res) => {
//     res.json({ message: 'Votre requête a bien été reçue !' }); 
//  });

//module.exports = app;

// Utilisons maintenant la BD MongoDB
// const Thing = require('./models/thing');

// utilisation de MongoDB
  const mongoose = require('mongoose');
  //modifier le lien du server
  mongoose.connect('mongodb+srv://coline:<Quennelle.1>@cluster0.jvkwi4b.mongodb.net/test',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// ------------------------------------------Ajout d'un middle ware : ----------------------------------------
// const express = require('express');

// const app = express();

// app.use((req, res, next) => {
//   console.log('Requête reçue !');
//   next();
// });

// app.use((req, res, next) => {
//   res.status(201);
//   next();
// });

// app.use((req, res, next) => {
//   res.json({ message: 'Votre requête a bien été reçue !' });
//   next();
// });

// app.use((req, res, next) => {
//   console.log('Réponse envoyée avec succès !');
// });

// module.exports = app;

// ------------------------------------------GET : ACCES API OBJET A VENDRE  : -----------------------------
// pour erreur CORS il faut ajouter un middleware (L39 - L44)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


  // ------------------------------------------POST : VENDRE UN ARTICLE  : -----------------------------
// récupere les infos de type json pour les envoyer au même endpoint 
//création de ressource 201
// app.post('/api/stuff', (req, res, next) => {
//   console.log(req.body);
//   res.status(201).json({
//     message: 'Objet créé !'
//   });
// });

// ------------------------------------------GET : ACCES API OBJET A VENDRE  : -----------------------------
// app.get('/api/stuff', (req, res, next) => {
//     const stuff = [
//       {
//         _id: 'oeihfzeoi',
//         title: 'Mon premier objet',
//         description: 'Les infos de mon premier objet',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         price: 4900,
//         userId: 'qsomihvqios',
//       },
//       {
//         _id: 'oeihfzeomoihi',
//         title: 'Mon deuxième objet',
//         description: 'Les infos de mon deuxième objet',
//         imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//         price: 2900,
//         userId: 'qsomihvqios',
//       },
//     ];
//     res.status(200).json(stuff);
//   });


// ------------------DEPLACEMENT EN ROUTEUR DANS STUFF.JS------------------------------


// on a remplacé POST par 
// app.post('/api/stuff', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//       ...req.body
//     });
//     thing.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// //On ajoute une nouvelle route après POST 
// app.get('/api/stuff/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
//   });
// // Dans cette route :
// //   nous utilisons la méthode get() pour répondre uniquement aux demandes GET à cet endpoint ;
// //   nous utilisons deux-points : en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
// //   nous utilisons ensuite la méthode findOne() dans notre modèle Thing pour trouver le Thing unique ayant le même _id que le paramètre de la requête ;
// //   ce Thing est ensuite retourné dans une Promise et envoyé au front-end ;
// //   si aucun Thing n'est trouvé ou si une erreur se produit, nous envoyons une erreur 404 au front-end, avec l'erreur générée.


//   // on remplace GET par 
//   app.use('/api/stuff', (req, res, next) => {
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
//   });

// // On ajooute une route PUT pour modifier un élément 
// app.put('/api/stuff/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

// // On ajoute une route DELETE pour supprimer un élément
// app.delete('/api/stuff/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
//   });

app.use('/api/stuff', stuffRoutes);

//   Félicitations ! Désormais, votre application implémente le CRUD complet :
//     create (création de ressources) ;
//     read (lecture de ressources) ;
//     update (modification de ressources) ;
//     delete (suppression de ressources).

  //toujours en fin de code 
  module.exports = app;

