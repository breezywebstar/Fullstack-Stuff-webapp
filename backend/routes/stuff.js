const express = require('express')
const router  = express.Router();
const stuffCtrl = require('../controllers/stuffCon');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


//route to create a record and save to db
router.post('/',auth, multer, stuffCtrl.createThing);
//route to fetch one thing
  router.get('/:id', auth, stuffCtrl.getOneThing);
//route to update one thing
router.put('/:id', auth, stuffCtrl.modifyThing);
// route to delete
router.delete('/:id', auth, stuffCtrl.deleteThing);
//route to fetch everything
router.get('/', auth, stuffCtrl.getAllStuff);




module.exports = router;