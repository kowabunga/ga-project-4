export default function Spinner({ text }) {
  return (
    <div className='d-flex justify-content-center'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>{text}...</span>
      </div>
    </div>
  );
}
