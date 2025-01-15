import React, { useState } from 'react';
import './uploadImage.css';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const MAX_SIZE = 10 * 1024 * 1024; //max size 10mb
  const ALLOWED_FORMATS = ['image/jpeg', 'image/png']; //file type

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
	
	
    if (file) {
    
     if (!ALLOWED_FORMATS.includes(file.type)){   // file type chck
        setError('Invalid file format. Please upload a JPEG, PNG');
        setSelectedImage(null);
        setImagePreview(null);
        return;
      }
    if (file.size > MAX_SIZE){                       //file size chck
        setError('File is too large. Please upload an image smaller than 10MB.');
        setSelectedImage(null);
        setImagePreview(null);
        return;
      }
      setError(null);
      setSelectedImage(file);

      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(file); 
    }
};
 // Handle form submission
 const handleImageUpload = async () => {
  if (!selectedImage) return;

  setLoading(true);
  setError(null);

  const formData = new FormData();
  formData.append('file', selectedImage);

  try {
    const apiUrl = process.env.REACT_APP_IMAGE_UPLOAD || `http://localhost:8080/api/images/upload`;

    const response = await fetch(`${apiUrl}`, {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json(); // Parse the JSON response

    // Handle the message returned from the backend
    if (data.message) {
      setUploadedImage(data.message); // Display the success message
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err) {
    setError('Failed to upload image. Please try again.');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  // Handle image reset
  const handleImageReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setUploadedImage(null);
  };
	 
	return (
    <div className="upload-container">
      <h3>Upload an Image</h3>

      <input type="file" accept="image/*" onChange={handleImageChange} />

      {imagePreview && (
        <div className="image-preview-container">
          <h4>Image Preview:</h4>
          <img src={imagePreview} alt="Selected Preview" className="image-preview" />
        </div>
      )}

      <button onClick={handleImageUpload} disabled={loading} className="upload-button">
        {loading ? 'Uploading...' : 'Upload Image'}
      </button>

      {(selectedImage || uploadedImage) && (
        <button onClick={handleImageReset} className="reset-button">
          Reset Image
        </button>
      )}

      {uploadedImage && (
        <div className="image-preview-container">
          <h4>Uploaded Image:</h4>
          <img src={uploadedImage} alt="Uploaded" className="image-preview" />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default UploadImage;

 
