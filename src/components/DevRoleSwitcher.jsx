import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const DevRoleSwitcher = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  if (!import.meta.env.DEV || !user) return null;

  const handleRoleChange = (newRole) => {
    const updatedUser = { ...user, role: newRole };
    setUser((prev) => ({ ...prev, role: newRole }));
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  const test = () => {
    if (user.role === 'student') {
      navigate('/student');
    } else {
      navigate('/class-rep');
    }
    console.log(user.role);
  };
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        background: '#222',
        padding: '10px 14px',
        borderRadius: 8,
        zIndex: 9999,
        color: '#fff',
        fontSize: 14,
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      }}>
      <span
        style={{ marginRight: 8 }}
        onClick={test}>
        👨‍🔬 Role:
      </span>
      <select
        value={user.role}
        onChange={(e) => handleRoleChange(e.target.value)}
        style={{
          background: '#333',
          color: '#fff',
          border: '1px solid #555',
          padding: '4px 8px',
          borderRadius: 4,
        }}>
        <option value="student">Student</option>
        <option value="class-rep">Class Rep</option>
      </select>
    </div>
  );
};

export default DevRoleSwitcher;
