import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserLandingPage.css';

import { useUserContext } from '../../../context/users/userState';
import { useRecipeContext } from '../../../context/recipes/recipeState';
import { usePostContext } from '../../../context/posts/postState';

export default function UserLandingPage() {
  const { user } = useUserContext();
  const { getUserPosts, posts } = usePostContext();
  const { getUserRecipes, recipes } = useRecipeContext();

  useEffect(() => {
    user && getUserRecipes();
    user && getUserPosts();
  }, [user]);

  return (
    user &&
    recipes &&
    posts && (
      <>
        <h1>Welcome {user.name.split(' ')[0]},</h1>
        <hr style={{ width: '90%', margin: '50px auto 25px auto' }} />
        <div className='btn-group w-100'>
          <Link to='/recipes/create' className='btn btn-outline-primary'>
            Create Recipe
          </Link>
          <Link to='/posts/create' className='btn btn-outline-success'>
            Create Post
          </Link>
        </div>
        <section className='row pt-3 px-2'>
          <div className='col-12 col-md-6'>
            <h2 className='text-center'>My Recipes</h2>
            <ul className='list-group list-group-flush'>
              {recipes.map(recipe => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center '
                  key={recipe._id}
                >
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className='post-link text-capitalize'
                  >
                    {recipe.title}
                  </Link>
                  <div className='btn-group'>
                    <button className='btn btn-outline-warning px-3'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </button>
                    <button
                      className='btn btn-outline-danger px-3'
                      // onClick={handleCommentDelete}
                    >
                      <i className='fa-solid fa-x'></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className='col-12 col-md-6'>
            <h2 className='text-center'>My Posts</h2>
            <ul className='list-group list-group-flush'>
              {posts.map(post => (
                <li
                  className='list-group-item d-flex justify-content-between align-items-center '
                  key={post._id}
                >
                  <Link
                    to={`/posts/${post._id}`}
                    className='post-link text-capitalize'
                  >
                    {post.title}
                  </Link>
                  <div className='btn-group'>
                    <button className='btn btn-outline-warning px-3'>
                      <i className='fa-solid fa-pen-to-square'></i>
                    </button>
                    <button
                      className='btn btn-outline-danger px-3'
                      // onClick={handleCommentDelete}
                    >
                      <i className='fa-solid fa-x'></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </>
    )
  );
}
