// App.js
import React, { useState } from 'react';
import Logo from './Components/Logo';
import UploadForm from './Components/UploadForm';
import ReportGenerator from './Components/ReportGenerator';
import ReportTable from './Components/ReportTable';

const App = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleFileUpload = (files) => {
    setUploadedFiles(files);
  };

  return (
    <div>
      <Logo />
      <UploadForm onFileUpload={handleFileUpload} />
      {uploadedFiles.length > 0 && <ReportGenerator files={uploadedFiles} />}
      {uploadedFiles.length > 0 && <ReportTable files={uploadedFiles} />}
    </div>
  );
};

export default App;
