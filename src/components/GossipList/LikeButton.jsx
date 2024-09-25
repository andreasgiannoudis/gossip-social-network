import React, { useState } from 'react';
import { getDatabase, ref, update } from "firebase/database";

function LikeButton({ gossip, currentUser }) {
  const initialLiked = gossip.likes && gossip.likes[currentUser];
  const [liked, setLiked] = useState(initialLiked);
  const [likesCount, setLikesCount] = useState(gossip.likesCount || 0); // Use likesCount from gossip

  const handleLikeToggle = () => {
    const db = getDatabase();
    const gossipRef = ref(db, `gossips/${gossip.id}`);

    let updatedLikesCount = likesCount;
    let updatedLikes;
    
    if (liked) {
      // Remove like
      updatedLikes = { ...gossip.likes, [currentUser]: null };
      updatedLikesCount -= 1;
      setLiked(false);
    } else {
      // Add like
      updatedLikes = { ...gossip.likes, [currentUser]: true };
      updatedLikesCount += 1;
      setLiked(true);
    }

    update(gossipRef, { likes: updatedLikes, likesCount: updatedLikesCount })
      .then(() => {
        setLikesCount(updatedLikesCount);
        console.log(liked ? "Like removed successfully" : "Post liked successfully");
      })
      .catch((error) => {
        console.error("Error updating likes:", error);
      });
  };

  return (
    <button onClick={handleLikeToggle} >
      {liked ? '💔 Unlike' : '❤️ Like'} ({likesCount}) Likes
    </button>
  );
}

export default LikeButton;
