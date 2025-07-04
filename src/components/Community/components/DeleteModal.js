import React from 'react';

const DeleteModal = ({ post, onClose, onConfirm }) => {
  if (!post) return null;

  const contentPreview = post.content || ''; // استخدم الخاصية الصحيحة

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>×</span>
        <h3>هل أنت متأكد أنك تريد حذف هذا المنشور؟</h3>
        <div className="modal-post-info">
          <p>"{contentPreview.substring(0, 100) + (contentPreview.length > 100 ? '...' : '')}"</p>
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
