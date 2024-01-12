async function generateSticker() {
  const token = document.getElementById('nftToken').value;

  try {
    const response = await fetch(`https://pool.pm/policy/4a4bd2ca19f6e35a20a19bf0c5346180b73113c9f2ab451be36135d4=${token}`);
    const data = await response.json();

    if (data.success) {
      const imageUrl = data.nftData.image;
      const stickerUrl = await uploadImageAndGenerateSticker(imageUrl);
      document.getElementById('imagePreview').src = stickerUrl;
    } else {
      alert('Failed to fetch NFT data. Please try again.');
    }
  } catch (error) {
    console.error('Error generating sticker:', error);
    alert('Error generating sticker. Please try again.');
  }
}

async function uploadImageAndGenerateSticker(imageUrl) {
  const formData = new FormData();
  formData.append('imageUrl', imageUrl);

  try {
    const response = await fetch('/generate-sticker', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image and generate sticker.');
    }

    const data = await response.json();
    return data.stickerUrl;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
