import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../context/AdminContext';


export default function AdminDashboard() {
  const {
    isAdmin,
    adminCreateJob,
    adminDeleteJob,
    adminDeleteUser,
    adminLogout, // Destructure adminLogout from the context
    // Add other admin-related variables and functions here
  } = useContext(AdminContext);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [jobs, setJobs] = useState([]);
  const [users, setUsers] = useState([]);

  const handleCreateJob = (e) => {
    e.preventDefault();
    adminCreateJob(title, description);
    setTitle('');
    setDescription('');
  };

  const handleDeleteJob = (jobId) => {
    adminDeleteJob(jobId);
  };

  const handleDeleteUser = (userId) => {
    adminDeleteUser(userId);
  };

  const handleLogout = () => {
    adminLogout(); // Call adminLogout when the logout button is clicked
  };

  useEffect(() => {
    // Fetch existing jobs (you might want to fetch and display users as well)
    // This is a simplified example; replace it with your actual API call
    fetch('https://freelance-app-q6or.onrender.com/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error('Error fetching jobs:', error));

    // Fetch existing users
    fetch('https://freelance-app-q6or.onrender.com/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  if (!isAdmin) {
    return <div className="access-denied">Access Denied</div>;
  }

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* Create Job Form */}
      <form className="create-job-form" onSubmit={handleCreateJob}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Job</button>
      </form>

      {/* Display Existing Jobs */}
      <div className="existing-jobs">
        <h3>Existing Jobs</h3>
        {jobs.map((job) => (
          <div key={job.id} className="job-item">
            <div>
              <strong>{job.title}</strong>
              <p>{job.description}</p>
            </div>
            <button onClick={() => handleDeleteJob(job.id)}>Delete Job</button>
          </div>
        ))}
      </div>

      {/* Display Existing Users */}
      <div className="existing-users">
        <h3>Existing Users</h3>
        {users.map((user) => (
          <div key={user.id} className="user-item">
            <div>
              <strong>{user.username}</strong>
              {/* Display additional user information as needed */}
            </div>
            <button onClick={() => handleDeleteUser(user.id)}>Delete User</button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ))}
      </div>
    </div>
  );
}