const express = require('express');
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const db = require("../services/dbConnect.js");

cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

router.post("/persist-image", (req, res) => {
  const data = {
    title: req.body.title,
    image: req.body.image,
  };

  // Upload image to Cloudinary
  cloudinary.uploader
    .upload(data.image)
    .then((image) => {
      db.pool.connect((err, client) => {
        const insertQuery =
          "INSERT INTO images (title, cloudinary_id, image_url) VALUES($1, $2, $3) RETURNING *";
        const values = [data.title, image.public_id, image.secure_url];

        // Execute query
        client.query(insertQuery, values)
          .then((result) => {
            result = result.rows[0];
            res.status(201).json({
              status: "success",
              data: {
                message: "Image Uploaded Successfully",
                title: result.title,
                cloudinary_id: result.cloudinary_id,
                image_url: result.image_url,
              },
            });
          })
          .catch((e) => {
            res.status(500).json({
              status: "failure",
              error: e,
            });
          });
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failure",
        error: error,
      });
    });
});

router.get("/retrieve-image/:cloudinary_id", (req, res) => {
  const cloudinary_id = req.params.cloudinary_id;
  // Implementation to retrieve image details...
});

router.put("/update-image/:cloudinary_id", (req, res) => {
  const cloudinary_id = req.params.cloudinary_id;
  // Implementation to update image details...
});

router.delete("/delete-image/:cloudinary_id", (req, res) => {
  const cloudinary_id = req.params.cloudinary_id;
  // Implementation to delete image...
});

module.exports = router;
