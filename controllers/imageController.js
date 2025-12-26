
const cloudinary = require('../config/cloudinary');
const Image = require('../models/Image');

exports.uploadImage = async (req, res) => {
  try {
    const { imageBase64, fileName } = req.body;
    
    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(imageBase64, {
      folder: 'bhamini_p1198'
    });

    // Save URL to MongoDB
    const newImage = new Image({
      user: req.user.id,
      url: result.secure_url,
      publicId: result.public_id,
      fileName: fileName
    });

    await newImage.save();
    res.json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).send('Upload failed');
  }
};

exports.getUserImages = async (req, res) => {
  try {
    const images = await Image.find({ user: req.user.id }).sort({ uploadedAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
