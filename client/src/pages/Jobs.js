import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { JobProvider } from '../context/JobContext';
import JobList from '../components/JobList';
import JobDetails from '../components/JobDetails';

const Jobs = () => {
  return (
    <div>
      <div className="job-content">
        <JobProvider>
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route path="list" element={<JobList />} />
            <Route path=":jobId" element={<JobDetails />} />
          </Routes>
        </JobProvider>
      </div>
    </div>
  );
};

export default Jobs;