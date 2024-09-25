import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebaseConfig';
import { getDatabase, ref, push } from "firebase/database";

function PostGossipForm({ addGossip }) {
  const [newGossip, setNewGossip] = useState({ title: "", description: "" });
  const [username, setUsername] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsername(user.displayName || user.email); // Fallback to email if no display name
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newGossip.title && newGossip.description) {
      const gossipToAdd = { 
        ...newGossip, 
        author: username,
        likes: {}, // Initialize likes as an empty object
        likesCount: 0, // Initialize likes count to 0
        timestamp: Date.now(), // Add a timestamp property
      };
      
      const db = getDatabase();
      const gossipsRef = ref(db, 'gossips/');
      
      // Push to database first
      push(gossipsRef, gossipToAdd)
        .then((snapshot) => {
          // Use the snapshot key to update local state
          addGossip({ ...gossipToAdd, id: snapshot.key }); // Include the ID returned from Firebase
          setNewGossip({ title: "", description: "" }); // Reset form fields
        })
        .catch((error) => {
          console.error("Error adding gossip:", error);
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGossip((prevGossip) => ({ ...prevGossip, [name]: value }));
  };

  return (
    <div className="post-gossip-form">
      <h3>Γράψε το δικό σου σουσού</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Τίτλος"
          value={newGossip.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Περιγραφή"
          value={newGossip.description}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Δημοσίευση</button>
      </form>
    </div>
  );
}

export default PostGossipForm;
