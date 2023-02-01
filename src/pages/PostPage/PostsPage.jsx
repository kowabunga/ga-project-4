import { useEffect } from 'react';
import { usePostContext } from '../../context/posts/postState';
import PostCard from '../../components/PostCard/PostCard';

export default function PostsPage() {
  const { getAllPosts, posts } = usePostContext();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <section className='d-flex flex-wrap justify-content-evenly align-items-center'>
      {posts && posts.map(post => <PostCard post={post} key={post._id} />)}
    </section>
  );
}
