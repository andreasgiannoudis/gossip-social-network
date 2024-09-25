// FetchGossips.js
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";

const FetchGossips = () => {
  const [gossips, setGossips] = useState([]);

  useEffect(() => {
    const fetchGossips = async () => {
      const db = getDatabase();
      const gossipsRef = ref(db, 'gossips');

      onValue(gossipsRef, async (snapshot) => {
        const gossipsData = [];
        const gossips = snapshot.val();

        for (const id in gossips) {
          const gossip = gossips[id];
          const userRef = ref(db, `users/${gossip.author}`);
          const userSnapshot = await get(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            gossip.authorProfilePic = userData.profilePic; // Add the author's profile picture
          }

          // Add the id and timestamp to the gossip object
          gossipsData.push({ id, ...gossip });
        }

        // Sort gossips by timestamp (latest first)
        const sortedGossips = gossipsData.sort((a, b) => b.timestamp - a.timestamp);

        setGossips(sortedGossips);
      });
    };

    fetchGossips();
  }, []);

  return gossips;
};

export default FetchGossips;
