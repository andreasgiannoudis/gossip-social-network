// PopularGossips.js
import React from 'react';
import GossipDisplay from '../GossipList/GossipDisplay';
import useFetchGossips from '../GossipList/FetchGossips';

const PopularGossips = () => {
  const gossips = useFetchGossips();

  // Sort gossips by likes and get the top 3
  const topGossips = gossips
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 3);

  return (
    <div className="sidebar hot-posts-sidebar">
      <h2>Δημοφιλή Σουσού <i className="fas fa-fire fire-icon"></i></h2>
      {topGossips.map(gossip => (
        <GossipDisplay key={gossip.id} gossip={gossip} />
      ))}
    </div>
  );
};

export default PopularGossips;
