export default function Comment({ comment }) {
  return (
    <li className='list-group-item'>
      <p className='lead'>
        {comment.title} -{' '}
        <em>{new Date(comment.createdAt).toLocaleDateString()}</em>
      </p>
      <p>{comment.content}</p>
    </li>
  );
}
