import React, { useState, useEffect, useRef } from 'react';

// SVG Icons
const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 11.05 3.9 12 5.31C12.95 3.9 14.62 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
      stroke="#828282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReplyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M8.5 19H12.5C17 19 19.5 17 19.5 13.5C19.5 10 17 8 12.5 8H4.5"
      stroke="#828282" strokeWidth="1.5" strokeMiterlimit="10"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 10.5L3.5 8L6 5.5"
      stroke="#828282" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OptionsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
      stroke="#4F4F4F" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
      stroke="#4F4F4F" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
      stroke="#4F4F4F" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Post = ({ post, onLike, onShowComments, isMyPostsPage }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImage, setEditedImage] = useState(null);
  const optionsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        alert('Post deleted successfully.');
        window.location.reload();
      } else {
        alert('Failed to delete post.');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting post.');
    }
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append('content', editedContent);
    if (editedImage) {
      formData.append('image', editedImage);
    }

    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}?_method=put`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
        },
        body: formData,
      });

      if (response.ok) {
        alert('Post updated successfully.');
        window.location.reload();
      } else {
        alert('Failed to update post.');
      }
    } catch (error) {
      console.error(error);
      alert('Error updating post.');
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <img src={post.user.avatar} alt="User Avatar" className="post-avatar" />
        <div className="post-user-info">
          <span className="post-username">
            {post.user.name} <span className="post-shared-text">Shared a Post </span>
            <span className="post-timestamp">{post.created_at}</span>
          </span>
        </div>

        <div className="post-options-container" ref={optionsRef}>
          <button className="post-options-button" onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
            <OptionsIcon />
          </button>
          {isOptionsOpen && (
            <div className="options-dropdown">
              {isMyPostsPage ? (
                <>
                  <button className="options-item options-edit" onClick={handleEdit}>Edit</button>
                  <button className="options-item options-delete" onClick={handleDelete}>Delete</button>
                </>
              ) : (
                <button className="options-item">Report</button>
              )}
            </div>
          )}
        </div>
      </div>

      {isEditOpen ? (
        <div className="post-editing">
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            rows="4"
            placeholder="Edit your content"
          />
          {(editedImage || post.image) && (
            <img
              src={editedImage ? URL.createObjectURL(editedImage) : post.image}
              alt="Current post"
              className="post-media-image"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setEditedImage(e.target.files[0])}
          />
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={() => setIsEditOpen(false)}>Cancel</button>
        </div>
      ) : (
        <div className="post-content">
          <p>{post.content}</p>
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="post-media-image"
            />
          )}
        </div>
      )}

      <div className="post-actions">
        <div className="action-item" style={{}} onClick={() => onLike(post.id)}>
          <HeartIcon />
          <span>{post.likes} React</span>
        </div>
        <div className="action-item" onClick={() => onShowComments(post)}>
          <ReplyIcon />
          <span>{post.comments} Reply</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
