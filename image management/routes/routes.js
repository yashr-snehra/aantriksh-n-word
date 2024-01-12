const express = require('express');
const router = express.Router();
const db = require("../services/dbConnect.js");
const { Dropbox } = require('dropbox');

const dropbox = new Dropbox({
  accessToken: 'your_dropbox_access_token',
  fetch: require('isomorphic-fetch'),
});

router.post("/persist-image", (req, res) => {
  const data = {
    title: req.body.title,
    image: req.body.image,
  };

  // Upload image to Dropbox
  const fileContent = Buffer.from(data.image, 'base64');
  const filePath = `/images/${Date.now()}_${data.title}.png`; // Adjust the file path as needed

  dropbox.filesUpload({ path: filePath, contents: fileContent })
    .then((uploadedFile) => {
      const insertQuery =
        "INSERT INTO images (title, dropbox_path) VALUES($1, $2) RETURNING *";
      const values = [data.title, uploadedFile.path_display];

      // Execute query
      db.pool.connect((err, client) => {
        client.query(insertQuery, values)
          .then((result) => {
            result = result.rows[0];
            res.status(201).json({
              status: "success",
              data: {
                message: "Image Uploaded Successfully",
                title: result.title,
                dropbox_path: result.dropbox_path,
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

router.get("/retrieve-image/:dropbox_path", (req, res) => {
  const dropboxPath = req.params.dropbox_path;

  // Retrieve image details using Dropbox API
  dropbox.filesDownload({ path: dropboxPath })
    .then((downloadedFile) => {
      const imageBuffer = Buffer.from(downloadedFile.fileBinary, 'binary');
      res.writeHead(200, {
        'Content-Type': downloadedFile.fileBinary.contentType,
        'Content-Length': imageBuffer.length,
      });
      res.end(imageBuffer);
    })
    .catch((error) => {
      res.status(500).json({
        status: "failure",
        error: error,
      });
    });
});

router.put("/update-image/:dropbox_path", (req, res) => {
  const dropboxPath = req.params.dropbox_path;

  // Update image details using Dropbox API
  // You may need to implement logic to update metadata or replace the file content
  // based on your requirements
});

router.delete("/delete-image/:dropbox_path", (req, res) => {
  const dropboxPath = req.params.dropbox_path;

  // Delete image using Dropbox API
  dropbox.filesDeleteV2({ path: dropboxPath })
    .then(() => {
      res.status(200).json({
        status: "success",
        data: {
          message: "Image Deleted Successfully",
        },
      });
    })
    .catch((error) => {
      res.status(500).json({
        status: "failure",
        error: error,
      });
    });
});

module.exports = router;
