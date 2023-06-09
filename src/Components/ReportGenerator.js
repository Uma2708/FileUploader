import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './ReportTable.css';

const ReportTable = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    fetchFiles();
  }, [location.pathname]);

  const fetchFiles = async () => {
    try {
      const storageRef = firebase.storage().ref();
      const filesRef = storageRef.child('uploads');

      const fileList = await filesRef.listAll();

      const filesData = [];

      for (const fileRef of fileList.items) {
        const fileMetadata = await fileRef.getMetadata();
        filesData.push({
          name: fileMetadata.name,
          url: await fileRef.getDownloadURL(),
          ref: fileRef,
        });
      }

      setFiles(filesData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch files:', error);
    }
  };

  const deleteFile = async (fileRef) => {
    try {
      await fileRef.delete();
      setFiles((prevFiles) => prevFiles.filter((file) => file.ref !== fileRef));
    } catch (error) {
      console.error('Failed to delete file:', error);
    }
  };

  return (
    <div className="table-container">
      <h1>All Uploaded Files</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
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
                  <button>
                    <a href={file.url} download style={{ color: 'white', textDecoration: 'none' }}>
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
      )}
    </div>
  );
};

export default ReportTable;
