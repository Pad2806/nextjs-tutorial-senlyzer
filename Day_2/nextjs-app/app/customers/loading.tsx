export default function Loading() {
  return (
    <div>
      <p>Loading customers...</p>
      <div style={{ opacity: 0.6 }}>
        <p>Fetching profile...</p>
        <p>Fetching orders...</p>
      </div>
    </div>
  );
}
