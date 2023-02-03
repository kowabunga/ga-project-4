import React from 'react';

export default function ErrorMessage({ error }) {
  return (
    <div className='alert alert-danger text-center' role='alert'>
      {error}
    </div>
  );
}
