// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
    <Router>
    <div>
      <Logo />
      <Routes>
        <Route path="/" element={<UploadForm onFileUpload={handleFileUpload} />} />
        <Route path="/uploads" element={<ReportTable files={uploadedFiles} />} />
        <Route path="/report" element={<ReportGenerator files={uploadedFiles} />} />
      </Routes>
    </div>
  </Router>
  );
};

export default App;
