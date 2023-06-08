import React, { useState } from 'react';
import { storage } from '../firebase';
import ReportTable from './ReportTable';

const UploadForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const handleFileUpload = () => {
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(false);

    if (selectedFiles.length === 0) {
      return;
    }

    const file = selectedFiles[0];
    const storageRef = storage.ref(`uploads/${file.name}`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        setUploadError(error.message);
      },
      () => {
        setUploadSuccess(true);
      }
    );
  };

  return (
    <div className="uploader-container" >
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
      {uploadError && <p>Error Uploading File: {uploadError}</p>}
      {uploadSuccess && <p>File Uploaded Successfully!</p>}
      <ReportTable/>
    </div>
  );
};

export default UploadForm;
