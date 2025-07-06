import React, { useState, useEffect, useRef } from 'react';
import './Community.css';
import Feed from './components/Feed';
import DeleteModal from './components/DeleteModal';
import CommentsView from './components/CommentsView';
import { mockComments } from './mockData';

const API_BASE_URL = "http://app.elfar5a.com";
const USER_TOKEN = localStorage.getItem("authToken");

// أيقونة الإرسال
const SendIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path d="M7.4 6.32L15.89 3.49C19.7 2.22 21.77 4.3 20.51 8.11L17.68 16.6C15.78 22.31 12.66 22.31 10.76 16.6L9.92 14.08L7.4 13.24C1.69 11.34 1.69 8.23 7.4 6.32Z"
      stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10.11 13.65L15.3 8.46"
      stroke="#292D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// ✅ إدخال المنشور
const PostInput = ({ onPostAdded }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    if (!content && !image) {
      alert('يرجى كتابة محتوى أو رفع صورة أولاً.');
      return;
    }

    const formData = new FormData();
    formData.append('content', content);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/community/posts`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${USER_TOKEN}`,
        },
        body: formData
      });

      if (!response.ok) throw new Error('فشل إضافة المنشور');

      const result = await response.json();
      console.log('✅ تم النشر:', result);
      alert("تم رفع المنشور بنجاح")

      setContent('');
      setImage(null);

      if (onPostAdded) onPostAdded(); // إعادة تحميل المنشورات
    } catch (error) {
      console.error('Error creating post:', error);
      alert('حدث خطأ أثناء رفع المنشور.');
    }
  };

  return (
    <div className="post-input-container">
      <textarea
        type="text"
        className="post-input-field"
        placeholder="What’s on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      <button type="button" className="upimg-input-button" title=" Upload Image" onClick={handleImageClick}>
        <i className="fa-regular fa-image"></i>
      </button>

      <button className="post-input-button" title="Post" onClick={handlePost}>
        {/* Post */}
         <SendIcon />
      </button>
    </div>
  );
};

// ✅ المكون الرئيسي
const Community = () => {
  const [activeTab, setActiveTab] = useState('for-you');
  const [posts, setPosts] = useState([]);
  const [postToDelete, setPostToDelete] = useState(null);
  const [viewingCommentsForPost, setViewingCommentsForPost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchPosts = async (page = 1, append = false) => {
    try {
      let url = activeTab === 'for-you'
        ? `${API_BASE_URL}/api/community/posts?page=${page}`
        : `${API_BASE_URL}/api/community/user/posts?page=${page}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${USER_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) throw new Error('فشل جلب المنشورات');

      const result = await response.json();
      if (append) {
        setPosts(prev => [...prev, ...result.data.data]);
      } else {
        setPosts(result.data.data);
      }
      setCurrentPage(result.data.meta.current_page);
      setLastPage(result.data.meta.last_page);

    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [activeTab]);

  const handleLoadMore = () => {
    if (currentPage < lastPage) {
      fetchPosts(currentPage + 1, true);
    }
  };

  const handleLike = (postId) => {
    console.log(`API: Like post ${postId}`);
    setPosts(posts.map(p =>
      (p.id === postId ? { ...p, likes: p.likes + 1, hasLiked: true } : p)
    ));
  };

  // const handleDelete = () => {
  //   if (!postToDelete) return;
  //   console.log(`API: Delete post ${postToDelete.id}`);
  //   setPosts(posts.filter(p => p.id !== postToDelete.id));
  //   setPostToDelete(null);
  // };
  const handleDelete = async () => {
  if (!postToDelete) return;

  try {
    const response = await fetch(`${API_BASE_URL}/api/community/posts/${postToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${USER_TOKEN}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('فشل حذف المنشور');
    }

    console.log('✅ تم حذف المنشور من الـ API');

    // احذف البوست من الـ state بعد نجاح الحذف
    setPosts(posts.filter(p => p.id !== postToDelete.id));
    setPostToDelete(null);

  } catch (error) {
    console.error('❌ خطأ أثناء الحذف:', error);
    alert('حدث خطأ أثناء حذف المنشور.');
  }
};


  // const handleShowComments = (post) => {
  //   console.log(`API: Fetch comments for post ${post.id}`);
  //   setViewingCommentsForPost(post);
  // };

  return (
    <div className="community-wrapper">
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab-button ${activeTab === 'for-you' ? 'active' : ''}`}
            onClick={() => setActiveTab('for-you')}
          >
            For You
          </button>
          <button
            className={`tab-button ${activeTab === 'my-posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-posts')}
          >
            My Posts
          </button>
        </div>
      </div>

      <div className="content-area">
        {viewingCommentsForPost ? (
          <CommentsView
            post={viewingCommentsForPost}
            commentsData={mockComments[viewingCommentsForPost.id] || []}
          />
        ) : (
          <>
            <PostInput onPostAdded={() => fetchPosts(1)} />
            <Feed
              posts={posts}
              onLike={handleLike}
              onOpenDeleteModal={setPostToDelete}
              // onShowComments={handleShowComments}
              isMyPostsPage={activeTab === 'my-posts'}
            />
            {currentPage < lastPage && (
              <button onClick={handleLoadMore} className="load-more-button">
                Load More Posts....
              </button>
            )}
          </>
        )}
      </div>

      {postToDelete && (
        <DeleteModal
          post={postToDelete}
          onClose={() => setPostToDelete(null)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Community;

