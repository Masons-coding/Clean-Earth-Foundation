import './SocialMediaPage.scss';
import React, { useState } from 'react';

import cleanEarthLogo from "../../assets/images/cleanEarthLogo.png";

function SocialMediaPage() {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [captionError, setCaptionError] = useState('');
  const [imageError, setImageError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    if (!caption.trim()) {
      setCaptionError('Caption is required');
      valid = false;
    } else {
      setCaptionError('');
    }

    if (!image) {
      setImageError('Image is required');
      valid = false;
    } else {
      setImageError('');
    }

    if (!valid) return;

    const formData = new FormData();
    formData.append('caption', caption);
    formData.append('image', image);

    // try {
    //   const res = await fetch(process.env.REACT_APP_SOCIAL_POST_URL, {
    //     method: 'POST',
    //     body: formData,
    //   });

    //   if (res.ok) {
    //     setCaption('');
    //     setImage(null);
    //     setImageName('');
    //   }
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : '');
  };

  return (
    <div className="post-form-container">
      <h2 className="social-form-heading">Upload To <img className="clean-earth-logo" src={cleanEarthLogo} alt="CleanEarth Logo"/> Socials</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="form-group">
          <label>Caption:</label>
          <textarea
            className={captionError ? 'error' : ''}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          {captionError && <span className="error-msg">{captionError}</span>}
        </div>

        <div className="form-group">
          <label>Image:</label>
          <div className="file-upload-wrapper">
            <label htmlFor="file-upload" className="file-label">
              {imageName || 'Upload/Drag File Here'}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className={imageError ? 'error' : ''}
              onChange={handleImageChange}
            />
          </div>
          {imageError && <span className="error-msg">{imageError}</span>}
        </div>

        <button type="submit">Submit Post</button>
      </form>
    </div>
  );
}

export default SocialMediaPage;
