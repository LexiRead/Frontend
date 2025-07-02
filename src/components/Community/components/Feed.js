import React from 'react';
import Post from './Post';

// استيراد الأيقونات
import postUserIcon from '../pic/Frame.png';
import sendIcon from '../pic/send-2.png';
import attachIcon from '../pic/Frame2.png';

const PostInput = () => {
    // TODO: Add API here to handle new post submission
    return (
        <div className="post-input-area">
            {/* <img src={postUserIcon} alt="User" /> */}
             {/* <-- تغيير المسار */}
            <div className="hi">
                {/* <textarea placeholder="What’s on yourr mind?"></textarea> */}
                {/* <button className="hii" onClick={() => alert('Post functionality to be implemented!')}> */}
                    {/* <img src={sendIcon} alt="Send" /> */}
                     {/* <-- تغيير المسار */}
                    {/* <p>Post</p> */}
                    {/* <img src={attachIcon} alt="Attach" /> */}
                     {/* <-- تغيير المسار */}
                {/* </button> */}
            </div>
        </div>
    );
};

// ... باقي الكود لمكون Feed يبقى كما هو
const Feed = ({ posts, onLike, onOpenDeleteModal, onShowComments }) => {
    return (
      <>
        <PostInput />
        <div className="feed">
          {posts.map(post => (
            <Post
              key={post.id}
              post={post}
              onLike={onLike}
              onOpenDeleteModal={onOpenDeleteModal}
              onShowComments={onShowComments}
            />
          ))}
        </div>
      </>
    );
};
  
export default Feed;