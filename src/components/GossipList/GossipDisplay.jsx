import React from 'react';

const GossipDisplay = ({ gossip }) => {
  return (
    <div className="gossip-display">
      <div className="gossip-header">
        <img 
          src={gossip.authorProfilePic}
          alt={`${gossip.author}'s profile`}
          className="profile-pic"
        />
        <h3>{gossip.title}</h3>
        <small>Από: {gossip.author}</small>
      </div>
      <p>{gossip.description}</p>
      <span> {gossip.likesCount || 0} Likes</span>
    </div>
  );
};

export default GossipDisplay;
