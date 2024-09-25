import React, { useEffect, useState } from 'react';
import { auth, database } from '../../firebaseConfig';
import { ref, onValue, remove } from 'firebase/database';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Gossips = () => {
  const [gossips, setGossips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGossips = () => {
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userRef = ref(database, `gossips`);

        onValue(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log("Gossips data:", data);

            const userGossips = Object.entries(data)
              .filter(([key, gossip]) => gossip.author === currentUser.displayName)
              .map(([key, gossip]) => ({ id: key, ...gossip }));

            setGossips(userGossips);
          } else {
            console.log("No gossips found.");
            setGossips([]);
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching gossips:", error);
          setLoading(false);
        });
      } else {
        console.log("User not authenticated.");
        setLoading(false);
      }
    };

    fetchGossips();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      const postRef = ref(database, `gossips/${id}`);
      remove(postRef)
        .then(() => {
          setGossips(gossips.filter(gossip => gossip.id !== id)); // Update state to remove the deleted post
          console.log("Post deleted successfully.");
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="gossips-container">
      <h1>Τα σουσού μου</h1>
      {gossips.length > 0 ? (
        gossips.map((gossip) => (
          <div className="gossip-post" key={gossip.id}>
            <h2>{gossip.title}</h2>
            <p>{gossip.description}</p>
            <p>Likes: {gossip.likesCount}</p>
            <p>Posted on: {new Date(gossip.timestamp).toLocaleString()}</p>
            <button className="delete-button" onClick={() => handleDelete(gossip.id)}>
              <FontAwesomeIcon icon={faTrash} />
              <span> Delete</span>
            </button>
          </div>
        ))
      ) : (
        <p>No gossips found.</p>
      )}
    </div>
  );
};

export default Gossips;
