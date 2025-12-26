
const express = require('express');
const router = express.Router();
const { uploadImage, getUserImages } = require('../controllers/imageController');
const auth = require('../middleware/auth');

router.post('/upload', auth, uploadImage);
router.get('/', auth, getUserImages);

module.exports = router;
