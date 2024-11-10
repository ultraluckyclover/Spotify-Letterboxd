import React, { useState, useEffect } from 'react'
import Header from '../Header/Header.js'
import axios from 'axios'

export const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect( () => {

    console.log("In profile useEffect")

    const fetchUserData = async () => {
      try {
        console.log('in the try')
        const response = await axios.get('api/user/userdata')
        setUserData(response.data);
        console.log('Userdata is set...')
        console.log(userData)
      
      } catch (e) {
        setError('Error fetching user data');
        console.error(e)
      } finally {
        console.log("I am in the finally")
        setLoading(false)
      }
    }

    fetchUserData();
    

  },[]);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      {userData ? (
        <div>
          <img src={userData.imageUrl} alt="Profile" />
          <p>Username: {userData.username}</p>
          <p>Display Name: {userData.displayName}</p>
          {/* Render other user data as needed */}
        </div>
      ) : (
        <p>No user data available.</p>
      )}
    </div>
  )
}
