import React, { useContext, useEffect } from 'react';
import { JobContext } from '../context/JobContext';
import { Link } from 'react-router-dom';
import '../App.css';

const JobList = () => {
  const { jobs, getJobs } = useContext(JobContext);

  useEffect(() => {
    getJobs();
  }, [getJobs]);

  return (
    <div className="job-list">
      <h2>Available Jobs</h2>
      <ul>
        {jobs.map(job => (
          <li key={job.id}>
            <Link to={`/jobs/${job.id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default JobList;
