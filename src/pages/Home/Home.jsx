import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <Link to="/class-rep">Class rep</Link>
      <Link to="/student">Student</Link>
    </div>
  );
};

export default Home;
