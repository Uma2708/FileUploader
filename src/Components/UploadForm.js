import React, { useState, useEffect } from 'react';
import { storage } from '../firebase';
// import ReportTable from './ReportTable';
import './UploadForm.css'

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
        setTimeout(() => {
          setUploadProgress(0);
        }, 2000); 
      }
      
    );
  };

  useEffect(() => {
    let timeout;
    if (uploadError || uploadSuccess) {
      timeout = setTimeout(() => {
        setUploadError(null);
        setUploadSuccess(false);
      }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [uploadError, uploadSuccess]);

  return (
<div className='upload'>
<h1 style={{color:'grey', margin:'20px'}}>Upload File</h1>
    <div className='upload-container' >
    
      <input type="file" onChange={handleFileChange} />

      
      <button onClick={handleFileUpload}>Upload</button>
      {uploadProgress > 0 && (
  <div>
    <p> <progress value={uploadProgress} max="100" /> {uploadProgress}%</p>
    
  </div>
)}
{uploadError && <p>Error Uploading File: {uploadError}</p>}
{uploadSuccess && <p>File Uploaded Successfully!</p>}
      </div>
      {/* <ReportTable/> */}
      
    </div>
  );
};

export default UploadForm;
