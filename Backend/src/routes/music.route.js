const express = require('express');
const musicController = require('../controllers/music.controller');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/authentication.middleware');
const authorizeRoleMiddleware = require('../middleware/authorizeRole.middleware');

const upload = multer({
    storage: multer.memoryStorage(),

})

router.post('/create', authMiddleware, authorizeRoleMiddleware('artist') ,  upload.single('music'), musicController.createMusic);
router.get('/get', musicController.getMusic);


module.exports = router;