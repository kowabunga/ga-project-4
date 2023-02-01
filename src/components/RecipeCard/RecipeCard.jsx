import { Link } from 'react-router-dom';

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className='custom-card m-4'>
      {recipe.imgUrl && <img src={recipe.imgUrl} alt={recipe.title} />}
      <div>
        <h4>{recipe.title}</h4>
        <div className='ellipses'>{recipe.description}</div>
        <small className='ms-1 text-muted'>By {recipe.user.name}</small>
      </div>
    </Link>
  );
}
