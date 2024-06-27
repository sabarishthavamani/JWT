import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeAuthToken, removeadminToken } from "../localstorage";
import { adminLogout } from "../action/Adminaction";
axios.defaults.withCredentials = true;

const Welcome = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  
  
  const verifyToken = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4500/JWT_Authentication/VerifyToken",
        {
          withCredentials: true,
        }
      );

      console.log("VerifyToken API response:", res);
      return res.data;
    } catch (err) {
      console.error("Error during VerifyToken API call:", err);
      return null;
    }
  };

  const refreshUser = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4500/JWT_Authentication/Refresh",
        {
          withCredentials: true,
        }
      );
      console.log("Data from Refresh API response:", res.data);
      return res.data;
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Verify the token first
        const verifyData = await verifyToken();
        if (verifyData && verifyData.valid) {
          // Token is valid, fetch user data
          setUser(verifyData.user);
        } else {
          // Token is expired or invalid, refresh it
          const refreshData = await refreshUser();
          if (refreshData && refreshData.user) {
            setUser(refreshData.user);
          } else {
            console.error("Failed to refresh token or fetch user data");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    if (!localStorage.getItem("auth")) {
      nav("/Login");
    }
  }, []);


  return (
    <div>
      {user ? (
        <div>
          <h1>{user.username}</h1>
          <p>{user.Email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Button
        style={{ backgroundColor: "blue", color: "white" }}
        onClick={()=>{
          removeadminToken();
          removeAuthToken();
          nav("/Login");
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Welcome;
