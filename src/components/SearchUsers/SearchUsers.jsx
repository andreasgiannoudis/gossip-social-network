import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { useNavigate } from 'react-router-dom';

function SearchUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const db = getDatabase();
    const usersRef = ref(db, "users");

    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      const usersList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setUsers(usersList);
    });
  }, []);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredUsers([]);
    } else {
      const results = users.filter((user) =>
        user.username && user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(results);
    }
  }, [searchTerm, users]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="search-users">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Ψάξε έναν χρήστη..."
        className="search-input"
      />
      {filteredUsers.length > 0 && (
        <ul className="search-results">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="search-result-item"
              onClick={() => handleUserClick(user.id)}
            >
              <img 
                src={user.profilePic} 
                alt="Profile" 
                className="profile-pic" 
              />
              <span>{user.username || "Unknown User"}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchUsers;
