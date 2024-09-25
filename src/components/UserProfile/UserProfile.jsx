import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const db = getDatabase();
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        setUserData(snapshot.val());
        console.log(snapshot.val()); // Log user data for debugging
      } else {
        console.error("User not found");
      }
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>User data not available.</p>;
  }

  // Update the profile picture path
  const profilePicSrc = userData.profilePic.startsWith('http')
    ? userData.profilePic
    : `${window.location.origin}/${userData.profilePic.replace('./', '')}`;

  return (
    <div className="user-profile">
      <div className="profile-header">
        <img 
          src={profilePicSrc || './src/assets/img/profile-pic.png'}
          alt={`${userData.username}'s profile`} 
          className="profile-pic" 
        />
        <h1 className="username">{userData.username}</h1>
      </div>
      <div className="profile-details">
        <p><strong>About:</strong> {userData.about || 'No information available.'}</p>
        <div className="profile-statistics">
          <p>Gossips Posted: {userData.gossipsCount || 0}</p>
          <p>Comments Made: {userData.commentsCount || 0}</p>
          <p>Events Attended: {userData.eventsAttended || 0}</p>
        </div>
      </div>
      <div className="profile-links">
        {/* Add links or buttons for additional actions, if needed */}
      </div>
    </div>
  );
};

export default UserProfile;
