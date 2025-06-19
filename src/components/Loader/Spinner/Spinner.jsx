import './Spinner.css';
export default function Spinner({ scale = '1' }) {
  return (
    <div
      className="spinner"
      style={{ scale }}></div>
  );
}
