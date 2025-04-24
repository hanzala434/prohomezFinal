import React, { useEffect } from 'react';

import styles from './Feed.module.css';
import PostCard from '../../components/PostCard';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, fetchComments, fetchPosts, toggleLike } from '../../features/posts/postsSlice';

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const { posts, status, error } = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.posts.comments);

  console.log(posts)
  useEffect(() => {
    dispatch(fetchPosts()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        res.payload.forEach((post: Post) => {
          dispatch(fetchComments(post.postId));
        });
        
        
      }
    });
  }, [dispatch]);
  

  const handleLike = (postId: number) => {
    dispatch(toggleLike(postId));
  };

  const handleAddComment = (postId: number, comment: string) => {
    console.log(comment);
    dispatch(addComment({ postId, commentText: comment }));
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'failed') return <p>{error}</p>;

  return (
    <div className={styles.feed}>
      {posts.map((post) => (
        <PostCard
          key={post.postId}
          post={post}
          comments={comments[post.postId] || []} 
          onLike={handleLike}
          onAddComment={handleAddComment}
          onShowAllComments={() => dispatch(fetchComments(post.postId))}

        />
      ))}
    </div>
  );
};

export default Feed;
