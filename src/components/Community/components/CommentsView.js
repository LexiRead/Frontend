import React from 'react';

const CommentsView = ({ post, commentsData }) => {
    
  // TODO: Add API here to post a new comment

  return (
    <div className="comments-view-container">
      <h2>تعليقات على المنشور "{post.text.substring(0, 30)}..."</h2>
      <div className="comments-list">
        {commentsData.length > 0 ? (
          commentsData.map((comment, index) => (
            <div key={index} className="comment">
              <img src={comment.avatar} alt="Avatar" className="avatar" />
              <div className="comment-content">
                <span className="username">{comment.user}</span>
                <p className="text">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p>لا توجد تعليقات بعد. كن أول من يعلق!</p>
        )}
      </div>
      <div className="comment-input-area">
        <img src="https://via.placeholder.com/40?text=User" alt="Avatar" className="avatar" />
        <input type="text" placeholder="أضف تعليقاً..." />
        <button onClick={() => alert('Submit comment functionality to be implemented!')}>إرسال</button>
      </div>
    </div>
  );
};

export default CommentsView;