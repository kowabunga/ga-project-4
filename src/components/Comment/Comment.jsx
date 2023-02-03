import { usePostContext } from '../../context/posts/postState';
import { useRecipeContext } from '../../context/recipes/recipeState';
import EditCommentModal from '../EditCommentModal/EditCommentModal';
export default function Comment({ comment, user, isPost }) {
  const { deletePostComment } = usePostContext();
  const { deleteRecipeComment } = useRecipeContext();

  function handleCommentDelete() {
    isPost ? deletePostComment(comment._id) : deleteRecipeComment(comment._id);
  }

  return (
    <li className='list-group-item'>
      <p className='lead d-flex justify-content-between'>
        <span>
          {comment.title} -{' '}
          <em>{new Date(comment.createdAt).toLocaleDateString()}</em>
        </span>
        {user !== undefined && user === comment.user && (
          <span className='btn-group'>
            <button
              className='btn btn-outline-warning px-3'
              data-bs-toggle='modal'
              data-bs-target={`#editCommentModal${comment._id}`}
            >
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
      <EditCommentModal oldComment={comment} isPost={isPost} />
    </li>
  );
}
