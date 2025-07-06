import React, { useState, useEffect, useRef } from 'react';
import commentIcon from '../pic/comment-5.png';

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

const HeartIcon = ({ isFilled }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 11.05 3.9 12 5.31C12.95 3.9 14.62 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={isFilled ? "red" : "none"}
    />
  </svg>
);

// const CommentsList = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [openCommentOptionsId, setOpenCommentOptionsId] = useState(null);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       setComments(data.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (response.ok) {
//         setNewComment('');
//         fetchComments();
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to delete comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditComment = async (commentId, newContent) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}?_method=put`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newContent }),
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to edit comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="comments-list">
//       {comments.slice(0, visibleCount).map((comment) => (
//         <div key={comment.id} className="comment-item">
//           <img src={comment.user.avatar} alt="User Avatar" className="comment-avatar" />
//           <div className="comment-content">
//             <span className="comment-user">{comment.user.name}</span>
//             <span className="comment-text">{comment.content}</span>
//             <span className="comment-time">{comment.created_at}</span>

//             {comment.can_edit && (
//               <div className="comment-options-container">
//                 <button
//                   className="comment-options-button"
//                   onClick={() =>
//                     setOpenCommentOptionsId(
//                       openCommentOptionsId === comment.id ? null : comment.id
//                     )
//                   }
//                 >
//                   <OptionsIcon />
//                 </button>
//                 {openCommentOptionsId === comment.id && (
//                   <div className="options-dropdown">
//                     <button
//                       className="options-item options-edit"
//                       onClick={() => {
//                         const newContent = prompt(
//                           "Edit your comment:",
//                           comment.content
//                         );
//                         if (newContent !== null)
//                           handleEditComment(comment.id, newContent);
//                       }}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="options-item options-delete"
//                       onClick={() => handleDeleteComment(comment.id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {visibleCount < comments.length && (
//         <button onClick={() => setVisibleCount(visibleCount + 10)}>Show More</button>
//       )}

//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//         />
//         <button onClick={handleAddComment}>Add Comment</button>
//       </div>
//     </div>
//   );
// };

// const CommentsList = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [visibleCount, setVisibleCount] = useState(10);

//   const currentUserId = JSON.parse(localStorage.getItem("user"))?.id;

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       setComments(data.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (response.ok) {
//         setNewComment('');
//         fetchComments();
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to delete comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditComment = async (commentId, newContent) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}?_method=put`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newContent }),
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to edit comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="comments-list">
//       {comments.slice(0, visibleCount).map((comment) => (
//         <div key={comment.id} className="comment-item" style={{ marginBottom: '20px' }}>
//           <img src={comment.user.avatar} alt="User Avatar" className="comment-avatar" />
//           <div className="comment-content">
//             <span className="comment-user">{comment.user.name}</span>
//             <span className="comment-text">{comment.content}</span>
//             <span className="comment-time">{comment.created_at}</span>

//             {comment.can_edit === true && (
//               <div className="comment-actions" style={{ marginTop: '8px' }}>
//                 <button
//                   style={{
//                     marginRight: '10px',
//                     backgroundColor: '#f0f0f0',
//                     border: '1px solid #ccc',
//                     padding: '5px 10px',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}
//                   onClick={() => {
//                     const newContent = prompt("Edit your comment:", comment.content);
//                     if (newContent !== null) handleEditComment(comment.id, newContent);
//                   }}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   style={{
//                     backgroundColor: '#ffe6e6',
//                     border: '1px solid #f00',
//                     color: '#f00',
//                     padding: '5px 10px',
//                     borderRadius: '5px',
//                     cursor: 'pointer'
//                   }}
//                   onClick={() => handleDeleteComment(comment.id)}
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {visibleCount < comments.length && (
//         <button onClick={() => setVisibleCount(visibleCount + 10)}>Show More</button>
//       )}

//       <div className="add-comment" style={{ marginTop: '20px' }}>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//           style={{ width: '100%', height: '60px', marginBottom: '10px' }}
//         />
//         <button
//           onClick={handleAddComment}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Add Comment
//         </button>
//       </div>
//     </div>
//   );
// };

// const CommentsList = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [visibleCount, setVisibleCount] = useState(10);
//   const [openOptionsId, setOpenOptionsId] = useState(null); // لتتبع التعليق المفتوح خياراته

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       setComments(data.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (response.ok) {
//         setNewComment('');
//         fetchComments();
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to delete comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditComment = async (commentId, newContent) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}?_method=put`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newContent }),
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to edit comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="comments-list">
//       {comments.slice(0, visibleCount).map((comment) => (
//         <div key={comment.id} className="comment-item" style={{ marginBottom: '20px', position: 'relative' }}>
//           <img src={comment.user.avatar} alt="User Avatar" className="comment-avatar" />
//           <div className="comment-content">
//             <span className="comment-user">{comment.user.name}</span>
//             <span className="comment-text">{comment.content}</span>
//             <span className="comment-time">{comment.created_at}</span>

//             {/* زر 3 نقاط دائم */}
//             <button
//               onClick={() => setOpenOptionsId(openOptionsId === comment.id ? null : comment.id)}
//               style={{
//                 position: 'absolute',
//                 top: '5px',
//                 right: '5px',
//                 border: 'none',
//                 background: 'none',
//                 fontSize: '20px',
//                 cursor: 'pointer'
//               }}
//             >
//               ⋯
//             </button>

//             {/* القائمة تظهر لما يتم الضغط على 3 نقاط */}
//             {/* {openOptionsId === comment.id && (
//               <div style={{
//                 position: 'absolute',
//                 top: '30px',
//                 right: '5px',
//                 backgroundColor: '#fff',
//                 border: '1px solid #ccc',
//                 borderRadius: '5px',
//                 boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//                 zIndex: 1000
//               }}>
//                 <button
//                   disabled={!comment.can_edit}
//                   onClick={() => {
//                     const newContent = prompt("Edit your comment:", comment.content);
//                     if (newContent !== null && comment.can_edit) {
//                       handleEditComment(comment.id, newContent);
//                       setOpenOptionsId(null);
//                     }
//                   }}
//                   style={{
//                     display: 'block',
//                     padding: '8px 12px',
//                     width: '100%',
//                     textAlign: 'left',
//                     background: 'none',
//                     border: 'none',
//                     cursor: comment.can_edit ? 'pointer' : 'not-allowed',
//                     color: comment.can_edit ? '#000' : '#999'
//                   }}
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   disabled={!comment.can_edit}
//                   onClick={() => {
//                     if (comment.can_edit) {
//                       handleDeleteComment(comment.id);
//                       setOpenOptionsId(null);
//                     }
//                   }}
//                   style={{
//                     display: 'block',
//                     padding: '8px 12px',
//                     width: '100%',
//                     textAlign: 'left',
//                     background: 'none',
//                     border: 'none',
//                     cursor: comment.can_edit ? 'pointer' : 'not-allowed',
//                     color: comment.can_edit ? '#f00' : '#999'
//                   }}
//                 >
//                   🗑 Delete
//                 </button>
//               </div>
//             )} */}
//             {openOptionsId === comment.id && (
//   <div style={{
//     position: 'absolute',
//     top: '30px',
//     right: '5px',
//     backgroundColor: '#fff',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
//     zIndex: 1000
//   }}>
//     <button
//       onClick={() => {
//         const newContent = prompt("Edit your comment:", comment.content);
//         if (newContent !== null) {
//           handleEditComment(comment.id, newContent);
//           setOpenOptionsId(null);
//         }
//       }}
//       style={{
//         display: 'block',
//         padding: '8px 12px',
//         width: '100%',
//         textAlign: 'left',
//         background: 'none',
//         border: 'none',
//         cursor: 'pointer',
//         color: '#000'
//       }}
//     >
//       ✏️ Edit
//     </button>
//     <button
//       onClick={() => {
//         handleDeleteComment(comment.id);
//         setOpenOptionsId(null);
//       }}
//       style={{
//         display: 'block',
//         padding: '8px 12px',
//         width: '100%',
//         textAlign: 'left',
//         background: 'none',
//         border: 'none',
//         cursor: 'pointer',
//         color: '#f00'
//       }}
//     >
//       🗑 Delete
//     </button>
//   </div>
// )}

//           </div>
//         </div>
//       ))}

//       {visibleCount < comments.length && (
//         <button onClick={() => setVisibleCount(visibleCount + 10)}>Show More</button>
//       )}

//       <div className="add-comment" style={{ marginTop: '20px' }}>
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//           style={{ width: '100%', height: '60px', marginBottom: '10px' }}
//         />
//         <button
//           onClick={handleAddComment}
//           style={{
//             padding: '8px 16px',
//             backgroundColor: '#007bff',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             cursor: 'pointer'
//           }}
//         >
//           Add Comment
//         </button>
//       </div>
//     </div>
//   );
// };

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const [openOptionsId, setOpenOptionsId] = useState(null);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
        },
      });
      const data = await response.json();
      setComments(data.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        setNewComment('');
        fetchComments();
      } else {
        console.error('Failed to add comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        fetchComments();
      } else {
        console.error('Failed to delete comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditComment = async (commentId, newContent) => {
    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}?_method=put`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newContent }),
      });

      if (response.ok) {
        fetchComments();
        setEditingCommentId(null);
        setEditedContent('');
      } else {
        console.error('Failed to edit comment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="comments-list">
      {comments.slice(0, visibleCount).map((comment) => (
        <div key={comment.id} className="comment-item" style={{ marginBottom: '20px', position: 'relative' }}>
          <img src={comment.user.avatar} alt="User Avatar" className="comment-avatar" />
          <div className="comment-content">
            <span className="comment-user">{comment.user.name}</span>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  style={{ width: '100%', height: '60px', marginTop: '10px' }}
                />
                <div style={{ marginTop: '5px' }}>
                  <button
                    onClick={() => handleEditComment(comment.id, editedContent)}
                    style={{
                      marginRight: '10px',
                      backgroundColor: 'gray',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                     حفظ
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    style={{
                      backgroundColor: '#f44336',
                      color: '#fff',
                      padding: '5px 10px',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}
                  >
                    إلغاء
                  </button>
                </div>
              </>
            ) : (
              <>
                <span className="comment-text">{comment.content}</span>
                <span className="comment-time">{comment.created_at}</span>
              </>
            )}

            <button
              onClick={() => setOpenOptionsId(openOptionsId === comment.id ? null : comment.id)}
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                border: 'none',
                background: 'none',
                fontSize: '20px',
                cursor: 'pointer'
              }}
            >
              ⋯
            </button>

            {openOptionsId === comment.id && (
              <div style={{
                position: 'absolute',
                top: '30px',
                right: '5px',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
                zIndex: 1000
              }}>
                <button
                  onClick={() => {
                    setEditingCommentId(comment.id);
                    setEditedContent(comment.content);
                    setOpenOptionsId(null);
                  }}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#000'
                  }}
                >
                     Edit
                </button>
                <button
                  onClick={() => {
                    handleDeleteComment(comment.id);
                    setOpenOptionsId(null);
                  }}
                  style={{
                    display: 'block',
                    padding: '8px 12px',
                    width: '100%',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#f00'
                  }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {visibleCount < comments.length && (
        <button onClick={() => setVisibleCount(visibleCount + 10)}>Show More</button>
      )}

      <div className="add-comment" style={{ marginTop: '20px' }}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          style={{ width: '100%', height: '60px', marginBottom: '10px' }}
        />
        <button
          onClick={handleAddComment}
          style={{
            padding: '5px 10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
};

const Post = ({ post, onLike, onShowComments, isMyPostsPage }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [editedImage, setEditedImage] = useState(null);
  const optionsRef = useRef(null);

  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (optionsRef.current && !optionsRef.current.contains(event.target)) {
        setIsOptionsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLike = async () => {
    try {
      const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}/like`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsLiked(data.data.is_liked);
        setLikesCount(data.data.likes_count);
      } else {
        console.error('Failed to like/unlike post');
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        <div className="action-item" onClick={handleLike}>
          <HeartIcon isFilled={isLiked} />
          <span>{likesCount} React</span>
        </div>
        <div className="action-item" onClick={() => setShowComments(!showComments)}>
          <img src={commentIcon} alt="Comment" className="action-icon" />
          <span>{post.comments} Reply</span>
        </div>
      </div>

      {showComments && <CommentsList postId={post.id} />}
    </div>
  );
};

export default Post;



// import React, { useState, useEffect, useRef } from 'react';
// import commentIcon from '../pic/comment-5.png';

// const OptionsIcon = () => (
//   <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
//     xmlns="http://www.w3.org/2000/svg">
//     <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
//       stroke="#4F4F4F" strokeWidth="2"
//       strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
//       stroke="#4F4F4F" strokeWidth="2"
//       strokeLinecap="round" strokeLinejoin="round" />
//     <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
//       stroke="#4F4F4F" strokeWidth="2"
//       strokeLinecap="round" strokeLinejoin="round" />
//   </svg>
// );

// const HeartIcon = ({ isFilled }) => (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.69C2 5.6 4.49 3.1 7.56 3.1C9.38 3.1 11.05 3.9 12 5.31C12.95 3.9 14.62 3.1 16.44 3.1C19.51 3.1 22 5.6 22 8.69C22 15.69 15.52 19.82 12.62 20.81Z"
//       stroke="#828282"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       fill={isFilled ? "red" : "none"}
//     />
//   </svg>
// );

// const CommentsList = ({ postId }) => {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [visibleCount, setVisibleCount] = useState(10);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });
//       const data = await response.json();
//       setComments(data.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleAddComment = async () => {
//     if (!newComment.trim()) return;

//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${postId}/comments`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newComment }),
//       });

//       if (response.ok) {
//         setNewComment('');
//         fetchComments();
//       } else {
//         console.error('Failed to add comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to delete comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleEditComment = async (commentId, newContent) => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/comments/${commentId}?_method=put`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ content: newContent }),
//       });

//       if (response.ok) {
//         fetchComments();
//       } else {
//         console.error('Failed to edit comment');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="comments-list">
//       {comments.slice(0, visibleCount).map((comment) => (
//         <div key={comment.id} className="comment-item">
//           <img src={comment.user.avatar} alt="User Avatar" className="comment-avatar" />
//           <div className="comment-content">
//             <span className="comment-user">{comment.user.name}</span>
//             <span className="comment-text">{comment.content}</span>
//             <span className="comment-time">{comment.created_at}</span>
//             {comment.can_edit && (
//               <div className="comment-actions">
//                 <button onClick={() => {
//                   const newContent = prompt("Edit your comment:", comment.content);
//                   if (newContent !== null) handleEditComment(comment.id, newContent);
//                 }}>Edit</button>
//                 <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}

//       {visibleCount < comments.length && (
//         <button onClick={() => setVisibleCount(visibleCount + 10)}>Show More</button>
//       )}

//       <div className="add-comment">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//         />
//         <button onClick={handleAddComment}>Add Comment</button>
//       </div>
//     </div>
//   );
// };

// const Post = ({ post, onLike, onShowComments, isMyPostsPage }) => {
//   const [isOptionsOpen, setIsOptionsOpen] = useState(false);
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [editedContent, setEditedContent] = useState(post.content);
//   const [editedImage, setEditedImage] = useState(null);
//   const optionsRef = useRef(null);

//   const [isLiked, setIsLiked] = useState(post.is_liked);
//   const [likesCount, setLikesCount] = useState(post.likes);
//   const [showComments, setShowComments] = useState(false);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (optionsRef.current && !optionsRef.current.contains(event.target)) {
//         setIsOptionsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLike = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}/like`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setIsLiked(data.data.is_liked);
//         setLikesCount(data.data.likes_count);
//       } else {
//         console.error('Failed to like/unlike post');
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//       });

//       if (response.ok) {
//         alert('Post deleted successfully.');
//         window.location.reload();
//       } else {
//         alert('Failed to delete post.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error deleting post.');
//     }
//   };

//   const handleEdit = () => {
//     setIsEditOpen(true);
//   };

//   const handleSaveEdit = async () => {
//     const formData = new FormData();
//     formData.append('content', editedContent);
//     if (editedImage) {
//       formData.append('image', editedImage);
//     }

//     try {
//       const response = await fetch(`http://app.elfar5a.com/api/community/posts/${post.id}?_method=put`, {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//           Accept: 'application/json',
//         },
//         body: formData,
//       });

//       if (response.ok) {
//         alert('Post updated successfully.');
//         window.location.reload();
//       } else {
//         alert('Failed to update post.');
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Error updating post.');
//     }
//   };

//   return (
//     <div className="post">
//       <div className="post-header">
//         <img src={post.user.avatar} alt="User Avatar" className="post-avatar" />
//         <div className="post-user-info">
//           <span className="post-username">
//             {post.user.name} <span className="post-shared-text">Shared a Post </span>
//             <span className="post-timestamp">{post.created_at}</span>
//           </span>
//         </div>

//         <div className="post-options-container" ref={optionsRef}>
//           <button className="post-options-button" onClick={() => setIsOptionsOpen(!isOptionsOpen)}>
//             <OptionsIcon />
//           </button>
//           {isOptionsOpen && (
//             <div className="options-dropdown">
//               {isMyPostsPage ? (
//                 <>
//                   <button className="options-item options-edit" onClick={handleEdit}>Edit</button>
//                   <button className="options-item options-delete" onClick={handleDelete}>Delete</button>
//                 </>
//               ) : (
//                 <button className="options-item">Report</button>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {isEditOpen ? (
//         <div className="post-editing">
//           <textarea
//             value={editedContent}
//             onChange={(e) => setEditedContent(e.target.value)}
//             rows="4"
//             placeholder="Edit your content"
//           />
//           {(editedImage || post.image) && (
//             <img
//               src={editedImage ? URL.createObjectURL(editedImage) : post.image}
//               alt="Current post"
//               className="post-media-image"
//             />
//           )}
//           <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setEditedImage(e.target.files[0])}
//           />
//           <button onClick={handleSaveEdit}>Save</button>
//           <button onClick={() => setIsEditOpen(false)}>Cancel</button>
//         </div>
//       ) : (
//         <div className="post-content">
//           <p>{post.content}</p>
//           {post.image && (
//             <img
//               src={post.image}
//               alt="Post content"
//               className="post-media-image"
//             />
//           )}
//         </div>
//       )}

//       <div className="post-actions">
//         <div className="action-item" onClick={handleLike}>
//           <HeartIcon isFilled={isLiked} />
//           <span>{likesCount} React</span>
//         </div>
//         <div className="action-item" onClick={() => setShowComments(!showComments)}>
//           <img src={commentIcon} alt="Comment" className="action-icon" />
//           <span>{post.comments} Reply</span>
//         </div>
//       </div>

//       {showComments && <CommentsList postId={post.id} />}
//     </div>
//   );
// };

// export default Post;

