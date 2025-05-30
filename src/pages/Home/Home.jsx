import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const Home = () => {
  const { setUser } = useAuth();
  const [state, setstate] = useState('student');
  return (
    <div className="home">
      <Link to="/class-rep">Class rep</Link>
      <Link to="/student">Student</Link>
      <select
        value={state}
        onChange={(e) => {
          setUser((prev) => ({ ...prev, role: e.target.value }));
          setstate(e.target.value);
        }}>
        <option value="student">student</option>
        <option value="class-rep">class-rep</option>
      </select>
    </div>
  );
};

export default Home;
