import { Link } from 'react-router-dom';
import HomePageImage from '../../../public/jason-briscoe-n4ymhyyFY7A-unsplash.jpg';
import EatingTogetherImage from '../../../public/alex-haney-CAhjZmVk5H4-unsplash.jpg';

export default function HomePage() {
  return (
    <>
      <section className='row'>
        <div className='col-md-5'>
          <h1 className='display-5 fw-bold'>Master Cook</h1>
          <p className='lead'>Delicious and Healthy. Fun and Inspiring.</p>
          <p>
            Your very best foods often come from the heart. From recipes passed
            down generation to generation, tweaked just a little bit each time.
            Master Cook allows you take those recipes and share them with the
            world. Oh, and while your at it, share some neat tips and tricks to
            help other cooks as well!
          </p>
        </div>
        <div className='col-md-7'>
          <img
            src={HomePageImage}
            alt='A couple cooking together'
            className='img-fluid'
          />
          Photo by{' '}
          <a href='https://unsplash.com/@jsnbrsc?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
            Jason Briscoe
          </a>{' '}
          on{' '}
          <a href='https://unsplash.com/photos/n4ymhyyFY7A?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText'>
            Unsplash
          </a>
        </div>
      </section>
      <hr />
      <section className='row m-3'>
        <div className='col-md-6 d-flex flex-column justify-content-between h-250'>
          <h2>Recipes</h2>
          <p className='lead'>
            The recipes you'll find here will undoubtly be the best you've ever
            had. Made from the hearts of generations, these recipes have been
            enjoyed by countless people who have taken these recipes and add
            their own pinch of salt to each and every one. Find out which
            recipes work best for you!
          </p>
          <Link to='/recipes' className='btn btn-outline-primary'>
            Read Recipes
          </Link>
        </div>
        <div className='col-md-6 d-flex flex-column justify-content-between h-250'>
          <h2>Posts</h2>
          <p className='lead'>
            Tips and tricks from fellow cooks around the world will enable you
            to take your recipe and bring it up to a whole other level. Learn
            about lots of ideas, tools of the trade, tips, tricks and more are
            open for all.
          </p>
          <Link to='/posts' className='btn btn-outline-primary'>
            Read Posts
          </Link>
        </div>
      </section>
      <section className='row mt-5'>
        <div className='col-md-7'>
          <img
            src={EatingTogetherImage}
            alt='Friend seating food together'
            className='img-fluid'
          />
        </div>
        <div className='col-md-5'>
          <h2>Lets Cook and Eat Food Together!</h2>
          <p className='lead'>Enough Talk.</p>
          <p>
            It's time to eat, <Link to='/recipes'>lets go!</Link>
          </p>
        </div>
      </section>
    </>
  );
}
