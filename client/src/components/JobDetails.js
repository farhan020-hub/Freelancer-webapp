import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import CommentForm from '../pages/CommentForm';
import '../App.css'; // Import your CSS file

const JobDetails = () => {
  const { jobId } = useParams();
  const { getJobById } = useContext(JobContext);
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      const data = await getJobById(jobId);
      setJob(data);
    };
    fetchJob();
  }, [jobId, getJobById]);

  const handleMarkAsDone = async () => {
    const authToken = sessionStorage.getItem('authToken'); // Replace with your method of retrieving the token
  
    if (!authToken) {
      console.error("No auth token available");
      return;
    }
  
    const response = await fetch(`https://freelance-app-q6or.onrender.com/jobs/${jobId}/done`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      }
    });
  
    if (response.ok) {
      console.log("Job marked as done");
      // Handle successful marking here
    } else {
      console.error("Failed to mark job as done", response.status);
    }
  };
  

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <p>{job.description}</p>

      <button onClick={handleMarkAsDone} className="mark-done-btn">Mark as Done</button>

      <CommentForm jobId={jobId} />
    </div>
  );
};

export default JobDetails;
