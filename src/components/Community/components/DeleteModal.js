import React from 'react';

const DeleteModal = ({ post, onClose, onConfirm }) => {
  if (!post) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h3>هل أنت متأكد أنك تريد حذف هذا المنشور؟</h3>
        <div className="modal-post-info">
          <p>"{post.text.substring(0, 100) + (post.text.length > 100 ? '...' : '')}"</p>
        </div>
        <div className="modal-actions">
          <button className="danger-button" onClick={onConfirm}>حذف</button>
          <button onClick={onClose}>إلغاء</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;