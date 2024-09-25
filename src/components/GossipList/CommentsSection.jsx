import React, { useState } from 'react';
import { getDatabase, ref, push, remove } from "firebase/database";

function CommentsSection({ gossipId, existingComments, currentUser }) {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const db = getDatabase();
      const commentsRef = ref(db, `gossips/${gossipId}/comments`);
      push(commentsRef, { text: newComment, author: currentUser }); // Use actual username
      setNewComment(""); // Reset comment input
    }
  };

  const handleCommentDelete = (commentId) => {
    const db = getDatabase();
    const commentRef = ref(db, `gossips/${gossipId}/comments/${commentId}`);
    remove(commentRef)
      .then(() => {
        console.log("Comment deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting comment:", error);
      });
  };

  return (
    <div className="comments-section">
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          placeholder="Προσθήκη Σχολίου"
          value={newComment}
          onChange={handleCommentChange}
          required
        />
        <button type="submit">Σχολίασε</button>
      </form>
      <ul>
        {Object.entries(existingComments || {}).map(([id, comment]) => (
          <li key={id}>
            <p>{comment.text}</p>
            <small>Από: {comment.author}</small>
            {currentUser === comment.author && (
              <button onClick={() => handleCommentDelete(id)}>Διαγραφή</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsSection;
