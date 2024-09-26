import React, { useState, useEffect } from "react";
import { auth, database } from "../../firebaseConfig";
import { ref, get, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faBullhorn,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

function ProfileSidebar({ setUserInfo, userInfo }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUser(currentUser);
        const username = currentUser.displayName;

        if (username) {
          try {
            const userRef = ref(database, `users/${username}`);
            const snapshot = await get(userRef);
            if (snapshot.exists()) {
              const userData = snapshot.val();
              setUserInfo(userData); // Set userInfo in parent component
            } else {
              console.log("User data not found.");
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false);
          }
        } else {
          console.log("Username not found.");
          setLoading(false);
        }
      } else {
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate, setUserInfo]);

  return (
    <div className="profile-container">
      {loading ? (
        <p>Loading...</p>
      ) : userInfo ? ( // Use userInfo prop
        <div className="profile-content">
          <div className="profile-header">
            <img
              src={userInfo.profilePic}
              alt="Profile"
              className="profile-pic"
            />
            <h1 className="profile-username">{userInfo.username}</h1>
          </div>
          <div className="profile-statistics">
            <div className="stat-item">
              <FontAwesomeIcon icon={faComment} className="stat-icon" />
              <div className="stat-text">
                <p>Gossips Posted</p>
                <h3>{userInfo.gossipsCount || 0}</h3>
              </div>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faBullhorn} className="stat-icon" />
              <div className="stat-text">
                <p>Comments Made</p>
                <h3>{userInfo.commentsCount || 0}</h3>
              </div>
            </div>
            <div className="stat-item">
              <FontAwesomeIcon icon={faCalendarCheck} className="stat-icon" />
              <div className="stat-text">
                <p>Events Attended</p>
                <h3>{userInfo.eventsAttended || 0}</h3>
              </div>
            </div>
          </div>
          <div className="profile-details">
            
          </div>
          <div className="profile-links">
            <Link to="/profile" className="profile-link">
              Προφίλ
            </Link>
            <Link to="/gossips" className="profile-link">
              Τα σουσού μου
            </Link>
            <Link to="/events" className="profile-link">
              Events
            </Link>
          </div>
        </div>
      ) : (
        <p>User data not found.</p>
      )}
    </div>
  );
}

export default ProfileSidebar;
