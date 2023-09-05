import React, { useState } from 'react';
import './style/forum.css';
import { Link } from "react-router-dom";
import Navbar from '../layout/nav';


function Forum() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const handleAddPost = () => {
    if (newPost.trim() !== '') {
      const newPostObj = {
        content: newPost,
        id: Date.now(),
        createdAt: new Date().toLocaleString(),
      };
      setPosts([...posts, newPostObj]);
      setNewPost('');
    }
  };

  const handleCommentChange = (event, postId) => {
    setNewComment(event.target.value);
    setComments({
      ...comments,
      [postId]: event.target.value,
    });
  };

  const handleAddComment = (postId) => {
    if (newComment.trim() !== '') {
      const postIndex = posts.findIndex((post) => post.id === postId);
      if (postIndex !== -1) {
        const updatedPosts = [...posts];
        updatedPosts[postIndex].comments = updatedPosts[postIndex].comments || [];
        const commentObj = {
          content: newComment,
          createdAt: new Date().toLocaleString(),
        };
        updatedPosts[postIndex].comments.push(commentObj);
        setPosts(updatedPosts);
        setComments({
          ...comments,
          [postId]: '',
        });
      }
    }
  };

  return (
    <div className="App">
          <div>
            <Navbar/>
          </div>
      <header className="App-header">
        <h1>Simple Forum</h1>
      </header>
      <main>
        <div className="post-container">
          <h2>Posts</h2>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <p>{post.content}</p>
                <p>Posted at: {post.createdAt}</p>
                <div className="comment-container">
                  <input
                    type="text"
                    value={comments[post.id] || ''}
                    onChange={(e) => handleCommentChange(e, post.id)}
                    placeholder="Enter your comment here..."
                  />
                  <button onClick={() => handleAddComment(post.id)}>Add Comment</button>
                  {post.comments && (
                    <ul className="comment-list">
                      {post.comments.map((comment, index) => (
                        <li key={index}>
                          {comment.content}
                          <p>Commented at: {comment.createdAt}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="new-post-container">
          <h2>Create a new post</h2>
          <input
            type="text"
            value={newPost}
            onChange={handlePostChange}
            placeholder="Enter your post here..."
          />
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      </main>
    </div>
  );
}

export default Forum;