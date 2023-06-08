import React, { useState } from 'react';
import axios from 'axios';


const ReportGenerator = ({ files }) => {
  const [reports, setReports] = useState([]);

  const generateReport = async () => {
    const reportPromises = files.map(async (file) => {
      const codeContent = await readFileContent(file);
      const executionResult = await executeCode(codeContent);
      return { fileName: file.name, codeContent, executionResult };
    });

    const generatedReports = await Promise.all(reportPromises);
    setReports(generatedReports);
  };

  const readFileContent = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (event) => reject(event.target.error);
      reader.readAsText(file);
    });
  };

  const executeCode = async (codeContent) => {
    try {
      const response = await axios.post('https://api.piston.rs/execute', {
        code: codeContent,
        language: 'python',
      });
      const executionResult = response.data;
      return executionResult;
    } catch (error) {
      console.error('Code execution failed:', error);
      return { error: 'Code execution failed' };
    }
  };

  return (
    <div>
      <button onClick={generateReport}>Generate Report</button>
      
        <table>
          <thead>
            <tr>
              <th>File Name</th>
              <th>Code Content</th>
              <th>Execution Result</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.fileName}</td>
                <td>{report.codeContent}</td>
                <td>{report.executionResult}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    
  );
};


export default ReportGenerator;
