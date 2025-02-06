
import { useState } from "react";
import { storage, db } from "../lib/firebase"; // Import Firebase config

const UploadVideo = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    setUploading(true);
    const storageRef = storage.ref(`videos/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Track upload progress
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setUploading(false);
      },
      async () => {
        // Get the download URL
        const downloadURL = await storageRef.getDownloadURL();
        
        // Save video URL to Firestore
        await db.collection("videos").add({
          name: file.name,
          url: downloadURL,
          createdAt: new Date(),
        });

        setUploading(false);
        setFile(null);
        setProgress(0);
        alert("Upload successful!");
      }
    );
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <input type="file" accept="video/mp4" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? `Uploading... ${progress}%` : "Upload"}
      </button>
    </div>
  );
};

export default UploadVideo;
