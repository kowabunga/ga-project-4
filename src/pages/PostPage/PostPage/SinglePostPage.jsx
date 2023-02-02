import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePostContext } from '../../../context/posts/postState';
import { useUserContext } from '../../../context/users/userState';

import Comment from '../../../components/Comment/Comment';
import AddCommentModal from '../../../components/AddCommentModal/AddCommentModal';

export default function SinglePostPage() {
  const { getSinglePost, post } = usePostContext();
  const { token, user } = useUserContext();
  const { id } = useParams();

  useEffect(() => {
    getSinglePost(id);
  }, []);

  return (
    <section>
      {post && (
        <>
          <div className='text-center'>
            <h1 className='text-capitalize'>{post.title}</h1>
            <h5 className>By {post.user.name}</h5>
            <div style={{ width: '66%', margin: '0 auto' }} className='pb-3'>
              <hr />
            </div>
          </div>
          <article className='mb-4'>{post.content}</article>
          <div className='mt-5'>
            <div className='d-flex justify-content-between mb-4'>
              <h3>Reviews and Comments</h3>
              {token && (
                <button
                  className='btn btn-outline-primary'
                  data-bs-toggle='modal'
                  data-bs-target='#addCommentModel'
                >
                  Add comment
                </button>
              )}
            </div>
            {post.comments.length > 0 ? (
              <ul className='list-group list-group-flush'>
                {post.comments.map(comment => (
                  <Comment
                    comment={comment}
                    user={user?._id}
                    key={comment._id}
                  />
                ))}{' '}
              </ul>
            ) : (
              'No comments or reviews...'
            )}
            <AddCommentModal user={user?._id} post={post._id} />
          </div>
        </>
      )}
    </section>
  );
}
