document.getElementById('mediaUploadForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Fetch form values
  const mediaType = document.getElementById('mediaType').value;
  const collectionName = document.getElementById('collectionName').value;
  const mediaTitle = document.getElementById('mediaTitle').value;
  const mediaFile = document.getElementById('mediaFile').files[0]; // Assuming single file upload
  
  // Perform actions with form data (e.g., send to server via AJAX, etc.)
  // Example: You can log the form data
  console.log('Media Type:', mediaType);
  console.log('Collection Name:', collectionName);
  console.log('Media Title:', mediaTitle);
  console.log('Media File:', mediaFile);
});
