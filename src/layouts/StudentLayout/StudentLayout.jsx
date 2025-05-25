import React from 'react';
import { Outlet } from 'react-router-dom';

const StudentLayout = () => {
  return (
    <div>
      <p>Navbar</p>
      <header>Student header</header>
      <main>
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default StudentLayout;
