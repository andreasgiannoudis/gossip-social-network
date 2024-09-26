import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function TopContributors() {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users/");
    
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert user data to an array
        const usersArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        
        // Sort by number of posts (gossipsCount) in descending order
        const sortedUsers = usersArray
          .filter((user) => user.gossipsCount) // Filter out users without gossips
          .sort((a, b) => b.gossipsCount - a.gossipsCount)
          .slice(0, 5); // Get the top 5 contributors

        setTopUsers(sortedUsers);
      }
    });
  }, []);

  return (
    <div className="top-contributors">
      <h2>Top Contributors</h2>
      <ul>
        {topUsers.map((user) => (
          <li key={user.id}>
            <strong>{user.username || user.email}</strong> {user.gossipsCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopContributors;
