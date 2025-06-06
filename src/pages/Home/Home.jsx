import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Vigilo</h1>
      <p>
        Effortless class attendance, announcements, and academic tracking for
        students and class reps.
      </p>
      <div style={{ marginTop: 20 }}>
        <Link
          to="/auth/login"
          style={{ marginRight: 12 }}>
          Login
        </Link>
        <Link to="/auth/register">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
