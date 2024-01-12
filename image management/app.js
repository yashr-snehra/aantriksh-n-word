// Update Image Endpoint
app.put("/update-image/:dropbox_id", (request, response) => {
  const dropboxId = request.params.dropbox_id;
  const newTitle = request.body.title;

  db.pool.connect((err, client) => {
    const updateQuery =
      "UPDATE images SET title = $1 WHERE dropbox_id = $2 RETURNING *";
    const values = [newTitle, dropboxId];

    client.query(updateQuery, values)
      .then((result) => {
        if (result.rows.length === 0) {
          response.status(404).send({
            message: "Image not found",
          });
        } else {
          const updatedImage = result.rows[0];
          response.status(200).send({
            status: "success",
            data: {
              message: "Image Updated Successfully",
              title: updatedImage.title,
              dropbox_id: updatedImage.dropbox_id,
              image_url: updatedImage.image_url,
            },
          });
        }
      })
      .catch((e) => {
        response.status(500).send({
          message: "failure",
          error: e,
        });
      });
  });
});

// Delete Image Endpoint
app.delete("/delete-image/:dropbox_id", (request, response) => {
  const dropboxId = request.params.dropbox_id;

  db.pool.connect((err, client) => {
    const deleteQuery = "DELETE FROM images WHERE dropbox_id = $1 RETURNING *";
    const values = [dropboxId];

    client.query(deleteQuery, values)
      .then((result) => {
        if (result.rows.length === 0) {
          response.status(404).send({
            message: "Image not found",
          });
        } else {
          const deletedImage = result.rows[0];
          response.status(200).send({
            status: "success",
            data: {
              message: "Image Deleted Successfully",
              title: deletedImage.title,
              dropbox_id: deletedImage.dropbox_id,
              image_url: deletedImage.image_url,
            },
          });
        }
      })
      .catch((e) => {
        response.status(500).send({
          message: "failure",
          error: e,
        });
      });
  });
});
