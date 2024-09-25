// GossipList.js
import React from 'react';
import CommentsSection from './CommentsSection';
import GossipDisplay from './GossipDisplay'; 
import FetchGossips from './FetchGossips';
import { getDatabase, ref, remove, update } from 'firebase/database';

function GossipList({ currentUser }) {
  const gossips = FetchGossips();

  const handleDelete = (gossipId) => {
    const db = getDatabase();
    const gossipRef = ref(db, `gossips/${gossipId}`);
    remove(gossipRef)
      .then(() => {
        console.log("Post deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
      });
  };

  const handleLikeToggle = (gossip) => {
    const db = getDatabase();
    const gossipRef = ref(db, `gossips/${gossip.id}`);

    const hasLiked = gossip.likes && gossip.likes[currentUser];
    const updatedLikesCount = hasLiked ? gossip.likesCount - 1 : gossip.likesCount + 1;

    const updatedLikes = {
      ...gossip.likes,
      [currentUser]: !hasLiked
    };

    update(gossipRef, { 
      likes: updatedLikes,
      likesCount: updatedLikesCount
    })
      .then(() => {
        console.log("Like status updated successfully");
      })
      .catch((error) => {
        console.error("Error updating like status:", error);
      });
  };

  return (
    <div className="gossip-list">
      <ul>
        {gossips.map((gossip) => (
          <li key={gossip.id}>
            <GossipDisplay gossip={gossip} />
            <LikeButton gossip={gossip} onToggleLike={() => handleLikeToggle(gossip)} currentUser={currentUser} />

            {currentUser === gossip.author && (
              <button onClick={() => handleDelete(gossip.id)}>Διαγραφή</button>
            )}
            
            <CommentsSection gossipId={gossip.id} existingComments={gossip.comments} currentUser={currentUser} />
          </li>
        ))}
      </ul>
    </div>
  );
  
}

const LikeButton = ({ gossip, onToggleLike, currentUser }) => {
  const hasLiked = gossip.likes && gossip.likes[currentUser];

  return (
    <button onClick={onToggleLike}>
      {hasLiked ? '💔 Unlike' : '❤️ Like'} {gossip.likesCount} Likes
    </button>
  );
};

export default GossipList;
