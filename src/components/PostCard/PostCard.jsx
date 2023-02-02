import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link to={`/posts/${post._id}`} className='custom-card m-4'>
      {post.imgUrl && <img src={post.imgUrl} alt={post.title} />}
      <div>
        <h4>{post.title}</h4>
        <div className='ellipses'>{post.content}</div>
        <small className='text-muted'>By {post.user.name}</small>
      </div>
    </Link>
  );
}
