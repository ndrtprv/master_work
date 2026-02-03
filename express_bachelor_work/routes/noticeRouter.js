const Router = require('express');
const multer = require('multer');
const noticeController = require('../controllers/NoticeController');
const router = new Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/add', upload.array('photos', 10), noticeController.addNotice);
router.get('/getUsersNotices', noticeController.getUsersNotices);
router.get('/getNotices', noticeController.getNotices);
router.get('/getNotice/:id', noticeController.getNotice);
router.delete('/deleteNotice/:id', noticeController.deleteNotice);
router.put('/updateNotice/:id', upload.single('photo'), noticeController.updateNotice);

module.exports = router;