import './Spinner.css';
export default function Spinner({
  scale = '1',
  size = '10px',
  borderWidth = '3px',
  borderColor = 'var(--main-color)',
}) {
  return (
    <div
      className="spinner"
      style={{
        scale,
        width: size,
        height: size,
        border: `${borderWidth} solid ${borderColor}`,
        borderTop: `${borderWidth} solid transparent`,
      }}></div>
  );
}
