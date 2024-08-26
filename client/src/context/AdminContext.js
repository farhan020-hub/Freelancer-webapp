import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
export const AdminContext = createContext();

// AdminProvider Component
export function AdminProvider({ children }) {
  const [onchange, setOnchange] = useState(false);
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem("authToken") ? sessionStorage.getItem("authToken") : null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setAuthToken(token);
      setIsAdmin(true);
    }
  }, []);

  function adminLogin(username, password) {
    fetch("https://freelance-app-q6or.onrender.com/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access_token) {
          sessionStorage.setItem("authToken", response.access_token);
          setAuthToken(response.access_token);
          setIsAdmin(true);
          setOnchange(!onchange);
          navigate("/admin/dashboard"); // Adjust the route accordingly
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  function adminCreateJob(title, description, user_id) {
    fetch("https://freelance-app-q6or.onrender.com/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, user_id: user_id }),
    })
      .then((res) => {
        if (!res.ok) {
          // If the response is not ok, log the response text
          console.log('Response status:', res.status);
          return res.text().then((text) => {
            console.log('Response text:', text);
            throw new Error('Server response was not ok');
          });
        }
        return res.json();
      })
      .then((response) => {
        if (response.id) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Job created successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange(!onchange);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

  function adminDeleteJob(jobId) {
    fetch(`https://freelance-app-q6or.onrender.com/admin/jobs/${jobId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange(!onchange);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  
  function adminDeleteUser(userId) {
    fetch(`https://freelance-app-q6or.onrender.com/admin/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
          setOnchange(!onchange);
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }
  
  function adminLogout() {
    sessionStorage.removeItem("authToken");
    setAuthToken(null);
    setIsAdmin(false);
    navigate("/"); // Redirect to home or login page after logout
  }

  const adminContextData = {
    isAdmin,
    adminLogin,
    adminCreateJob,
    adminDeleteJob,
    adminLogout,
    adminDeleteUser,
    // Add other admin-related variables and functions here
  };

  return (
    <AdminContext.Provider value={adminContextData}>
      {children}
    </AdminContext.Provider>
  );
}