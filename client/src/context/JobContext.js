import React, { createContext, useState, useEffect, useCallback } from 'react';

export const JobContext = createContext();

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);

  async function createJob(jobData) {
    const response = await fetch('https://freelance-app-q6or.onrender.com/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jobData)
    });
    const data = await response.json();
    setJobs([...jobs, data]);
  }

  const getJobs = useCallback(async () => {
    const response = await fetch('https://freelance-app-q6or.onrender.com/jobs');
    const data = await response.json();
    setJobs(data);
  }, []);

  async function getJobById(jobId) {
    const response = await fetch(`https://freelance-app-q6or.onrender.com/jobs/${jobId}`);
    const data = await response.json();
    return data;
  }

  const addComment = async (jobId, content) => {
    try {
      const response = await fetch('https://freelance-app-q6or.onrender.com/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ job_id: jobId, content: content }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Handle the response if needed
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  // Fetch jobs when the component mounts
  useEffect(() => {
    getJobs();
  }, [getJobs]); 

  return (
    <JobContext.Provider value={{ jobs, createJob, getJobs, getJobById, addComment }}>
  {children}
</JobContext.Provider>
  );
}
