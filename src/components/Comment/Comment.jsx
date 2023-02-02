import { usePostContext } from '../../context/posts/postState';
export default function Comment({ comment, user }) {
  const { editPostComment, deletePostComment } = usePostContext();

  function handleCommentEdit() {}
  function handleCommentDelete() {
    deletePostComment(comment._id);
  }

  return (
    <li className='list-group-item'>
      <p className='lead d-flex justify-content-between'>
        <span>
          {comment.title} -{' '}
          <em>{new Date(comment.createdAt).toLocaleDateString()}</em>
        </span>
        {user && (
          <span className='btn-group'>
            <button className='btn btn-outline-warning px-3'>
              <i className='fa-solid fa-pen-to-square'></i>
            </button>
            <button
              className='btn btn-outline-danger px-3'
              onClick={handleCommentDelete}
            >
              <i className='fa-solid fa-x'></i>
            </button>
          </span>
        )}
      </p>
      <p>{comment.content}</p>
    </li>
  );
}
