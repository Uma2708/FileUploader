import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './ReportTable.css';

const ReportTable = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const storageRef = firebase.storage().ref();
      const filesRef = storageRef.child('uploads');

      // Get the list of files in the "uploads" directory
      const fileList = await filesRef.listAll();

      // Create an array to store the file data
      const filesData = [];

      // Loop through each file and get its metadata
      for (const fileRef of fileList.items) {
        const fileMetadata = await fileRef.getMetadata();
        filesData.push({
          name: fileMetadata.name,
          url: await fileRef.getDownloadURL(),
          ref: fileRef, // Store the reference to the file
        });
      }

      // Set the files data in state
      setFiles(filesData);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const deleteFile = async (fileRef) => {
    try {
      // Delete the file using its reference
      await fileRef.delete();
      // Refresh the file list
      fetchFiles();
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  return (
    <div className="table-container">
        <h1> All Uploaded Files</h1>
        <div >
        
      <table className="report-table">
        
        <thead>
          <tr>
            <th>File Name</th>
            <th>Download</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={index}>
              <td>{file.name}</td>
              <td>
                <button><a href={file.url} download style={{ color: 'black', textDecoration: 'none' }}>
                  Download
                </a>
                </button>
                
              </td>
              <td>
                <button onClick={() => deleteFile(file.ref)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ReportTable;

