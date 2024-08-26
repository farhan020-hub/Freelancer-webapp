import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';

const CommentForm = ({ jobId }) => {
  const [content, setContent] = useState('');
  const { addComment } = useContext(JobContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (content.trim()) {
      await addComment(jobId, content);
      setContent('');
    }
  };

  return (
    
    <form onSubmit={handleSubmit} className='comment-form'>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Add a comment..."
      ></textarea>
      <button type="submit">Submit Comment</button>
    </form>
  );
};

export default CommentForm;
