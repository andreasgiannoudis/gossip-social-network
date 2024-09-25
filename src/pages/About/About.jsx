import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import teamMember1 from '../../assets/img/profile_pic.jpg'; // Ensure correct paths
import teamMember2 from '../../assets/img/profile_pic.jpg';

function About() {
  return (
    <div className="about">
      <h2>Σχετικά με το Σουσού</h2>
      <p>
        Το Σουσού είναι μια πλατφόρμα που επιτρέπει στους γείτονες να μοιράζονται φήμες και ειδήσεις για τη γειτονιά τους.
        Είναι ο ιδανικός τρόπος για να μείνετε ενημερωμένοι για τα τελευταία νέα της περιοχής σας, να επικοινωνήσετε με
        τους γείτονές σας και να συμμετάσχετε σε συζητήσεις που σας ενδιαφέρουν. Ελάτε μαζί μας και γίνετε μέρος της
        κοινότητάς μας!
      </p>

      <div className="about-team">
        <h3>Η ομάδα μας</h3>
        <div className="team-members">
          <div className="team-member">
            <img src={teamMember1} alt="Ανδρέας Γιαννούδης" />
            <p><strong>CEO:</strong> Ανδρέας Γιαννούδης</p>
          </div>
          <div className="team-member">
            <img src={teamMember2} alt="Μαργιάννα Καϊτζή" />
            <p><strong>CFO:</strong> Μαργιάννα Καϊτζή</p>
          </div>
        </div>
      </div>

      <div className="social-media">
        <h3>Ακολουθήστε μας</h3>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;
