export default function Spinner({ text }) {
  return (
    <div class='d-flex justify-content-center'>
      <div class='spinner-border' role='status'>
        <span class='sr-only'>{text}...</span>
      </div>
    </div>
  );
}
