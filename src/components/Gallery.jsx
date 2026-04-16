import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Trash2 } from 'lucide-react'; // Import the Trash icon
import "./Gallery.css";

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  // 1. UPDATE: Your Live Render Backend URL
  const API_URL = "https://yourkeyproviderbackend.onrender.com/gallery/";

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setGallery(data);
      } catch (err) {
        console.error("Failed to load gallery from live server:", err);
      }
    };
    fetchGallery();
  }, [API_URL]);

  // NEW: Handle deleting a photo
  const handleDelete = async (photoId) => {
    // 1. Ask for password
    const password = prompt("Enter Admin Password to delete:");
    if (!password) return;

    // 2. Ask for confirmation
    if (!window.confirm("Are you sure you want to delete this photo from the database?")) return;

    // 3. Send DELETE request to live backend
    try {
      const response = await fetch(`${API_URL}${photoId}`, {
        method: "DELETE",
        headers: {
          "X-Admin-Token": password // Send password in header
        }
      });

      if (response.status === 403) {
        alert("Unauthorized: Incorrect Password");
        return;
      }

      if (response.ok) {
        // Remove the deleted photo from the UI state immediately
        setGallery(prev => prev.filter(item => item.id !== photoId));
      }
    } catch (err) {
      console.error("Error deleting photo:", err);
    }
  };

  const handleUpload = async () => {
    const password = prompt("Enter Admin Password to upload:");
    if (!password) return;

    // --- STEP 1: PRE-VERIFICATION ---
    try {
      // We send a dummy 'ping' to the backend to verify the token
      const verifyResponse = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-Admin-Token": password 
        },
        body: JSON.stringify({ image_url: "ping", caption: "auth_check" }), 
      });

      if (verifyResponse.status === 403) {
        alert("Unauthorized: Incorrect Password. Access Denied.");
        return; // Stops here if password is wrong
      }
    } catch (err) {
      console.error("Auth check failed:", err);
      return;
    }

    // --- STEP 2: OPEN WIDGET (Only if password was correct) ---
    if (!window.cloudinary) {
      alert("Cloudinary script not loaded yet.");
      return;
    }

    window.cloudinary.openUploadWidget(
      {
        cloudName: "ddtaic15q",
        uploadPreset: "gallery-preset",
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          const newPhotoData = {
            image_url: result.info.secure_url,
            caption: result.info.original_filename
          };

          try {
            const saveResponse = await fetch(API_URL, {
              method: "POST",
              headers: { 
                "Content-Type": "application/json",
                "X-Admin-Token": password 
              },
              body: JSON.stringify(newPhotoData),
            });

            if (saveResponse.ok) {
              const savedItem = await saveResponse.json();
              setGallery(prev => [savedItem, ...prev]);
            }
          } catch (err) {
            console.error("Error saving to live database:", err);
          }
        }
      }
    );
  };

  return (
    <>
      <Helmet>
        <title>Your Key Provider Locksmiths - Work Gallery</title>
        <meta name="description" content="Browse our locksmith work gallery." />
      </Helmet>

      <section className="gallery-section">
        <div className="gallery-header">
          <h2>Our Work Gallery</h2>
          <p className="gallery-desc">A showcase of projects we’ve completed.</p>
        </div>

        <div className="gallery-viewport">
          <div className="gallery-track">
            {gallery.length > 0 ? (
              gallery.map((item) => (
                // Added position:relative for absolute delete button
                <figure key={item.id} className="gallery-card" style={{ position: 'relative' }}>
                  
                  {/* NEW: Absolute positioned Delete Button */}
                  <button 
                    onClick={() => handleDelete(item.id)}
                    className="delete-photo-btn"
                    title="Delete Photo from Database"
                  >
                    <Trash2 size={16} color="white" />
                  </button>

                  <img src={item.image_url} alt={item.caption} />
                  <figcaption>{item.caption}</figcaption>
                </figure>
              ))
            ) : (
              <p className="no-photos">No photos uploaded yet. Be the first!</p>
            )}
          </div>
        </div>

        <div className="gallery-form">
          <button onClick={handleUpload} className="upload-btn">
            Upload to Gallery
          </button>
        </div>
      </section>
    </>
  );
};

export default Gallery;