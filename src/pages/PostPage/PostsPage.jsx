import { useEffect } from 'react';
import { usePostContext } from '../../context/posts/postState';
import PostCard from '../../components/PostCard/PostCard';

export default function PostsPage() {
  const { getAllPosts, posts } = usePostContext();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <>
      <h1>Blog</h1>
      <p className='lead'>Tips and tricks by the cleverest among us.</p>
      <hr style={{ width: '90%', margin: '1rem auto' }} />
      <section
        className='d-flex flex-wrap justify-content-evenly align-items-center'
        style={{ height: '30rem' }}
      >
        {posts && posts.map(post => <PostCard post={post} key={post._id} />)}
      </section>
    </>
  );
}
