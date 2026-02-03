const Router = require('express');
const multer = require('multer');
const fundraiseController = require('../controllers/FundraiseController');
const router = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('photos', 10), fundraiseController.addFundraise);
router.get();
router.get();
router.put('/updateFundraise/:id', upload.array('photos', 10), fundraiseController.addFundraise);
router.patch('/stopFundraise', fundraiseController.closeFundraise);
router.delete('/delete', fundraiseController.deleteFundraise);

module.exports = router;