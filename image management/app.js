// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./services/dbConnect");
const cloudinary = require("cloudinary").v2;
const routes = require("./routes/routes");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Persist Image Endpoint
app.post("/persist-image", (request, response) => {
  const data = {
    title: request.body.title,
    image: request.body.image,
  };

  // Upload image to Cloudinary
  cloudinary.uploader
    .upload(data.image)
    .then((image) => {
      db.pool.connect((err, client) => {
        const insertQuery =
          "INSERT INTO images (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *";
        const values = [data.title, image.public_id, image.secure_url];

        // Execute query
        client.query(insertQuery, values)
          .then((result) => {
            result = result.rows[0];
            response.status(201).send({
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
            response.status(500).send({
              message: "failure",
              error: e,
            });
          });
      });
    })
    .catch((error) => {
      response.status(500).send({
        message: "failure",
        error: error,
      });
    });
});

// Update Image Endpoint
app.put("/update-image/:cloudinary_id", (request, response) => {
  // Implementation...
});

// Delete Image Endpoint
app.delete("/delete-image/:cloudinary_id", (request, response) => {
  // Implementation...
});

// Other endpoints...
app.use("/api", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
