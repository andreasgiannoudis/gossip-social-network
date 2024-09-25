import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import { ref, set, get, child } from 'firebase/database';
import sousou from "../../assets/img/sousou.jpg";

function LandingPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [postsCount, setPostsCount] = useState(0);
  const [eventsCount, setEventsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const targetPosts = 250;
    const targetEvents = 20;
    const postStep = Math.ceil(targetPosts / 30);
    const eventStep = Math.ceil(targetEvents / 30);
  
    let postsInterval = setInterval(() => {
      setPostsCount((prev) => (prev < targetPosts ? prev + postStep : targetPosts));
    }, 30);
  
    let eventsInterval = setInterval(() => {
      setEventsCount((prev) => (prev < targetEvents ? prev + eventStep : targetEvents));
    }, 30);
  
    return () => {
      clearInterval(postsInterval);
      clearInterval(eventsInterval);
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let loginEmail = email;
      if (username) {
        const userRef = ref(database, `users/`);
        const snapshot = await get(child(userRef, username));
        if (snapshot.exists()) {
          loginEmail = snapshot.val().email;
        } else {
          setError('Username not found');
          return;
        }
      }
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, loginEmail, password);
      navigate('/home');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: username });
      await set(ref(database, `users/${username}`), {
        username: username,
        email: email,
        profilePic: './src/assets/img/profile_pic.jpg',
      });
      navigate('/home');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    isSignUp ? handleSignUp(e) : handleLogin(e);
  };

  return (
    <div className="landing-page">
      <div className="content-section">
        <div className="intro-content">
          <h1>Καλωσήρθες στο Σουσού</h1>
          <p>Μοιράσου τα τελευταία νέα της γειτονιάς. Γίνε μέλος και ενημερώσου για ό,τι συμβαίνει κοντά σου!</p>
          <div className="counters">
            <div className="counter">
              <h2>{postsCount}+</h2>
              <p>Αναρτήσεις</p>
            </div>
            <div className="counter">
              <h2>{eventsCount}</h2>
              <p>Εκδηλώσεις</p>
            </div>
          </div>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="submit-button">{isSignUp ? 'Sign Up' : 'Login'}</button>
            </form>
            <button className="toggle-form" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Login' : 'Don’t have an account? Sign Up'}
            </button>
          </div>
        </div>
      </div>
      <div className="background-section"></div>
    </div>
  );
}

export default LandingPage;
