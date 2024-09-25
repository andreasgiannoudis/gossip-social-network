import React from 'react';
import GossipForm from '../../components/GossipForm/GossipForm';

function AddGossipPage() {
  return (
    <div className="add-gossip-page">
      <div className="header-section">
        <h1>Γράψε το δικό σου σουσού</h1>
        <p>Γράψε και μοιράσου τα πιο ενδιαφέροντα και spicy κουτσομπολιά της γειτονιάς σας!</p>
      </div>
      <GossipForm />
    </div>
  );
}

export default AddGossipPage;
