const express = require('express');
const router = express.Router();

//Ajout du middleware 
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//on l'envoi vers controllers
//const Thing = require('../models/thing');
const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllStuff);
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;