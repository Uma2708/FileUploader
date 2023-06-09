import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import './ReportTable.css';
// import download from 'downloadjs';

const ReportTable = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, []);

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

  const handleDownload = async (fileUrl) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary anchor element
      const link = document.createElement('a');
      link.href = url;
      link.download = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);

      // Programmatically trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Failed to download file:', error);
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
              {/* <th>Delete</th> */}
            </tr>
          </thead>
          <tbody>
            {files.map((file, index) => (
              <tr key={index}>
                <td>{file.name}</td>
                <td>
                <button onClick={() => handleDownload(file.url)}>Download</button>
                </td>
                {/* <td>
                  <button onClick={() => deleteFile(file.ref)}>Delete</button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportTable;
