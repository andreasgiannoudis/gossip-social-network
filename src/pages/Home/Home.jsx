import React, { useState, useEffect } from "react";
import GossipList from "../../components/GossipList/GossipList";
import ProfileSidebar from "../../components/ProfileSidebar/ProfileSidebar";
import PostGossipForm from "../../components/PostGossipForm/PostGossipForm";
import PopularGossips from "../../components/PopularGossips/PopularGossips";
import TopContributors from "../../components/TopContributors/TopContributors";
import { getDatabase, ref, onValue, push, update } from "firebase/database";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig';

function Home() {
  const [gossips, setGossips] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName || user.email);
      } else {
        setCurrentUser("");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const gossipsRef = ref(db, "gossips/");
    onValue(gossipsRef, (snapshot) => {
      const data = snapshot.val();
      const gossipsArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setGossips(gossipsArray);
    });
  }, []);

  const addGossip = async (newGossip) => {
    const db = getDatabase();
    const gossipRef = ref(db, `gossips/`);
    const newGossipRef = push(gossipRef);

    const gossipData = {
      title: newGossip.title,
      description: newGossip.description,
      author: newGossip.author,
      likes: {},
      likesCount: 0,
      comments: {},
    };

    await set(newGossipRef, gossipData);

    if (userInfo) {
      const userRef = ref(db, `users/${newGossip.author}`);
      await update(userRef, {
        gossipsCount: (userInfo.gossipsCount || 0) + 1,
      });
    }
  };

  return (
    <div className="home">
      <div className="content">
        <div className="sidebar profile-sidebar">
          <ProfileSidebar setUserInfo={setUserInfo} userInfo={userInfo} />
        </div>

        <div className="feed">
          <PostGossipForm addGossip={addGossip} />

          <div className="latest-gossips">
            <h2>Τελευταία Κουτσομπολιά</h2>
            <GossipList gossips={gossips} currentUser={currentUser} />
          </div>
        </div>

        <div className="sidebar right-sidebar">
          {/* Section for popular posts */}
          <div className="popular-gossips-section hot-posts-sidebar">
            <PopularGossips gossips={gossips} />
          </div>

          {/* Section for top contributors */}
          <div className="top-contributors-section">
            <TopContributors />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
